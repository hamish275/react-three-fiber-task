import './App.css';
import React, {useRef} from 'react';
import {Canvas, useThree, extend, ReactThreeFiber, useFrame} from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {Vector3} from "three";
import {Stars, Stats} from "@react-three/drei";
extend({OrbitControls});

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
          <mesh>
              <boxBufferGeometry args={[10, 10, 10]}/>
              <meshPhysicalMaterial wireframe={true}/>
          </mesh>
          <Spheres/>
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

function Spheres(){
    // create 200 spheres
    return (
        <mesh>
            {[...Array(200)].map((value, index) => {
                return <Sphere key={index} />;
            })}
        </mesh>
    );
}

function Sphere() {
    // Calculate random velocity, size and position for the sphere
    let xVelocity = getRandomFloatBetween(0.01, 0.05);
    let yVelocity = getRandomFloatBetween(0.01, 0.05);
    let zVelocity = getRandomFloatBetween(0.01, 0.05);
    const size = getRandomFloatBetween(0.1, 0.5);
    const spherePosition = new Vector3(getRandomFloatBetween(-5+(size), 5-(size)), getRandomFloatBetween(-5+(size), 5-(size)), getRandomFloatBetween(-5+(size), 5-(size)));


    const ref = useRef<THREE.Mesh>(null!);
    useFrame(() => {
        // reverse the spheres velocity if outside of bounds to create bounce effect
        if(ref.current.position.x > 5-(size) || ref.current.position.x < -5+(size)){
            xVelocity = -xVelocity;
        }
        if(ref.current.position.y > 5-(size) || ref.current.position.y < -5+(size)){
            yVelocity = -yVelocity;
        }
        if(ref.current.position.z > 5-(size) || ref.current.position.z < -5+(size)){
            zVelocity = -zVelocity;
        }

        // update spheres position
        ref.current.position.x += xVelocity;
        ref.current.position.y += yVelocity;
        ref.current.position.z += zVelocity;
    })
    return (
        <mesh ref={ref} position={spherePosition}>
            <sphereBufferGeometry args={[size]}/>
            <meshPhysicalMaterial
                color="red"
                roughness={1}
                clearcoat={0.5}
            />
        </mesh>
    )
}

function getRandomFloatBetween(min: number, max: number){
    return (Math.random() * (max - min) + min)
}



export default App;
