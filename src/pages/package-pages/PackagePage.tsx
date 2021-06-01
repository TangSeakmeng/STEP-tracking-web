import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import queryString from 'query-string';
import styled from "styled-components";

import AddPackageDialog from '../../components/dialogs/AddShippmentPackageDialog';
import { IShippmentPackage } from '@/models/ShippmentPackage.model';
import { dialogCustomStyleConfig } from '../../config/dialogCustomStyleConfig';
import { deleteShippmentPackage, getShippmentPackages, searchShippmentPackages } from '../../services/shippment_package.service';
import { Link } from 'react-router-dom';

function PackagePage(props: any) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [shippmentPackages, setShippmentPackages] = useState([] as IShippmentPackage[]);
  const [selectedShippmentPackage, setSelectedShippmentPackage] = useState(Object);
  const [totalPagination, setTotalPagination] = useState(0);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);

      let search = window.location.search;
      let params = new URLSearchParams(search);
      let pageNumber = params.get('pageNumber');

      const result = await getShippmentPackages(pageNumber);
      setTotalPagination(result.totalPages);
      setShippmentPackages(result.content);

      setLoading(false);
    }
    
    fetchDataAsync()
  }, []);
  
  const getPaginationData = async (pageNumber: number) => {
    setLoading(true);

    const result = await getShippmentPackages(pageNumber);
    setTotalPagination(result.totalPages);
    setShippmentPackages(result.content);

    setLoading(false);
  };
  
  const openModal = () => {
    setSelectedShippmentPackage(null);
    setIsOpen(true);
  }

  const openModal2 = (shippmentPackageData: IShippmentPackage) => {
    setSelectedShippmentPackage(shippmentPackageData);
    setIsOpen(true);
  }

  const afterOpenModal = () => { }

  const closeModal = () => {
    setIsOpen(false);
  }

  const addShippmentPackage = (shippmentPackageData: IShippmentPackage) => {
    shippmentPackages.push(shippmentPackageData);
    setShippmentPackages(shippmentPackages);
  }

  const updateShippmentPackage = (shippmentPackageData: IShippmentPackage) => {
    const index = shippmentPackages.findIndex((item) => item.id === shippmentPackageData.id);
    if (index >= 0) {
      shippmentPackages[index] = shippmentPackageData
      setShippmentPackages(shippmentPackages);
    }
  }

  const deleteShippmentPackageClicked = async (shippmentPackageData: IShippmentPackage) => {
    await deleteShippmentPackage(shippmentPackageData);
    const index = shippmentPackages.findIndex((item) => item.id === shippmentPackageData.id);
    if (index >= 0) {
      shippmentPackages.splice(index, 1);
      setShippmentPackages(shippmentPackages);
      forceUpdate(1);
    }
  }

  const keywordChanged = async (e: any) => {
    const temp = e.target.value;
    setKeyword(temp);

    if (temp === '/')
      return;

    if (temp === '' || !temp) {
      const result = await getShippmentPackages(0);
      setShippmentPackages(result);
    } else {
      const result = await searchShippmentPackages(e.target.value);
      setShippmentPackages(result);
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
          <h1>Shippment Package</h1>

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
            <button className="btn btnColor1" style={{marginRight: '0px'}} onClick={openModal}>Add New Package</button>
          </div>
        </div>
      
        <div className="tableContainer">
          <table>
            <thead>
              <tr className="tableHeader">
                <th>ID</th>
                <th>Origin Tracking Num.</th>
                <th>Package Code</th>
                <th style={{ width: '250px' }}>Description</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Edit / View / Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                shippmentPackages.length === 0 ?
                  <tr>
                    <td colSpan={11} style={{textAlign: 'center'}}>No Rows.</td>
                  </tr>
                  :
                  shippmentPackages.map((item: IShippmentPackage, index) => {
                    return <tr key={index}>
                      <td>{ item?.id }</td>
                      <td>{ item?.originTrackingNumber }</td>
                      <td>{ item?.packageCode }</td>
                      <td style={{ lineHeight: '25px', fontSize: '12px' }}>{item.description}</td>
                      <td>{ item.weight } kg</td>
                      <td>{ item.price.toFixed(2) }$</td>
                      <td>{ calculateSubtotalAndRoundNumber(item.weight, item.price) }$</td>
                      <td>{ item.status }</td>
                      <td>{ item.createdBy?.username }</td>
                      <td>{ convertStrDateTimeToDateTime(item.createdAt) }</td>
                      <td>
                        <button className="btn btnColor1" onClick={() => openModal2(item)}>Edit</button>
                        <button className="btn btnColor2">View</button>
                        <button className="btn btnColor3" style={{marginRight: '0px'}} onClick={() => deleteShippmentPackageClicked(item)}>Delete</button>
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
        <AddPackageDialog closeModal={closeModal} onAddShippmentPackage={addShippmentPackage}
          onUpdateShippmentPackage={updateShippmentPackage} shippmentPackageData={selectedShippmentPackage} />
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

export default PackagePage;