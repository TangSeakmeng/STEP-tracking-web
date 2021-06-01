import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { IShippingDetail } from '../../models/ShippingDetail.model';
import { addShippingDetail, updateShippingDetail } from '../../services/shipping_detail.service';

function AddShippingDetailDialog(props: any) {
  const { closeModal, onAddShippingDetail, onUpdateShippingDetail, shippingDetailData, shippingMasterData } = props;

  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);

  const [shipping, setShipping] = useState(shippingDetailData?.shippingDate || null);
  const [packageCode, setPackageCode] = useState(shippingDetailData?.shippingDate || '');
 
  const formSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data: IShippingDetail = {
      ...shippingDetailData,
      shipping: {
        id: shippingMasterData
      },
      shippmentPackage: {
        packageCode
      }
    }

    if (!data?.shippmentPackage?.id) {
      const result = await addShippingDetail(data);
      onAddShippingDetail(result);
    } else {
      const result = await updateShippingDetail(data);
      onUpdateShippingDetail(result);
    }
    
    setLoading(false);
    e.target.reset();
  }

  return (
    <div className="dialogContainer">
      <div className="dialogHeader">
        {
          !shippingDetailData?.id ? <h2>Add Shipping Detail</h2> : <h2>Update Shipping Detail</h2>
        }
        <button className="btn btnColor1" onClick={closeModal} style={{marginRight: '0px'}}>Close</button>
      </div>

      <form onSubmit={(e) => formSubmit(e)}>
        <div className="inputsContainer">
          <div className="inputContainer">
            <label className="label">Package Code</label>
            <input className="input" placeholder="enter package code" onChange={(e) => setPackageCode(e.target.value)} value={packageCode} />
          </div>
        </div>

        <div className="groupActionButtons">
          <button className="btn btnColor1" onClick={closeModal}>Clear</button>
          {
            !loading ?
              <button className="btn btnColor2" style={{ marginRight: '0px' }} type="submit">
                {
                  !shippingDetailData?.shipping?.id && !shippingDetailData?.shippmengPackage?.id ? <span>Add Shipping Detail</span> : <span>Save</span>
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

export const convertDateToStrDate = (dt: Date) => {
  return moment(dt).format('YYYY-MM-DD');
}

export const getPageKey = () => {
  return Number(moment().format('YYYYMMDDHHmmss'))
}

export default AddShippingDetailDialog;