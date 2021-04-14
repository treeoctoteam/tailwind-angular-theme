export interface AnimationParams {
  duration: number;
  delay: number;
  opacity: number;
  scale: number;
  x: number;
  y: number;
  z: number;
  selectedEase: AnimationEasing;
}

export interface OctoAnimation {
  name: string;
  params: AnimationParams;
}

export type AnimationEasing = 'ease-in' | 'ease-out' | 'ease-in-out' | 'none';
export type AnimationTransitions = 'enter' | 'leave';
