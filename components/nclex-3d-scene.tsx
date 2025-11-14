"use client"

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text3D, Center, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function RotatingKey() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 4, 0.5]} />
        <MeshDistortMaterial
          color="#9333EA"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      {/* Key tooth */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <MeshDistortMaterial
          color="#A855F7"
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function FloatingCertificates() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <Float
          key={i}
          speed={1 + i * 0.5}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <mesh position={[i * 3 - 3, i * 1.5 - 1.5, -2]}>
            <planeGeometry args={[2, 2.5]} />
            <MeshDistortMaterial
              color={i === 0 ? "#9333EA" : i === 1 ? "#A855F7" : "#C084FC"}
              attach="material"
              transparent
              opacity={0.7}
              distort={0.2}
              speed={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Center position={[0, -2, 0]}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        PASS
        <MeshDistortMaterial
          color="#9333EA"
          attach="material"
          distort={0.1}
          speed={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </Text3D>
    </Center>
  )
}

export function NCLEX3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#9333EA" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
      <directionalLight position={[0, 5, 5]} intensity={0.8} />
      
      <RotatingKey />
      <FloatingCertificates />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  )
}


