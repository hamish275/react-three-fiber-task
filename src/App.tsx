import './App.css';
import React, {useEffect, useRef} from 'react';
import {Canvas, useThree, extend, ReactThreeFiber, useFrame} from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import {Stars, Stats} from "@react-three/drei";
import {Physics, useBox, usePlane, useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
extend({OrbitControls});

const colors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"]
const spheres = [...Array(200)].map(() => ({
        size: getRandomFloatBetween(0.1, 0.5),
        velocity: [getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2)],
        position: [getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5)]
    }));
const cubes = [...Array(20)].map(() => ({
    size: getRandomFloatBetween(0.5, 1),
    velocity: [getRandomFloatBetween(-1, 1), getRandomFloatBetween(-1, 1), getRandomFloatBetween(-2, 2)],
    position: [getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5)]
}));

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
        }
    }
}

function App() {
  return (
      <Canvas camera={{position: [10, 10, 10]}}>
          <Physics
              gravity={[0, 0, 0]}
              broadphase="SAP"
              defaultContactMaterial={{
                  restitution: 1
              }}>
              {spheres.map((props, i) => <Sphere key={i} {...props} />)}
              {cubes.map((props, i) => <Cube key={i} {...props} />)}
              <Box/>
          </Physics>
          <directionalLight position={[-10, 10, -5]} intensity={1}/>
          <ambientLight intensity={0.3}/>
          <CameraControls/>
          <Stats/>
          <Stars/>
      </Canvas>
  )
}

function CameraControls(){
    const {
        camera,
        gl: { domElement },
    } = useThree();
    return (
        <orbitControls args={[camera, domElement]}/>
    )
}

function Sphere(props: any) {
    const [ref, api] = useSphere(() => ({
        args: [props.size],
        mass: props.size,
        ...props,
    }));
    return (
        <mesh ref={ref}>
            <sphereBufferGeometry attach="geometry" args={[props.size]} />
            <meshPhysicalMaterial
                color={colors[Math.floor(Math.random()*colors.length)]}
                roughness={1}
                clearcoat={0.5}
            />
        </mesh>
    )
}

function Cube(props: any) {
    const [ref, api] = useBox(() => ({
        args: [props.size, props.size, props.size],
        mass: 10,
        ...props,
    }));
    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry" args={[props.size, props.size, props.size]} />
            <meshPhysicalMaterial
                color={colors[Math.floor(Math.random()*colors.length)]}
                roughness={1}
                clearcoat={0.5}
            />
        </mesh>
    )
}

function Plane(props: any) {
    const [ref] = usePlane(() => ({
        type: "Static",
        ...props
    }))
    return (
        <mesh ref={ref}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial side={THREE.DoubleSide} wireframe={true}/>
        </mesh>
    )
}

function Box(){
    return (
        <>
            <Plane position={[0, -5, 0]} rotation={[-Math.PI/2, 0, 0]}/>
            <Plane position={[0, 5, 0]} rotation={[Math.PI/2, 0, 0]}/>
            <Plane position={[-5, 0, 0]} rotation={[0, Math.PI/2, 0]}/>
            <Plane position={[5, 0, 0]} rotation={[0, -Math.PI/2, 0]}/>
            <Plane position={[0, 0, -5]} rotation={[0, 0, 0]}/>
            <Plane position={[0, 0, 5]} rotation={[Math.PI, 0, 0]}/>
        </>
    )
}

function getRandomFloatBetween(min: number, max: number){
    return (Math.random() * (max - min) + min)
}

export default App;

