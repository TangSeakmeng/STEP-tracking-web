export interface IShippingService {
  id: number;
  name: string;
  description: string;
  price: number;
  isDelete: boolean;

  createdBy: any;
  createdAt: Date;
  updatedBy: any;
  updatedAt: Date;
}