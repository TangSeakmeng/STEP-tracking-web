import axios from './axios';
import jwt from 'jwt-decode';

import { IUser } from '../models/User.model';

export const userLogin = async (username: string, password: string) => {
  try {
    var config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Expose-Headers': 'Authorization',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
    };

    const result = await axios.post('/api/auth/login', {
      username,
      password
    });

    const { authorization } = result.headers;
    const { sub } = jwt(authorization.replace('Bearer ', '')) as any;
    
    localStorage.setItem('auth_token', authorization);
    localStorage.setItem('auth_user', sub);

    alert('login successfully!')

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const addUser = async (userData: IUser) => {
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

    console.log(userData)

    const result = await axios.post('/api/users', {
      ...userData,
      isAdmin: true,
      createdAt: new Date(),
      createdBy: sub,
      updatedAt: new Date(),
      updatedBy: sub
    }, config);

    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const getUser = async (id: string) => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };
    
    axios.get('http://localhost:8080/api/users', config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });    

  } catch(error) {
    alert(`Oops! ${error}`)
  }
}

export const getUsers = async () => {
  try {
    const token = localStorage.getItem('auth_token');
     
    var config = {
      headers: { 
        'Authorization': token,
        'Accept': 'application/json',
      }
    };
    
    const result = await axios.get('http://localhost:8080/api/users', config);
    return result.data;
  } catch(error) {
    alert(`Oops! ${error}`)
  }
}