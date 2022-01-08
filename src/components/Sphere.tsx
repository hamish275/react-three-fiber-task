import { useSphere } from "@react-three/cannon";

const colors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"]

function Sphere(props: any) {
    // apply cannon physics to sphere
    const [ref] = useSphere(() => ({
        args: [props.size],
        mass: props.size,
        ...props,
    }));
    return (
        <mesh ref={ref} castShadow={true} receiveShadow={true}>
            <sphereBufferGeometry args={[props.size]} />
            <meshPhysicalMaterial
                color={colors[Math.floor(Math.random()*colors.length)]}
                clearcoat={0.3}
            />
        </mesh>
    )
}

export default Sphere;