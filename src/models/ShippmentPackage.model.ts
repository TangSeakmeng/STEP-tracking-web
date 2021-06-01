export interface IShippmentPackage {
  id: number;
  originTrackingNumber: string;
  packageCode: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  owner: any;
  status: string;
  isDelete: boolean;

  createdBy: any;
  createdAt: Date;
  updatedBy: any;
  updatedAt: Date;
}