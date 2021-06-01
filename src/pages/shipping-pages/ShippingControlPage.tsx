import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import queryString from 'query-string';
import styled from "styled-components";
import { Link } from 'react-router-dom';

import AddShippingControlDialog from '../../components/dialogs/AddShippingControlDialog';
import { IShippingControl } from '../../models/ShippingControl.model';
import { dialogCustomStyleConfig } from '../../config/dialogCustomStyleConfig';

import { deleteShippingControl, getShippingControls } from '../../services/shipping_control.service';

function ShippingControl(props: any) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [shippingControls, setShippingControls] = useState([] as IShippingControl[]);
  const [selectedShippingControl, setSelectedShippingControl] = useState(Object);
  const [totalPagination, setTotalPagination] = useState(0);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      let search = window.location.search;
      let params = new URLSearchParams(search);
      let pageNumber = params.get('pageNumber');

      const result = await getShippingControls(pageNumber);
      // setTotalPagination(result.totalPages);
      setShippingControls(result);

      setLoading(false);
    }
    
    fetchDataAsync()
  }, []);
  
  const getPaginationData = async (pageNumber: number) => {
    setLoading(true);

    const result = await getShippingControls(pageNumber);
    setTotalPagination(result.totalPages);
    setShippingControls(result.content);

    setLoading(false);
  };
  
  const openModal = () => {
    setSelectedShippingControl(null);
    setIsOpen(true);
  }

  const openModal2 = (shippmentPackageData: IShippingControl) => {
    setSelectedShippingControl(shippmentPackageData);
    setIsOpen(true);
  }

  const afterOpenModal = () => { }

  const closeModal = () => {
    setIsOpen(false);
  }

  const addShippmentControl = (shippmentPackageData: IShippingControl) => {
    shippingControls.push(shippmentPackageData);
    setShippingControls(shippingControls);
  }

  const updateShippmentControl = (shippmentPackageData: IShippingControl) => {
    const index = shippingControls.findIndex((item) => item.id === shippmentPackageData.id);
    if (index >= 0) {
      shippingControls[index] = shippmentPackageData
      setShippingControls(shippingControls);
    }
  }

  const deleteShippmentControlClicked = async (shippingControlData: IShippingControl) => {
    await deleteShippingControl(shippingControlData);
    const index = shippingControls.findIndex((item) => item.id === shippingControlData.id);
    if (index >= 0) {
      shippingControls.splice(index, 1);
      setShippingControls(shippingControls);
      forceUpdate(1);
    }
  }

  const keywordChanged = async (e: any) => {
    const temp = e.target.value;
    setKeyword(temp);

    if (temp === '/')
      return;

    if (temp === '' || !temp) {
      const result = await getShippingControls(0);
      setShippingControls(result);
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

  const convertStrDateTimeToDateTime2 = (value: any) => {
    const result = moment(value).format('DD-MMM-YYYY');
    return result;
  }

  return (
    <>
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1>Shipping Control</h1>

          <div className="actionGroup">
            <SelectOrderData>
              <optgroup label="Ascending">
                <option value="DeliveredDate">Delivered Date</option>
                <option value="DeliveredOrigin">Delivered Origin</option>
              </optgroup>
              <optgroup label="Descending">
                <option value="DeliveredDate">Delivered Date</option>
                <option value="DeliveredOrigin">Delivered Origin</option>
              </optgroup>
            </SelectOrderData>
            <button className="btn btnColor5" style={{marginRight: '10px'}}>Apply</button>
          </div>

          <div className="actionGroup">
            <input className="input" placeholder="enter keyword" style={{marginRight: '10px'}} />
            <button className="btn btnColor5" style={{marginRight: '10px'}}>Search</button>
            <button className="btn btnColor1" style={{marginRight: '0px'}} onClick={openModal}>Add New Shipping Control</button>
          </div>
        </div>
      
        <div className="tableContainer">
          <table>
            <thead>
              <tr className="tableHeader">
                <th>ID</th>
                <th>Shipping Date</th>
                <th>Shipping Service</th>
                <th style={{width: '200px'}}>Tracking Progress</th>
                <th>Controller</th>
                <th>Document Num.</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Edit / View / Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                shippingControls?.length === 0 ?
                  <tr>
                    <td colSpan={11} style={{textAlign: 'center'}}>No Rows.</td>
                  </tr>
                  :
                  shippingControls.map((item: IShippingControl, index) => {
                    const trackingLink = `/shipping_tracking?shippingId=${item.id}`;
                    const detailLink = `/shipping_detail?shippingId=${item.id}`;

                    return <tr key={index}>
                      <td>{item?.id}</td>
                      <td>{convertStrDateTimeToDateTime2(item?.shippingDate)}</td>
                      <td>{item?.shippingService?.name}</td>
                      <td>{item?.trackingProgress?.name}</td>
                      <td>{item?.shippingControllerName}</td>
                      <td>{item?.shippingDocumentNumber}</td>
                      <td>{item?.shippingOrigin}</td>
                      <td>{item?.shippingDestination}</td>
                      <td>{item?.createdBy?.username}</td>
                      <td>{convertStrDateTimeToDateTime2(item.createdAt)}</td>
                      <td>
                        <button className="btn btnColor1" onClick={() => openModal2(item)}>Edit</button>
                        <Link to={detailLink}><button className="btn btnColor2">Packages</button></Link>
                        <Link to={trackingLink}><button className="btn btnColor2">Tracking</button></Link>
                        {/* <button className="btn btnColor3" style={{marginRight: '0px'}} onClick={() => deleteShippingControl(item)}>Delete</button> */}
                      </td>
                    </tr>
                  })
              } 

            </tbody>
          </table>
        </div>

        <div className="paginationContainer">
          {
            [...Array(totalPagination)].map((x, i) => {
              const url = `/package?pageNumber=${i}`;
              return <Link className="paginationElement" to={url} key={i} onClick={() => getPaginationData(i)} >{i + 1}</Link>
            })
          }
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
        <AddShippingControlDialog closeModal={closeModal} onAddShippingControlData={addShippmentControl}
          onUpdateShippingControlData={updateShippmentControl} shippmentPackageData={selectedShippingControl} />
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

export default ShippingControl;
