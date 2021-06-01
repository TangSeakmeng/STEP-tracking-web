import axios from './axios';
import jwt from 'jwt-decode';

import { IShippingControl } from '../models/ShippingControl.model';

export const getShippingControls = async (pageNumber: any) => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };

    let result;
    
    if (pageNumber) {
      result = await axios.get('http://localhost:8080/api/shippings', config);
    } else {
      result = await axios.get('http://localhost:8080/api/shippings', config);
    }
    
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const addShippingControl = async (shippmentPackageData: IShippingControl) => {
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

    const data: IShippingControl = {
      ...shippmentPackageData,
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

    const result = await axios.post('/api/shipping', data, config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const updateShippingControl = async (shippmentPackageData: IShippingControl) => {
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

    const data: IShippingControl = {
      ...shippmentPackageData,
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

    const result = await axios.post('/api/shipping', data, config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const deleteShippingControl = async (shippingControlData: IShippingControl) => {
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

    const result = await axios.put('/api/shipping/' + shippingControlData.id + "/delete", {
      ...shippingControlData,
      updatedBy: {
        username: sub
      }
    }, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}