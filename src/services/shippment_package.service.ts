import axios from './axios';
import jwt from 'jwt-decode';

import { IShippmentPackage } from '../models/ShippmentPackage.model';

export const getShippmentPackages = async (pageNumber: any) => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };

    let result;
    
    if(pageNumber)
      result = await axios.get('http://localhost:8080/api/packages?pageNumber=' + pageNumber, config);
    else
      result = await axios.get('http://localhost:8080/api/packages', config);
    
    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const searchShippmentPackages = async (keyword: string) => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };
    
    const result = await axios.get('http://localhost:8080/api/packages/search/' + keyword, config);
    
    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const addShippmentPackage = async (shippmentPackageData: IShippmentPackage) => {
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

    const data: IShippmentPackage = {
      ...shippmentPackageData,
      status: 'Preparing',
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

    const result = await axios.post('/api/packages', data, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const updateShippmentPackage = async (shippmentPackageData: IShippmentPackage) => {
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
      ...shippmentPackageData,
      status: 'Prepared',
      updatedAt: new Date(),
      updatedBy: {
        username: sub
      },
    };

    const result = await axios.put('/api/packages/' + data.id, data, config);
    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const deleteShippmentPackage = async (shippmentPackageData: IShippmentPackage) => {
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

    const result = await axios.put('/api/packages/' + shippmentPackageData.id + "/delete", {
      ...shippmentPackageData,
      updatedBy: {
        username: sub
      }
    }, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}