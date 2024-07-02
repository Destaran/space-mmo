import { useGLTF } from "@react-three/drei";

export function preloadAssets() {
  useGLTF.preload("./glb/Sun.glb");
  useGLTF.preload("./glb/Mercury.glb");
  useGLTF.preload("./glb/UFO.glb");
}
