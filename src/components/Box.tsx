import { usePlane } from "@react-three/cannon"

function Box(){
    // 6 planes rotated and translated to form a box
    return (
        <>
            <Plane position={[0, -5, 0]} rotation={[-Math.PI/2, 0, 0]}/>
            <Plane position={[0, 5, 0]} rotation={[Math.PI/2, 0, 0]}/>
            <Plane position={[-5, 0, 0]} rotation={[0, Math.PI/2, 0]}/>
            <Plane position={[5, 0, 0]} rotation={[0, -Math.PI/2, 0]}/>
            <Plane position={[0, 0, -5]} rotation={[0, 0, 0]}/>
            <Plane position={[0, 0, 5]} rotation={[Math.PI, 0, 0]}/>
        </>
    );
}

function Plane(props: any) {
    // apply cannon physics to plane
    const [ref] = usePlane(() => ({
        type: "Static", // static body has infinite mass and does not move
        ...props
    }));
    return (
        <mesh ref={ref}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial wireframe={true}/>
        </mesh>
    );
}

export default Box;