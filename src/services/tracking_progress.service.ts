import axios from './axios';
import jwt from 'jwt-decode';

import { ITrackingProgress } from '../models/TrackingProgress.model';

export const getTrackingProgresses = async () => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };
    
    const result = await axios.get('http://localhost:8080/api/tracking_progresses', config);
    
    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const searchTrackingProgresses = async (keyword: string) => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };
    
    const result = await axios.get('http://localhost:8080/api/tracking_progresses/search/' + keyword, config);
    
    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const addTrackingProgress = async (name: string, description: string, orderProgress: number) => {
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

    const result = await axios.post('/api/tracking_progresses', {
      name,
      description,
      isDelete: false,
      orderProgress,
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

export const updateTrackingProgress = async (id: number, name: string, description: string, orderProgress: number) => {
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
      orderProgress,
      updatedAt: new Date(),
      updatedBy: {
        username: sub
      },
    };

    const result = await axios.put('/api/tracking_progresses/' + id, data, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const deleteTrackingProgress = async (trackingProgressData: ITrackingProgress) => {
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

    const result = await axios.put('/api/tracking_progresses/' + trackingProgressData.id + "/delete", {
      ...trackingProgressData,
      updatedBy: {
        username: sub
      }
    }, config);

    return result.data;

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}