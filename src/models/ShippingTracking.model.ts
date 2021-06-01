import { IShippingControl } from "./ShippingControl.model";
import { ITrackingProgress } from "./TrackingProgress.model";

export interface IShippingTracking {
  shipping: IShippingControl;
  trackingProgress: ITrackingProgress;
  trackingOrder: number;
  dateTime: Date;
  origin: String;
  destination: String;
  isDelete: boolean;

  createdBy: any;
  createdAt: Date;
  updatedBy: any;
  updatedAt: Date;
}