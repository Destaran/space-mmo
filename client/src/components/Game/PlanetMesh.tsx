import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Planet } from "../../socket.type";
import { Group, Mesh, Vector3 } from "three";
import { useRef } from "react";

interface MeshProps {
  planet: Planet;
}

export function PlanetMesh({ planet }: MeshProps) {
  const { name, position } = planet;
  const v3Pos = new Vector3(position.x, position.y, position.z);
  const grpRef = useRef<Group>(null);

  const gltf = useGLTF(`/glb/${name}.glb`);
  const mesh = gltf.scene.getObjectByName(name) as Mesh;

  useFrame(() => {
    if (!mesh) {
      return;
    }
    grpRef.current?.position.set(position.x, position.y, position.z);
    console.log(grpRef.current?.position);
  });

  return (
    <group dispose={null} scale={0.1} position={v3Pos} ref={grpRef}>
      <mesh geometry={mesh.geometry} material={mesh.material} />
    </group>
  );
}
