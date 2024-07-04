import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh, Vector3 } from "three";
import { Sun as sunType } from "../../../socket.type";

interface Props {
  sun: sunType;
}

export function Sun({ sun }: Props) {
  const { position, scale } = sun;
  const v3Pos = new Vector3(position.x, position.y, position.z);
  const groupRef = useRef<Group>(null);
  const name = "Sun";
  const gltf = useGLTF(`/glb/${name}.glb`);
  const mesh = gltf.scene.getObjectByName(name) as Mesh;

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }
    groupRef.current.rotation.y += 0.0003;
    groupRef.current.rotation.z += 0.0002;
  });

  return (
    <group position={v3Pos} scale={scale} dispose={null} ref={groupRef}>
      <mesh
        geometry={mesh.geometry}
        material={mesh.material}
        rotation={[0, 0, 0]}
      ></mesh>
    </group>
  );
}
