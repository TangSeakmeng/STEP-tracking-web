import { IShippingService } from "./ShippingService.model";
import { ITrackingProgress } from "./TrackingProgress.model";

export interface IShippingControl {
  id: number;
  shippingDate: Date;
  shippingService: IShippingService;
  trackingProgress: ITrackingProgress;
  shippingControllerName: String;
  shippingDocumentNumber: String;
  shippingOrigin: Object;
  shippingDestination: Object;
  isDelete: boolean;

  createdBy: any;
  createdAt: Date;
  updatedBy: any;
  updatedAt: Date;
}