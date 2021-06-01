import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import AddShippingService from '../../components/dialogs/AddShippingService';
import { dialogCustomStyleConfig } from '../../config/dialogCustomStyleConfig';
import { getShippingService } from '../../services/shipping_service.service';
import { IShippingService } from '../../models/ShippingService.model';
import { deleteShippingService, searchShippingServices } from '../../services/shipping_service.service';

function ShippingServicePage(props: any) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [shippingServices, setShippingServices] = useState([] as IShippingService[]);
  const [selectedShippingService, setSelectedShippingService] = useState(Object);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const result = await getShippingService();
      setShippingServices(result);
      setLoading(false);
    }
    
    fetchDataAsync()
   }, []);
  
  const openModal = () => {
    setSelectedShippingService(null);
    setIsOpen(true);
  }

  const openModal2 = (shippingServiceData: IShippingService) => {
    setSelectedShippingService(shippingServiceData);
    setIsOpen(true);
  }

  const afterOpenModal = () => { }

  const closeModal = () => {
    setIsOpen(false);
  }

  const addShippingService = (shippingServiceData: IShippingService) => {
    shippingServices.push(shippingServiceData);
    setShippingServices(shippingServices);
  }

  const updateShippingService = (shippingServiceData: IShippingService) => {
    const index = shippingServices.findIndex((item) => item.id === shippingServiceData.id);
    if (index >= 0) {
      shippingServices[index] = shippingServiceData
      setShippingServices(shippingServices);
    }
  }

  const deleteShippingServiceClicked = async (shippingServiceData: IShippingService) => {
    await deleteShippingService(shippingServiceData);
    const index = shippingServices.findIndex((item) => item.id === shippingServiceData.id);
    if (index >= 0) {
      shippingServices.splice(index, 1);
      setShippingServices(shippingServices);
      forceUpdate(1);
    }
  }

  const keywordChanged = async (e: any) => {
    const temp = e.target.value;
    setKeyword(temp);

    if (temp === '/')
      return;

    if (temp === '' || !temp) {
      const result = await getShippingService();
      setShippingServices(result);
    } else {
      const result = await searchShippingServices(e.target.value);
      setShippingServices(result);
    }
  }

  return (
    <>
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1>Shipping Service</h1>

          <div className="actionGroup">
            <input className="input" placeholder="enter keyword" style={{marginRight: '10px'}} onChange={(e) => keywordChanged(e)} value={keyword} />
            <button className="btn btnColor5" style={{marginRight: '10px'}}>Search</button>
            <button className="btn btnColor1" style={{marginRight: '0px'}} onClick={openModal}>Add New Shipping Service</button>
          </div>
        </div>
      
        <div className="tableContainer">
          <table>
            <thead>
              <tr className="tableHeader">
                <th>ID</th>
                <th>Name</th>
                <th style={{ width: '450px' }}>Description</th>
                <th>Price / kg</th>
                {/* <th>Created Date</th> */}
                <th>Created By</th>
                <th>Updated Date</th>
                <th>Updated By</th>
                <th>Edit / View / Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                shippingServices.map((item: IShippingService, index) => {
                  return <tr key={index}>
                    <td>{ index + 1 }</td>
                    <td style={{ lineHeight: '25px'}}>{ item.name }</td>
                    <td style={{ fontSize: '12px', lineHeight: '25px'}}>{ item.description }</td>
                    <td>{ item.price }$</td>
                    {/* <td>{ item.createdAt }</td> */}
                    <td>{ item.createdBy?.username }</td>
                    <td>{ item.updatedAt }</td>
                    <td>{ item.updatedBy?.username }</td>
                    <td>
                      <button className="btn btnColor1" onClick={() => openModal2(item)}>Edit</button>
                      <button className="btn btnColor2">View</button>
                      <button className="btn btnColor3" style={{marginRight: '0px'}} onClick={() => deleteShippingServiceClicked(item)}>Delete</button>
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
        <AddShippingService closeModal={closeModal}  onAddShippingService={addShippingService} onUpdateShippingService={updateShippingService} shippingServiceData={selectedShippingService} />
      </Modal>
    </>
  );
}

export default ShippingServicePage;