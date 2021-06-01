import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { ITrackingProgress } from '../../models/TrackingProgress.model';
import { IShippingTracking } from '../../models/ShippingTracking.model';
import { getTrackingProgresses } from '../../services/tracking_progress.service';
import { addShippingTracking, updateShippingTracking } from '../../services/shipping_tracking.service';

function AddShippingTrackingDialog(props: any) {
  const { closeModal, onAddShippingTracking, onUpdateShippingTracking, shippingTrackingData, shippingMasterData } = props;

  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const [trackingProgress, setTrackingProgress] = useState([] as ITrackingProgress[]);

  const [shipping, setShipping] = useState(shippingTrackingData?.shippingDate || null);
  const [selectedTrackingProgress, setSelectedTrackingProgress] = useState(shippingTrackingData?.shippingDate || '');
  const [checkPointDateTime, setCheckPointDateTime] = useState(convertDateToStrDate(new Date()));
  const [checkPointOrigin, setCheckPointOrigin] = useState(shippingTrackingData?.shippingDate || '');
  const [checkPointDestination, setCheckPointDestination] = useState(shippingTrackingData?.shippingDate || '');

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      const result = await getTrackingProgresses();
      setSelectedTrackingProgress(result[0].id);
      setTrackingProgress(result);

      forceUpdate(1);
      setLoading(false);
    }
    
    fetchDataAsync();
  }, []);
 
  const formSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let trackingIndex = 0;
    
    trackingProgress.forEach((item, index) => {
      if (item.id === selectedTrackingProgress)
        trackingIndex = index;
    });

    const data: IShippingTracking = {
      ...shippingTrackingData,
      shipping: {
        id: shippingMasterData
      },
      trackingProgress: {
        id: selectedTrackingProgress
      },
      trackingOrder: trackingProgress[trackingIndex].orderProgress,
      dateTime: getJavaDateTimeFormat(new Date()),
      origin: checkPointOrigin,
      destination: checkPointDestination
    }

    if (!data?.trackingProgress.name) {
      const result = await addShippingTracking(data);
      onAddShippingTracking(result);
    } else {
      const result = await updateShippingTracking(data);
      onUpdateShippingTracking(result);
    }
    
    setLoading(false);
    e.target.reset();
  }

  return (
    <div className="dialogContainer">
      <div className="dialogHeader">
        {
          !shippingTrackingData?.id ? <h2>Add Shipping Tracking</h2> : <h2>Update Shipping Tracking</h2>
        }
        <button className="btn btnColor1" onClick={closeModal} style={{marginRight: '0px'}}>Close</button>
      </div>

      <form onSubmit={(e) => formSubmit(e)}>
        <div className="inputsContainer">
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
            <label className="label">Checkout DateTime</label>
            <input className="input" placeholder="enter shipping document number" readOnly
              onChange={(e) => setCheckPointDateTime(e.target.value)} value={checkPointDateTime} />
          </div>

          <div className="inputContainer">
            <label className="label">Checkout Origin</label>
            <input className="input" placeholder="enter checkpoint origin" required
              onChange={(e) => setCheckPointOrigin(e.target.value)} value={checkPointOrigin} />
          </div>

          <div className="inputContainer">
            <label className="label">Checkout Destination</label>
            <input className="input" placeholder="enter checkpoint destination" required
              onChange={(e) => setCheckPointDestination(e.target.value)} value={checkPointDestination} />
          </div>
        </div>

        <div className="groupActionButtons">
          <button className="btn btnColor1" onClick={closeModal}>Clear</button>
          {
            !loading ?
              <button className="btn btnColor2" style={{ marginRight: '0px' }} type="submit">
                {
                  !shippingTrackingData?.shipping?.id && !shippingTrackingData?.trackingProgress?.id ? <span>Add Shipping Tracking</span> : <span>Save</span>
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
  return moment(dt).format('YYYY-MM-DD hh:mm:ss A');
}

export const getPageKey = () => {
  return Number(moment().format('YYYYMMDDHHmmss'))
}

export const getJavaDateTimeFormat = (dt: Date) => {
  return moment(dt).format('YYYY-MM-DDTHH:mm:ss.000')
}

export default AddShippingTrackingDialog;