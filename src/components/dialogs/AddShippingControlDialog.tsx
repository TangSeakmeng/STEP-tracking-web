import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { addShippingControl, updateShippingControl } from '../../services/shipping_control.service';
import { getShippingService } from '../../services/shipping_service.service';
import { getTrackingProgresses } from '../../services/tracking_progress.service';

import { IShippingService } from '../../models/ShippingService.model';
import { ITrackingProgress } from '../../models/TrackingProgress.model';
import { IShippingControl } from '../../models/ShippingControl.model';

function AddShippingControlDialog(props: any) {
  const { closeModal, onAddShippingControlData, onUpdateShippingControlData, shippmentControlData } = props;

  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const [shippingService, setShippingService] = useState([]);
  const [trackingProgress, setTrackingProgress] = useState([]);

  const [shippingDate, setShippingDate] = useState(shippmentControlData?.shippingDate || convertDateToStrDate(new Date()));
  const [selectedShippingService, setSelectedShippingService] = useState(shippmentControlData?.shippingDate || '');
  const [selectedTrackingProgress, setSelectedTrackingProgress] = useState(shippmentControlData?.shippingDate || '');
  const [shippingControllerName, setShippingControllerName] = useState(shippmentControlData?.shippingDate || '');
  const [shippingDocumentNumber, setShippingDocumentNumber] = useState(shippmentControlData?.shippingDate || '');
  const [shippingOrigin, setShippingOrigin] = useState(shippmentControlData?.shippingDate || '');
  const [shippingDestination, setShippingDestination] = useState(shippmentControlData?.shippingDate || '');

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      const result1 = await getShippingService();
      const result2 = await getTrackingProgresses();
      
      setShippingService(result1);
      setTrackingProgress(result2);

      setSelectedShippingService(result1[0].id)
      setSelectedTrackingProgress(result2[0].id)

      forceUpdate(1);
      setLoading(false);
    }
    
    fetchDataAsync();
  }, []);
 
  const formSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const dtShippingDate = moment(shippingDate, 'YYYY-MM-DD');
    const data: IShippingControl = {
      ...shippmentControlData,
      shippingDate: dtShippingDate,
      shippingService: {
        id: selectedShippingService
      },
      trackingProgress: {
        id: selectedTrackingProgress
      },
      shippingControllerName,
      shippingDocumentNumber,
      shippingOrigin,
      shippingDestination
    }

    if (!data?.id) {
      const result = await addShippingControl(data);
      onAddShippingControlData(result);
    } else {
      const result = await updateShippingControl(data);
      onUpdateShippingControlData(result);
    }
    
    setLoading(false);
    e.target.reset();
  }

  return (
    <div className="dialogContainer">
      <div className="dialogHeader">
        {
          !shippmentControlData?.id ? <h2>Add Shipping Control</h2> : <h2>Update Shipping Control</h2>
        }
        <button className="btn btnColor1" onClick={closeModal} style={{marginRight: '0px'}}>Close</button>
      </div>

      <form onSubmit={(e) => formSubmit(e)}>
        <div className="inputsContainer">
          <div className="inputContainer">
            <label className="label">Shipping Date</label>
            <input className="input" type="date" placeholder="enter shipping date" required
              onChange={(e) => setShippingDate(e.target.value)} value={shippingDate} />
          </div>

          <div className="inputContainer">
            <label className="label">Shipping Service</label>
            <select className="input" onChange={(e) => setSelectedShippingService(e.target.value)} value={selectedShippingService}>
              {
                shippingService.map((item: IShippingService, index: number) => {
                  return <option key={index} value={item.id}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div className="inputContainer">
            <label className="label">Tracking Progress</label>
            <select  className="input" onChange={(e) => setSelectedTrackingProgress(e.target.value)} value={selectedTrackingProgress}>
              {
                trackingProgress.map((item: ITrackingProgress, index: number) => {
                  return <option key={index} value={item.id}>{item.orderProgress}. {item.name}</option>
                })
              }
            </select>
          </div>

          <div className="inputContainer">
            <label className="label">Shipping Controller Name</label>
            <input className="input" placeholder="enter shipping controller name" required
              onChange={(e) => setShippingControllerName(e.target.value)} value={shippingControllerName} />
          </div>

          <div className="inputContainer">
            <label className="label">Shipping Document Number</label>
            <input className="input" placeholder="enter shipping document number" required
              onChange={(e) => setShippingDocumentNumber(e.target.value)} value={shippingDocumentNumber} />
          </div>

          <div className="inputContainer">
            <label className="label">Shipping Origin</label>
            <input className="input" placeholder="enter shipping origin" required
              onChange={(e) => setShippingOrigin(e.target.value)} value={shippingOrigin} />
          </div>

          <div className="inputContainer">
            <label className="label">Shipping Destination</label>
            <input className="input" placeholder="enter shipping destination" required
              onChange={(e) => setShippingDestination(e.target.value)} value={shippingDestination} />
          </div>
        </div>

        <div className="groupActionButtons">
          <button className="btn btnColor1" onClick={closeModal}>Clear</button>
          {
            !loading ?
              <button className="btn btnColor2" style={{ marginRight: '0px' }} type="submit">
                {
                  !shippmentControlData?.id ? <span>Add Shipping Control</span> : <span>Save</span>
                }
              </button>
              :
            <button className="btn btnColor2" style={{marginRight: '0px'}} type="button">Loading ...</button>
          }
        </div>
      </form>
    </div>
  );
}

export const convertDateToStrDate = (dt: Date) => {
  return moment(dt).format('YYYY-MM-DD');
}

export const getPageKey = () => {
  return Number(moment().format('YYYYMMDDHHmmss'))
}

export default AddShippingControlDialog;