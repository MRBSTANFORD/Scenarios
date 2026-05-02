import React from 'react';
import { PropType } from '../types';

export const Mattress: React.FC = () => (
  <mesh position={[0, 0.1, 0]}>
    <boxGeometry args={[3.8, 0.2, 7.8]} />
    <meshStandardMaterial color="#f8f9fa" />
  </mesh>
);

export const Laptop: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Base */}
    <mesh position={[0, 0.05, 0]}>
      <boxGeometry args={[1.5, 0.1, 1]} />
      <meshStandardMaterial color="#cbd5e1" />
    </mesh>
    {/* Screen */}
    <mesh position={[0, 0.5, -0.45]} rotation={[-0.2, 0, 0]}>
      <boxGeometry args={[1.5, 1, 0.1]} />
      <meshStandardMaterial color="#94a3b8" />
    </mesh>
  </group>
);

export const PottedPlant: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Pot */}
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.3, 0.2, 0.6, 16]} />
      <meshStandardMaterial color="#b45309" />
    </mesh>
    {/* Plant */}
    <mesh position={[0, 0.8, 0]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial color="#22c55e" />
    </mesh>
  </group>
);

export const Lamp: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Base */}
    <mesh position={[0, 0.05, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
      <meshStandardMaterial color="#334155" />
    </mesh>
    {/* Stand */}
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
      <meshStandardMaterial color="#475569" />
    </mesh>
    {/* Shade */}
    <mesh position={[0, 1, 0]}>
      <coneGeometry args={[0.4, 0.5, 16]} />
      <meshStandardMaterial color="#e2e8f0" />
    </mesh>
  </group>
);

export const Books: React.FC = () => (
  <group position={[0, 0, 0]}>
    <mesh position={[0, 0.1, 0]} rotation={[0, 0.2, 0]}>
      <boxGeometry args={[0.6, 0.2, 0.8]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
    <mesh position={[0, 0.3, 0]} rotation={[0, -0.1, 0]}>
      <boxGeometry args={[0.5, 0.2, 0.7]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
    <mesh position={[0, 0.5, 0]} rotation={[0, 0.3, 0]}>
      <boxGeometry args={[0.55, 0.2, 0.75]} />
      <meshStandardMaterial color="#eab308" />
    </mesh>
  </group>
);

export const Chair: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Seat */}
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1.8, 0.1, 1.8]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>
    {/* Legs */}
    <mesh position={[-0.8, 0.25, -0.8]}><boxGeometry args={[0.1, 0.5, 0.1]} /><meshStandardMaterial color="#3e2723" /></mesh>
    <mesh position={[0.8, 0.25, -0.8]}><boxGeometry args={[0.1, 0.5, 0.1]} /><meshStandardMaterial color="#3e2723" /></mesh>
    <mesh position={[-0.8, 0.25, 0.8]}><boxGeometry args={[0.1, 0.5, 0.1]} /><meshStandardMaterial color="#3e2723" /></mesh>
    <mesh position={[0.8, 0.25, 0.8]}><boxGeometry args={[0.1, 0.5, 0.1]} /><meshStandardMaterial color="#3e2723" /></mesh>
    {/* Back */}
    <mesh position={[0, 1.1, -0.8]}><boxGeometry args={[1.8, 1.2, 0.1]} /><meshStandardMaterial color="#8b5a2b" /></mesh>
  </group>
);

export const Table: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Top */}
    <mesh position={[0, 1.5, 0]}>
      <boxGeometry args={[3.8, 0.2, 3.8]} />
      <meshStandardMaterial color="#d2b48c" />
    </mesh>
    {/* Legs */}
    <mesh position={[-1.7, 0.75, -1.7]}><boxGeometry args={[0.2, 1.5, 0.2]} /><meshStandardMaterial color="#8b4513" /></mesh>
    <mesh position={[1.7, 0.75, -1.7]}><boxGeometry args={[0.2, 1.5, 0.2]} /><meshStandardMaterial color="#8b4513" /></mesh>
    <mesh position={[-1.7, 0.75, 1.7]}><boxGeometry args={[0.2, 1.5, 0.2]} /><meshStandardMaterial color="#8b4513" /></mesh>
    <mesh position={[1.7, 0.75, 1.7]}><boxGeometry args={[0.2, 1.5, 0.2]} /><meshStandardMaterial color="#8b4513" /></mesh>
  </group>
);

export const TV: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Screen */}
    <mesh position={[0, 1.2, 0]}>
      <boxGeometry args={[3.8, 2.2, 0.2]} />
      <meshStandardMaterial color="#111827" />
    </mesh>
    {/* Base */}
    <mesh position={[0, 0.05, 0]}>
      <boxGeometry args={[1.5, 0.1, 0.8]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
    {/* Stand */}
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.2, 1, 0.2]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  </group>
);

export const CoffeeCup: React.FC = () => (
  <group position={[0, 0, 0]}>
    <mesh position={[0, 0.15, 0]}>
      <cylinderGeometry args={[0.15, 0.1, 0.3, 16]} />
      <meshStandardMaterial color="#f8fafc" />
    </mesh>
    {/* Handle */}
    <mesh position={[0.15, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
      <meshStandardMaterial color="#f8fafc" />
    </mesh>
  </group>
);

export const Rug: React.FC = () => (
  <mesh position={[0, 0.02, 0]}>
    <boxGeometry args={[5.8, 0.04, 5.8]} />
    <meshStandardMaterial color="#94a3b8" />
  </mesh>
);

export const Sofa: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Base/Seat */}
    <mesh position={[0, 0.4, 0]}>
      <boxGeometry args={[5.8, 0.8, 2.8]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
    {/* Backrest */}
    <mesh position={[0, 1.2, -1]}>
      <boxGeometry args={[5.8, 1.2, 0.8]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
    {/* Armrests */}
    <mesh position={[-2.7, 1, 0.2]}><boxGeometry args={[0.6, 0.8, 2.4]} /><meshStandardMaterial color="#475569" /></mesh>
    <mesh position={[2.7, 1, 0.2]}><boxGeometry args={[0.6, 0.8, 2.4]} /><meshStandardMaterial color="#475569" /></mesh>
  </group>
);

export const PictureFrame: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Frame */}
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.8, 1, 0.1]} />
      <meshStandardMaterial color="#b45309" />
    </mesh>
    {/* Picture */}
    <mesh position={[0, 0.5, 0.06]}>
      <boxGeometry args={[0.6, 0.8, 0.01]} />
      <meshStandardMaterial color="#fcd34d" />
    </mesh>
  </group>
);

export const Wall: React.FC = () => (
  <mesh position={[0, 2, 0]}>
    <boxGeometry args={[3.8, 4, 0.8]} />
    <meshStandardMaterial color="#f1f5f9" />
  </mesh>
);

export const Door: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Frame */}
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[2.8, 4, 0.8]} />
      <meshStandardMaterial color="#e2e8f0" />
    </mesh>
    {/* Door */}
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[2.6, 3.8, 0.6]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>
    {/* Knob */}
    <mesh position={[1, 2, 0.35]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#fbbf24" />
    </mesh>
  </group>
);

export const Window: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Frame */}
    <mesh position={[0, 1.5, 0]}>
      <boxGeometry args={[2.8, 3, 0.8]} />
      <meshStandardMaterial color="#cbd5e1" />
    </mesh>
    {/* Glass */}
    <mesh position={[0, 1.5, 0]}>
      <boxGeometry args={[2.6, 2.8, 0.2]} />
      <meshStandardMaterial color="#bae6fd" transparent opacity={0.6} />
    </mesh>
  </group>
);

export const Stairs: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Steps */}
    {[0, 1, 2, 3].map(i => (
      <mesh key={i} position={[0, i * 0.5 + 0.25, i * 1 - 1.5]}>
        <boxGeometry args={[2.8, 0.5, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
    ))}
  </group>
);

export const RoomDivider: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Panels */}
    <mesh position={[-1, 2, 0]} rotation={[0, 0.2, 0]}>
      <boxGeometry args={[1.8, 4, 0.1]} />
      <meshStandardMaterial color="#fef3c7" />
    </mesh>
    <mesh position={[1, 2, 0]} rotation={[0, -0.2, 0]}>
      <boxGeometry args={[1.8, 4, 0.1]} />
      <meshStandardMaterial color="#fef3c7" />
    </mesh>
  </group>
);

export const PropModel: React.FC<{ type: PropType }> = ({ type }) => {
  switch (type) {
    case PropType.MATTRESS: return <Mattress />;
    case PropType.LAPTOP: return <Laptop />;
    case PropType.POTTED_PLANT: return <PottedPlant />;
    case PropType.LAMP: return <Lamp />;
    case PropType.BOOKS: return <Books />;
    case PropType.CHAIR: return <Chair />;
    case PropType.TABLE: return <Table />;
    case PropType.TV: return <TV />;
    case PropType.COFFEE_CUP: return <CoffeeCup />;
    case PropType.RUG: return <Rug />;
    case PropType.SOFA: return <Sofa />;
    case PropType.PICTURE_FRAME: return <PictureFrame />;
    case PropType.WALL: return <Wall />;
    case PropType.DOOR: return <Door />;
    case PropType.WINDOW: return <Window />;
    case PropType.STAIRS: return <Stairs />;
    case PropType.ROOM_DIVIDER: return <RoomDivider />;
    default: return null;
  }
};
