import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, Vector3 } from "three";
import { useRef } from "react";
import { Planet as PlanetType } from "../../../socket.type";

interface Props {
  planet: PlanetType;
}

export function Planet({ planet }: Props) {
  const { name, position, scale } = planet;
  const ref = useRef<Group>(null);

  const gltfPath = `/glb/${name}.glb`;
  const gltf = useGLTF(gltfPath);

  const { material, geometry } = gltf.scene.getObjectByName(name) as Mesh;
  const v3Pos = new Vector3(position.x, position.y, position.z);

  useFrame(() => {
    if (!material || !geometry) {
      return;
    }
    ref.current?.position.set(position.x, position.y, position.z);
  });

  return (
    <group dispose={null} scale={scale} position={v3Pos} ref={ref}>
      <mesh
        geometry={geometry}
        material={material}
        castShadow
        receiveShadow
      ></mesh>
    </group>
  );
}
