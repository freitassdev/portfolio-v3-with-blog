'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { useGLTF, useAnimations } from '@react-three/drei'
import { MeshStandardMaterial, Object3D, Object3DEventMap, Mesh } from 'three'
import React, { Suspense } from 'react'

export const Model: React.FC = () => {
  const mesh = useRef<Mesh>(null!)

  const { scene, animations } = useGLTF('/test2.glb')
  const { actions } = useAnimations(animations, mesh)

  // useFrame(() => {
  //   mesh.current.rotation.y += 0.001
  //   mesh.current.rotation.x += 0.002
  // })

  useEffect(() => {
    // if (mesh.current) {
    //   mesh.current.position.y = -2.45; // Ajuste a posição Y conforme necessário
    // }
  }, [])

  useEffect(() => {
    console.log("Animações disponíveis:", Object.keys(actions))
    const animation1 = "Animation"
  
    if (actions && actions[animation1]) {
      actions[animation1].timeScale = 0.5
      actions[animation1].play()
      // actions[animation2].play()
    }
  }, [actions])

  // Adiciona um material "shiny"
  useEffect(() => {
    scene.traverse((child: Mesh | Object3D<Object3DEventMap>) => {
      // if (child instanceof Mesh) {
      //   child.material = new MeshStandardMaterial({
      //     color: '#89cff0',  // cor base
      //     metalness: 1,    // efeito metálico moderado
      //     roughness: 0.2,    // menor rugosidade para brilho
      //   })
      // }
    })
  }, [scene])

  return (
    <mesh ref={mesh}>
      <primitive object={scene} />
    </mesh>
  )
}

export const ThreejsModel: React.FC = () => {
  return (
    <div className="flex w-full max-lg:h-full h-1/2 items-center justify-center relative">
      <Canvas camera={{ position: [0, 0, 7], fov: 30 }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <Environment preset='studio' environmentIntensity={3.5} /> {/*warehouse fica bonito no tema black*/}
        <OrbitControls enableZoom={false} target={[0, 0, 0]} enablePan={false} />
      </Canvas>
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent h-px w-3/4" />
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
    </div>
  )
}
