import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import styled from "styled-components";

import { dialogCustomStyleConfig } from '../../config/dialogCustomStyleConfig';
import { IShippingDetail } from '../../models/ShippingDetail.model';
import { deleteShippingDetail, getShippingDetails } from '../../services/shipping_detail.service';
import AddShippingDetailDialog from '../../components/dialogs/AddShippingDetailDialog';

function ShippingDetailPage(props: any) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);

  const [keyword, setKeyword] = React.useState('');
  const [shippingId, setShippingId] = React.useState('');
  const [shippingDetails, setShippingDetails] = useState([] as IShippingDetail[]);
  const [selectedShippingDetail, setSelectedShippingDetail] = useState(Object);
  const [totalPagination, setTotalPagination] = useState(0);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      let search = window.location.search;
      let params = new URLSearchParams(search);
      let param_pageNumber = params.get('pageNumber');
      let param_shippingId = params.get('shippingId');

      const result = await getShippingDetails(param_pageNumber, param_shippingId);
      // setTotalPagination(result.totalPages);
      setShippingId(param_shippingId || '');
      setShippingDetails(result);

      setLoading(false);
    }
    
    fetchDataAsync()
  }, []);
  
  // const getPaginationData = async (pageNumber: number) => {
  //   setLoading(true);

  //   const result = await getShippingControls(pageNumber);
  //   setTotalPagination(result.totalPages);
  //   setShippingControls(result.content);

  //   setLoading(false);
  // };
  
  const openModal = () => {
    setSelectedShippingDetail(null);
    setIsOpen(true);
  }

  const openModal2 = (shippmentPackageData: IShippingDetail) => {
    setSelectedShippingDetail(shippmentPackageData);
    setIsOpen(true);
  }

  const afterOpenModal = () => { }

  const closeModal = () => {
    setIsOpen(false);
  }

  const addShippmentControl = (shippingDetailData: IShippingDetail) => {
    console.log(shippingDetailData)
    shippingDetails.push(shippingDetailData);
    setShippingDetails(shippingDetails);
  }

  const updateShippmentControl = (shippingDetailData: IShippingDetail) => {
    const index = shippingDetails.findIndex((item: IShippingDetail) => item.shipping.id === shippingDetailData.shipping.id
      && item.shippmentPackage.id === shippingDetailData.shippmentPackage.id);
    if (index >= 0) {
      shippingDetails[index] = shippingDetailData
      setShippingDetails(shippingDetails);
    }
  }

  const deleteShippmentControlClicked = async (shippingDetailData: IShippingDetail) => {
    await deleteShippingDetail(shippingDetailData);
    const index = shippingDetails.findIndex((item: IShippingDetail) => item.shipping.id === shippingDetailData.shipping.id
      && item.shippmentPackage.id === shippingDetailData.shippmentPackage.id);
    if (index >= 0) {
      shippingDetails.splice(index, 1);
      setShippingDetails(shippingDetails);
      forceUpdate(1);
    }
  }

  const keywordChanged = async (e: any) => {
    const temp = e.target.value;
    setKeyword(temp);

    if (temp === '/')
      return;

    if (temp === '' || !temp) {
      const result = await getShippingDetails(0, shippingId);
      setSelectedShippingDetail(result);
    } else {
      // const result = await searchShippmentPackages(e.target.value);
      // setShippingControls(result);
    }
  }

  const convertStrDateTimeToDateTime = (value: any) => {
    const result = moment(value).format('DD-MMM-YYYY hh:mm:ss A');
    return result;
  }

  return (
    <>
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1>Shipping Detail (Shipping ID: {shippingId})</h1>

          <div className="actionGroup">
            <input className="input" placeholder="enter keyword" style={{marginRight: '10px'}} />
            <button className="btn btnColor5" style={{marginRight: '10px'}}>Search</button>
            <button className="btn btnColor1" style={{marginRight: '0px'}} onClick={openModal}>Add New Shipping Detail</button>
          </div>
        </div>
      
        <div className="tableContainer">
          <table>
            <thead>
              <tr className="tableHeader">
                <th>Shipping ID</th>
                <th>Package ID</th>
                <th>Origin Tracking Num.</th>
                <th>Package Code</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Edit / View / Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                shippingDetails?.length === 0 ?
                  <tr>
                    <td colSpan={11} style={{textAlign: 'center'}}>No Rows.</td>
                  </tr>
                  :
                  shippingDetails.map((item: IShippingDetail, index) => {
                    return <tr key={index}>
                      <td>{item?.shipping?.id}</td>
                      <td>{item?.shippmentPackage?.id}</td>
                      <td>{item?.shippmentPackage?.originTrackingNumber}</td>
                      <td>{item?.shippmentPackage?.packageCode}</td>
                      <td>{item?.createdBy?.username}</td>
                      <td>{convertStrDateTimeToDateTime(item.createdAt)}</td>
                      <td>
                        <button className="btn btnColor1" onClick={() => openModal2(item)}>Edit</button>
                        <button className="btn btnColor2">View</button>
                        <button className="btn btnColor3" style={{marginRight: '0px'}} onClick={() => deleteShippmentControlClicked(item)}>Delete</button>
                      </td>
                    </tr>
                  })
              } 

            </tbody>
          </table>
        </div>

        {/* <div className="paginationContainer">
          {
            [...Array(totalPagination)].map((x, i) => {
              const url = `/package?pageNumber=${i}`;
              return <Link className="paginationElement" to={url} key={i} onClick={() => getPaginationData(i)} >{i + 1}</Link>
            })
          }
        </div> */}
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
        <AddShippingDetailDialog closeModal={closeModal} onAddShippingDetail={addShippmentControl}
          onUpdateShippingDetail={updateShippmentControl} shippingDetailData={selectedShippingDetail} shippingMasterData={shippingId} />
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

export default ShippingDetailPage;
