import axios from './axios';
import jwt from 'jwt-decode';

import { IShippingService } from '../models/ShippingService.model';

export const getShippingService = async () => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };
    
    const result = await axios.get('http://localhost:8080/api/shipping_services', config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const searchShippingServices = async (keyword: string) => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };
    
    const result = await axios.get('http://localhost:8080/api/shipping_services/search/' + keyword, config);
    
    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const addShippingService = async (name: string, description: string, price: number) => {
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

    const result = await axios.post('/api/shipping_services', {
      name,
      description,
      isDelete: false,
      price,
      createdAt: new Date(),
      createdBy: {
        username: sub
      },
      updatedAt: new Date(),
      updatedBy: {
        username: sub
      },
    }, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const updateShippingService = async (id: number, name: string, description: string, price: number) => {
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

    const data = {
      name,
      description,
      price,
      updatedAt: new Date(),
      updatedBy: {
        username: sub
      },
    };

    const result = await axios.put('/api/shipping_services/' + id, data, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const deleteShippingService = async (shippingServiceData: IShippingService) => {
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

    const result = await axios.put('/api/shipping_services/' + shippingServiceData.id + "/delete", {
      ...shippingServiceData,
      updatedBy: {
        username: sub
      }
    }, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}