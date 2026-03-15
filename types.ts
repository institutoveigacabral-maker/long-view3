
export interface SectionProps {
  id: string;
  isVisible?: boolean;
}

export enum Region {
  PORTUGAL = 'Portugal',
  LATAM = 'LatAm',
  IBERIA = 'Iberia',
  USA = 'USA',
  GULF = 'Gulf',
  CHINA = 'China',
  BRASIL = 'Brasil'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
