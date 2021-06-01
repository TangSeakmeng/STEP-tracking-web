import React, { useState } from 'react';

import { addTrackingProgress, updateTrackingProgress } from '../../services/tracking_progress.service';

function AddTrackingProgress(props: any) {
  const { closeModal, onAddTrackingProgress, onUpdateTrackingProgress, trackingProgressData } = props;

  const [name, setName] = useState(trackingProgressData?.name || '');
  const [description, setDescription] = useState(trackingProgressData?.description || '')
  const [orderProgress, setOrderProgress] = useState(trackingProgressData?.order_progress || 0)

  const [loading, setLoading] = useState(false)

  const formSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!trackingProgressData?.id) {
      const result = await addTrackingProgress(name, description, orderProgress);
      onAddTrackingProgress(result);
    } else {
      const result = await updateTrackingProgress(trackingProgressData?.id, name, description, orderProgress);
      onUpdateTrackingProgress(result);
    }
    
    setLoading(false);
  }

  return (
    <div className="dialogContainer">
      <div className="dialogHeader">
        {
          !trackingProgressData?.id ? <h2>Add Tracking Progress</h2> : <h2>Update Tracking Progress</h2>
        }
        <button className="btn btnColor1" onClick={closeModal} style={{marginRight: '0px'}}>Close</button>
      </div>

      <form onSubmit={(e) => formSubmit(e)}>
        <div className="inputsContainer">
          <div className="inputContainer">
            <label className="label">Name</label>
            <input className="input" placeholder="enter name" onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className="inputContainer">
            <label className="label">Description</label>
            <textarea className="input" placeholder="enter description" rows={10} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </div>

          <div className="inputContainer">
            <label className="label">Order Progress</label>
            <input className="input" placeholder="enter order progress" type="number" onChange={(e) => setOrderProgress(e.target.value)} value={orderProgress} />
          </div>
        </div>

        <div className="groupActionButtons">
          <button className="btn btnColor1" onClick={closeModal}>Clear</button>
          {
            !loading ?
              <button className="btn btnColor2" style={{ marginRight: '0px' }} type="submit">
                {
                  !trackingProgressData?.id ? <span>Add Tracking Progress</span> : <span>Save</span>
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

export default AddTrackingProgress;