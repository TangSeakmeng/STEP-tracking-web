import axios from './axios';
import jwt from 'jwt-decode';

import { IShippingControl } from '../models/ShippingControl.model';
import { IShippingDetail } from '../models/ShippingDetail.model';

export const getShippingDetails = async (pageNumber: any, shippingId: any) => {
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
      result = await axios.get('http://localhost:8080/api/shipping_details/' + shippingId, config);
    } else {
      result = await axios.get('http://localhost:8080/api/shipping_details/' + shippingId, config);
    }
    
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const addShippingDetail = async (shippmentDetailData: IShippingDetail) => {
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

    const data: IShippingDetail = {
      ...shippmentDetailData,
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

    const result = await axios.post('/api/shipping_detail', data, config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const updateShippingDetail = async (shippmentDetailData: IShippingDetail) => {
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

    const data: IShippingDetail = {
      ...shippmentDetailData,
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

export const deleteShippingDetail = async (shippingDetailData: IShippingDetail) => {
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

    const result = await axios.put('/api/shipping/' + shippingDetailData.shipping.id + "/" + shippingDetailData.shippmentPackage.id + "/delete", {
      ...shippingDetailData,
      updatedBy: {
        username: sub
      }
    }, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}