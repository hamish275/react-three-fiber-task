import './App.css';
import React from 'react';
import {Canvas, useThree, extend, ReactThreeFiber} from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
          <Sphere/>
          <axesHelper args={[30]}/>
          <CameraControls/>
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

function Sphere(){
    return (
        <mesh position={[0, 0, 0]}>
            <sphereBufferGeometry args={[0.5]}/>
            <meshPhysicalMaterial
                color="red"
                roughness={1}
                clearcoat={0.5}
            />
        </mesh>
    )
}



export default App;
