import './App.css';
import {Canvas} from "@react-three/fiber";
import {Sky, Stats, OrbitControls} from "@react-three/drei";
import {Physics} from '@react-three/cannon';
import Sphere from './components/Sphere';
import Box from './components/Box';

const spheres = [...Array(200)].map(() => ({
        size: getRandomFloatBetween(0.1, 0.5),
        velocity: [getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2), getRandomFloatBetween(-2, 2)],
        position: [getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5), getRandomFloatBetween(-4.5, 4.5)]
    }));

function getRandomFloatBetween(min: number, max: number){
    return (Math.random() * (max - min) + min)
}

function App() {
  return (
      <Canvas camera={{position: [10, 5, 15]}} shadows >
          <Physics
              gravity={[0, 0, 0]}
              defaultContactMaterial={{
                  restitution: 1
              }}>
              {spheres.map((props, i) => <Sphere key={i} {...props} />)}
              <Box/>
          </Physics>
          <mesh position={[0, -6, 0]} receiveShadow={true}>
              <boxBufferGeometry args={[15, 2, 15]}/>
              <meshLambertMaterial/>
          </mesh>
          <directionalLight
              position={[-20, 20, -20]}
              intensity={0.5}
              castShadow={true}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
          />
          <ambientLight intensity={0.2}/>
          <OrbitControls/>
          <Stats/>
          <Sky/>
      </Canvas>
  )
}

export default App;
