import React, { useState } from 'react';

import { addShippingService, updateShippingService } from '../../services/shipping_service.service';

function AddShippingService(props: any) {
  const { closeModal, onAddShippingService, onUpdateShippingService, shippingServiceData } = props;

  const [name, setName] = useState(shippingServiceData?.name || '');
  const [description, setDescription] = useState(shippingServiceData?.description || '')
  const [price, setPrice] = useState(shippingServiceData?.price || 0)

  const [loading, setLoading] = useState(false)

  const formSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!shippingServiceData?.id) {
      const result = await addShippingService(name, description, price);
      onAddShippingService(result);
    } else {
      const result = await updateShippingService(shippingServiceData?.id, name, description, price);
      onUpdateShippingService(result);
    }
    
    setLoading(false);
  }

  return (
    <div className="dialogContainer">
      <div className="dialogHeader">
        {
          !shippingServiceData?.id ? <h2>Add Shipping Service</h2> : <h2>Update Shipping Service</h2>
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
            <label className="label">Price</label>
            <input className="input" placeholder="enter price" type="number" step="0.01" onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>

          <div className="inputContainer">
            <label className="label">Description</label>
            <textarea className="input" placeholder="enter description" rows={10} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </div>
        </div>

        <div className="groupActionButtons">
          <button className="btn btnColor1" onClick={closeModal}>Clear</button>
          {
            !loading ?
              <button className="btn btnColor2" style={{ marginRight: '0px' }} type="submit">
                {
                  !shippingServiceData?.id ? <span>Add Shipping Service</span> : <span>Save</span>
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

export default AddShippingService;