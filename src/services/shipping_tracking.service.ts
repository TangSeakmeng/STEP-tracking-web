import axios from './axios';
import jwt from 'jwt-decode';

import { IShippingTracking } from '../models/ShippingTracking.model';

export const getShippingTrackings = async (shippingId: any) => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };

    let result = await axios.get('http://localhost:8080/api/shipping_tracking/' + shippingId, config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const addShippingTracking = async (shippingTrackingData: IShippingTracking) => {
  try {
    const token = localStorage.getItem('auth_token') || '';
    const { sub } = jwt(token.replace('Bearer ', '')) as any;

    var config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': token,
      },
    };

    const data: IShippingTracking = {
      ...shippingTrackingData,
      isDelete: false,
      createdAt: new Date(),
      createdBy: {
        username: sub
      },
      updatedAt: new Date(),
      updatedBy: {
        username: sub
      },
    };

    const result = await axios.post('/api/shipping_tracking', data, config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const updateShippingTracking = async (shippingTrackingData: IShippingTracking) => {
  try {
    const token = localStorage.getItem('auth_token') || '';
    const { sub } = jwt(token.replace('Bearer ', '')) as any;

    var config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': token,
      },
    };

    const data: IShippingTracking = {
      ...shippingTrackingData,
      isDelete: false,
      createdAt: new Date(),
      createdBy: {
        username: sub
      },
      updatedAt: new Date(),
      updatedBy: {
        username: sub
      },
    };

    const result = await axios.post('/api/shipping_tracking', data, config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const deleteShippingTracking = async (shippingTrackingData: IShippingTracking) => {
  try {
    const token = localStorage.getItem('auth_token') || '';
    const { sub } = jwt(token.replace('Bearer ', '')) as any;

    var config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': token,
      },
    };

    const result = await axios.put('/api/shipping_tracking/' + shippingTrackingData.shipping.id + "/" + shippingTrackingData.trackingProgress.id + "/delete", {
      ...shippingTrackingData,
      updatedBy: {
        username: sub
      }
    }, config);

    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}