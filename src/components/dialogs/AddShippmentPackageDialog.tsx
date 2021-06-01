import React, { useState } from 'react';
import moment from 'moment';

import { addShippmentPackage, updateShippmentPackage } from '../../services/shippment_package.service';
import { IShippmentPackage } from '../../models/ShippmentPackage.model';

function AddShippmentPackage(props: any) {
  const { closeModal, onAddShippmentPackage, onUpdateShippmentPackage, shippmentPackageData } = props;

  const [originTrackingNumber, setOriginTrackingNumber] = useState(shippmentPackageData?.originTrackingNumber || '');
  const [name, setName] = useState(shippmentPackageData?.name || 'N/A');
  const [description, setDescription] = useState(shippmentPackageData?.description || 'N/A')
  const [packageCode, setPackageCode] = useState(shippmentPackageData?.packageCode || getPageKey());
  const [weight, setWeight] = useState(shippmentPackageData?.weight || '');

  const [loading, setLoading] = useState(false)

  const formSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data: IShippmentPackage = {
      ...shippmentPackageData,
      name,
      description,
      weight,
      packageCode,
      originTrackingNumber,
      price: 0
    }

    if (!data?.id) {
      const result = await addShippmentPackage(data);
      onAddShippmentPackage(result);
    } else {
      const result = await updateShippmentPackage(data);
      onUpdateShippmentPackage(result);
    }
    
    setLoading(false);
    e.target.reset();
  }

  return (
    <div className="dialogContainer">
      <div className="dialogHeader">
        {
          !shippmentPackageData?.id ? <h2>Add Package</h2> : <h2>Update Package</h2>
        }
        <button className="btn btnColor1" onClick={closeModal} style={{marginRight: '0px'}}>Close</button>
      </div>

      <form onSubmit={(e) => formSubmit(e)}>
        <div className="inputsContainer">
          <div className="inputContainer">
            <label className="label">Origin Tracking Number</label>
            <input className="input" placeholder="enter origin tracking number" required
              onChange={(e) => setOriginTrackingNumber(e.target.value)} value={originTrackingNumber} />
          </div>

          <div className="inputContainer">
            <label className="label">Package Code</label>
            <input className="input" placeholder="enter package code" readOnly={true}
              onChange={(e) => setPackageCode(e.target.value)} value={packageCode} required />
          </div>

          <div className="inputContainer">
            <label className="label">Name</label>
            <input className="input" placeholder="enter name" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>

          <div className="inputContainer">
            <label className="label">Description</label>
            <textarea className="input" placeholder="enter description" rows={10} onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
          </div>

          <div className="inputContainer">
            <label className="label">Weight (kg)</label>
            <input className="input" placeholder="enter weight" type="number" step="0.01" onChange={(e) => setWeight(e.target.value)} value={weight} required />
          </div>
        </div>

        <div className="groupActionButtons">
          <button className="btn btnColor1" onClick={closeModal}>Clear</button>
          {
            !loading ?
              <button className="btn btnColor2" style={{ marginRight: '0px' }} type="submit">
                {
                  !shippmentPackageData?.id ? <span>Add Package</span> : <span>Save</span>
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

export const getPageKey = () => {
  return Number(moment().format('YYYYMMDDHHmmss'))
}

export default AddShippmentPackage;