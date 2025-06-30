
export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  description: string;
  startDate: Date;
  expectedDelivery: Date;
  clientNote?: string;
}
