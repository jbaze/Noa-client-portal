
export interface Delivery {
  id: string;
  projectId: string;
  name: string;
  description: string;
  deliveryDate: Date;
  downloadUrl: string;
  fileSize: string;
  fileType: string;
  status: 'delivered' | 'pending_feedback' | 'approved';
}
