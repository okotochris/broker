'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type CoinProps = {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
};

function Coin({ position, scale = 1, color = '#f0c300', speed = 1 }: CoinProps) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.008 * speed;
    // Gentle hover/bob
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.8 + position[0]) * 0.12;
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.8}
      floatIntensity={1.5}
    >
      <group ref={ref} position={position} scale={scale}>
        {/* Main coin body - slightly flattened cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[1.0, 1.0, 0.18, 64]} /> {/* radiusTop, radiusBottom, height, segments */}
          <meshPhysicalMaterial
            color={color}
            metalness={0.95}
            roughness={0.12}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Edge rim for classic coin look */}
        <mesh castShadow>
          <torusGeometry args={[1.02, 0.09, 16, 100]} /> {/* radius, tube, radialSegments, tubularSegments */}
          <meshPhysicalMaterial
            color="#e0b800"
            metalness={0.98}
            roughness={0.08}
          />
        </mesh>

        {/* Optional subtle inner detail / engraving simulation */}
        <mesh position={[0, 0.095, 0]}>
          <ringGeometry args={[0.4, 0.7, 64]} />
          <meshStandardMaterial color="#d4a017" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

export default function AnimatedCoins() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 8]} angle={0.4} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-8, -6, -5]} intensity={0.9} />

        <Suspense fallback={null}>
          {/* Three floating coins with different sizes/colors/speeds */}
          <Coin position={[-4.2, 0.8, 1]} scale={2.4} color="#f0c300" speed={0.9} />   {/* Gold BTC-like */}
          <Coin position={[0, -0.8, 3]} scale={2.8} color="#c0c0c0" speed={1.15} />     {/* Silver ETH-like */}
          <Coin position={[4.5, 1.2, -0.5]} scale={2.0} color="#e67e22" speed={0.75} /> {/* Copper/altcoin */}

          <Environment preset="city" background={false} />
          <ContactShadows
            position={[0, -4.5, 0]}
            opacity={0.7}
            width={14}
            height={14}
            blur={2.8}
            far={6}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.7}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}