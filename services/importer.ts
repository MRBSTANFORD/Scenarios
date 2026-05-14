
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { PlacedBrock, BrockType } from '../types';
import { BROCK_SPECS } from '../constants';
import { getRotatedDimensions } from './builder';

/**
 * Intelligent Geometry Matcher
 * Analyzes dimensions of a 3D object and finds the closest matching Corkbrick type.
 */
const matchBlockType = (size: THREE.Vector3, name: string): BrockType | null => {
    // Sort dimensions to ignore rotation (e.g. 0.2x0.4x0.2 is same as 0.4x0.2x0.2)
    const dims = [size.x, size.y, size.z].sort((a, b) => a - b);
    
    // Tolerances (in meters) - loosened to 0.08 to handle bad Sketchup/AutoCAD exports
    const TOLERANCE = 0.08; 
    const isApprox = (a: number, b: number) => Math.abs(a - b) < TOLERANCE;

    // 1. BASE / TERMINAL / CONN_1D (All roughly 0.2 x 0.2 x 0.2 bounding box)
    if (isApprox(dims[0], 0.2) && isApprox(dims[1], 0.2) && isApprox(dims[2], 0.2)) {
        const lowerName = (name || '').toLowerCase();
        if (lowerName.includes('conn') || lowerName.includes('1d')) return BrockType.CONN_1D;
        if (lowerName.includes('term') || lowerName.includes('cap')) return BrockType.TERMINAL;
        return BrockType.BASE; // Default
    }

    // 2. DOUBLE (0.2 x 0.2 x 0.4)
    if (isApprox(dims[0], 0.2) && isApprox(dims[1], 0.2) && isApprox(dims[2], 0.4)) {
        return BrockType.DOUBLE;
    }

    // 3. CONN_2D (0.2 x 0.3 x 0.3) -> 1.5 units is 0.3m
    if (isApprox(dims[0], 0.2) && isApprox(dims[1], 0.3) && isApprox(dims[2], 0.3)) {
        return BrockType.CONN_2D;
    }

    // 4. CONN_3D (0.2 x 0.3 x 0.4)
    if (isApprox(dims[0], 0.2) && isApprox(dims[1], 0.3) && isApprox(dims[2], 0.4)) {
        return BrockType.CONN_3D;
    }

    // 5. CONN_4D (0.2 x 0.4 x 0.4)
    if (isApprox(dims[0], 0.2) && isApprox(dims[1], 0.4) && isApprox(dims[2], 0.4)) {
        return BrockType.CONN_4D;
    }

    return null;
};

export const parse3DModelToBlocks = async (file: File): Promise<{ blocks: PlacedBrock[], stats: { found: number, ignored: number } }> => {
    return new Promise(async (resolve, reject) => {
        try {
            let scene: THREE.Group | THREE.Scene;
            const ext = file.name.split('.').pop()?.toLowerCase();
            
            if (ext === 'gltf' || ext === 'glb') {
                const loader = new GLTFLoader();
                const buffer = await file.arrayBuffer();
                loader.parse(buffer, '', (gltf) => {
                    processScene(gltf.scene, resolve);
                }, (error) => reject(error));
            } else if (ext === 'dae') {
                const loader = new ColladaLoader();
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target?.result as string;
                    const collada = loader.parse(text, '');
                    processScene(collada.scene, resolve);
                };
                reader.onerror = reject;
                reader.readAsText(file);
            } else if (ext === 'obj') {
                const loader = new OBJLoader();
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target?.result as string;
                    const objScene = loader.parse(text);
                    processScene(objScene, resolve);
                };
                reader.onerror = reject;
                reader.readAsText(file);
            } else {
                reject(new Error("Unsupported file format"));
            }
        } catch (err) {
            reject(err);
        }
    });
};

const processScene = (scene: THREE.Object3D, resolve: Function) => {
    const blocks: PlacedBrock[] = [];
    let ignored = 0;

    // 1. Normalize Scale
    let scaleFactor = 1.0;
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // Scale heuristic (inches, mm, cm vs meters based on max size)
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 500) {
        scaleFactor = 0.001; // mm
    } else if (maxDim > 50) {
        scaleFactor = 0.01; // cm
    } else if (maxDim > 15) {
        scaleFactor = 0.0254; // likely inches
    } // otherwise assume meters

    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            
            const worldScale = new THREE.Vector3();
            mesh.getWorldScale(worldScale);
            worldScale.multiplyScalar(scaleFactor);

            mesh.geometry.computeBoundingBox();
            if (!mesh.geometry.boundingBox) return;
            
            const bbox = mesh.geometry.boundingBox.clone();
            
            const dims = new THREE.Vector3();
            dims.subVectors(bbox.max, bbox.min);
            dims.multiply(worldScale);
            
            const type = matchBlockType(dims, mesh.name || '');
            
            if (type) {
                const worldPos = new THREE.Vector3();
                mesh.getWorldPosition(worldPos);
                
                const center = new THREE.Vector3();
                bbox.getCenter(center);
                center.applyMatrix4(mesh.matrixWorld);
                center.multiplyScalar(scaleFactor);
                
                blocks.push({
                    id: Math.random().toString(36).substr(2, 9),
                    type: type,
                    position: { 
                        x: Math.round(center.x / 0.2 * 2) / 2,
                        y: Math.round(center.y / 0.2 * 2) / 2, 
                        z: Math.round(center.z / 0.2 * 2) / 2 
                    },
                    rotation: { x: 0, y: 0, z: 0 },
                    timestamp: Date.now()
                });
            } else {
                ignored++;
            }
        }
    });

    resolve({ blocks, stats: { found: blocks.length, ignored } });
};

/**
 * Exports the current blocks to an OBJ 3D Model file format.
 */
export const exportBlocksToOBJ = (blocks: PlacedBrock[]): string => {
    const virtualScene = new THREE.Scene();
    
    blocks.forEach(b => {
        // Dimensions in meters (1 unit = 0.2m)
        const blockDims = getRotatedDimensions(b.type, b.rotation);
        const geometry = new THREE.BoxGeometry(blockDims.x * 0.2, blockDims.y * 0.2, blockDims.z * 0.2);
        
        // Material is needed for exporters though OBJ mostly cares about geometry
        const material = new THREE.MeshBasicMaterial({ color: BROCK_SPECS[b.type].color || 0xdddddd });
        const mesh = new THREE.Mesh(geometry, material);
        
        // Our positions are in "Grid Units" (1 unit = 0.2m). 
        // We multiply by 0.2 to match real meters
        mesh.position.set(b.position.x * 0.2, b.position.y * 0.2, b.position.z * 0.2);
        
        // Names help CAD identify matching objects
        mesh.name = `Corkbrick_${BROCK_SPECS[b.type].name.replace(/\s+/g, '_')}_${b.id}`;
        
        virtualScene.add(mesh);
    });

    const exporter = new OBJExporter();
    return exporter.parse(virtualScene);
};
