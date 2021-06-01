import { IShippingControl } from "./ShippingControl.model";
import { IShippmentPackage } from "./ShippmentPackage.model";

export interface IShippingDetail {
  shipping: IShippingControl;
  shippmentPackage: IShippmentPackage;
  isDelete: boolean;

  createdBy: any;
  createdAt: Date;
  updatedBy: any;
  updatedAt: Date;
}