export interface ITrackingProgress {
  id: number;
  name: string;
  description: string;
  orderProgress: number;
  isDelete: boolean;

  createdBy: any;
  createdAt: Date;
  updatedBy: any;
  updatedAt: Date;
}