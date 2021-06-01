import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import styled from "styled-components";

import { IShippingTracking } from '../../models/ShippingTracking.model';
import { dialogCustomStyleConfig } from '../../config/dialogCustomStyleConfig';
import { deleteShippingTracking, getShippingTrackings } from '../../services/shipping_tracking.service';
import AddShippingTrackingDialog from '../../components/dialogs/AddShippingTrackingDialog';


function ShippingTrackingPage(props: any) {
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  const [shippingId, setShippingId] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [shippingTrackings, setShippingTrackings] = useState([] as IShippingTracking[]);
  const [selectedShippingTracking, setSelectedShippingTracking] = useState(Object);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      let search = window.location.search;
      let params = new URLSearchParams(search);
      let param_shippingId = params.get('shippingId');
      setShippingId(param_shippingId || '');

      const result = await getShippingTrackings(param_shippingId);
      setShippingTrackings(result);

      setLoading(false);
    }
    
    fetchDataAsync()
  }, []);
  
  const openModal = () => {
    setSelectedShippingTracking(null);
    setIsOpen(true);
  }

  const openModal2 = (shippingTrackingData: IShippingTracking) => {
    setSelectedShippingTracking(shippingTrackingData);
    setIsOpen(true);
  }

  const afterOpenModal = () => { }

  const closeModal = () => {
    setIsOpen(false);
  }

  const addShippingTracking = (shippingTrackingData: IShippingTracking) => {
    shippingTrackings.push(shippingTrackingData);
    setSelectedShippingTracking(shippingTrackings);
  }

  const updateShippingTracking = (shippingTrackingData: IShippingTracking) => {
    const index = shippingTrackings.findIndex((item) => item.shipping.id === shippingTrackingData.shipping.id
      && item.trackingProgress.id === shippingTrackingData.trackingProgress.id);
    if (index >= 0) {
      shippingTrackings[index] = shippingTrackingData
      setSelectedShippingTracking(shippingTrackings);
    }
  }

  const deleteShippingTrackingClicked = async (shippingTrackingData: IShippingTracking) => {
    await deleteShippingTracking(shippingTrackingData);
    const index = shippingTrackings.findIndex((item) => item.shipping.id === shippingTrackingData.shipping.id
      && item.trackingProgress.id === shippingTrackingData.trackingProgress.id);
    if (index >= 0) {
      shippingTrackings.splice(index, 1);
      setSelectedShippingTracking(shippingTrackings);
      forceUpdate(1);
    }
  }

  const keywordChanged = async (e: any) => {
    const temp = e.target.value;
    setKeyword(temp);

    if (temp === '/')
      return;

    if (temp === '' || !temp) {
      const result = await getShippingTrackings(shippingId);
      setShippingTrackings(result);
    } else {
      // const result = await searchShippmentPackages(e.target.value);
      // setShippingControls(result);
    }
  }

  const calculateSubtotalAndRoundNumber = (weight: number, price: number) => {
    const result = weight * price;
    return result.toFixed(2);
  }

  const convertStrDateTimeToDateTime = (value: any) => {
    const result = moment(value).format('DD-MMM-YYYY hh:mm:ss A');
    return result;
  }

  return (
    <>
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1>Shipping Tracking (Shipping ID: {shippingId})</h1>

          <div className="actionGroup">
            <button className="btn btnColor1" style={{marginRight: '0px'}} onClick={openModal}>Add New Shipping Tracking</button>
          </div>
        </div>
      
        <div className="tableContainer">
          <table>
            <thead>
              <tr className="tableHeader">
                <th>Shipping ID</th>
                <th>Tracking Order</th>
                <th>Tracking Description</th>
                <th>Checkpoint DateTime</th>
                <th>Checkpoint Origin</th>
                <th>Checkpoint Destination</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Edit / View / Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                shippingTrackings?.length === 0 ?
                  <tr>
                    <td colSpan={11} style={{textAlign: 'center'}}>No Rows.</td>
                  </tr>
                  :
                  shippingTrackings.map((item: IShippingTracking, index) => {
                    return <tr key={index}>
                      <td>{item?.shipping?.id}</td>
                      <td>{item?.trackingProgress?.orderProgress}</td>
                      <td>{item?.trackingProgress?.name}</td>
                      <td>{convertStrDateTimeToDateTime(item?.dateTime)}</td>
                      <td>{item?.origin}</td>
                      <td>{item?.destination}</td>
                      <td>{item?.createdBy?.username}</td>
                      <td>{convertStrDateTimeToDateTime(item?.createdAt)}</td>
                      <td>
                        <button className="btn btnColor3" style={{marginRight: '0px'}} onClick={() => deleteShippingTrackingClicked(item)}>Delete</button>
                      </td>
                    </tr>
                  })
              } 

            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={dialogCustomStyleConfig}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        contentLabel="Example Modal"
      >
        <AddShippingTrackingDialog closeModal={closeModal} onAddShippingTracking={addShippingTracking}
          onUpdateShippingTracking={updateShippingTracking} shippingTrackingData={selectedShippingTracking} shippingMasterData={shippingId}  />
      </Modal>
    </>
  );
}

export const SelectOrderData = styled.select`
  width: 300px;
  margin-right: 20px;
  border: 1px solid grey;   
  outline: none;
  padding: 10px;
  border-radius: 5px;
`;

export default ShippingTrackingPage;
