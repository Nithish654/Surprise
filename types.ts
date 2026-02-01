
export enum AppState {
  ENTRY = 'ENTRY',
  OPENING = 'OPENING',
  PROPOSAL = 'PROPOSAL',
  CELEBRATION = 'CELEBRATION'
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}
