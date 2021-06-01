import React, { useState } from 'react';

import { IUser } from '../../models/User.model';
import { addUser } from '../../services/user.service';

function AddUserDialog(props: any) {
  const { closeModal, onAddUser, onUpdateUser, userData } = props;
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState(userData?.username || '');
  const [password, setPassword] = useState(userData?.password || '');
  const [firstName, setFirstName] = useState(userData?.firstName || '');
  const [lastName, setLastName] = useState(userData?.lastName || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [telephone, setTelephone] = useState(userData?.telephone || '');
  const [address, setAddress] = useState(userData?.address || '');
 
  const formSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data: IUser = {
      ...userData,
      username,
      password,
      firstName,
      lastName,
      email,
      telephone,
      address
    }

    if (!userData?.id) {
      const result = await addUser(data);
      onAddUser(result);
    } else {
      // const result = await updateTrackingProgress(trackingProgressData?.id, name, description, orderProgress);
      // onUpdateTrackingProgress(result);
    }
    
    setLoading(false);
  }

  return (
    <div className="dialogContainer">
      <div className="dialogHeader">
        {
          !userData?.id ? <h2>Add User</h2> : <h2>Update User</h2>
        }
        <button className="btn btnColor1" onClick={closeModal} style={{marginRight: '0px'}}>Close</button>
      </div>

      <form onSubmit={(e) => formSubmit(e)}>
        <div className="inputsContainer">
          <div className="inputContainer">
            <label className="label">Firstname</label>
            <input className="input" placeholder="enter firstname" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </div>

          <div className="inputContainer">
            <label className="label">Lastname</label>
            <input className="input" placeholder="enter lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </div>

          <div className="inputContainer">
            <label className="label">Username</label>
            <input className="input" placeholder="enter username" onChange={(e) => setUsername(e.target.value)} value={username} />
          </div>

          <div className="inputContainer">
            <label className="label">Password</label>
            <input className="input" placeholder="enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          <div className="inputContainer">
            <label className="label">Email</label>
            <input className="input" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className="inputContainer">
            <label className="label">Telephone</label>
            <input className="input" placeholder="enter telephone" onChange={(e) => setTelephone(e.target.value)} value={telephone} />
          </div>

          <div className="inputContainer">
            <label className="label">Address</label>
            <input className="input" placeholder="enter address" onChange={(e) => setAddress(e.target.value)} value={address} />
          </div>
        </div>

        <div className="groupActionButtons">
          <button className="btn btnColor1" onClick={closeModal}>Clear</button>
          {
            !loading ?
              <button className="btn btnColor2" style={{ marginRight: '0px' }} type="submit">
                {
                  !userData?.id ? <span>Add User</span> : <span>Save</span>
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

export default AddUserDialog;