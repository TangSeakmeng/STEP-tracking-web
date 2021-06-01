import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { ITrackingProgress } from '../../models/TrackingProgress.model';
import { dialogCustomStyleConfig } from '../../config/dialogCustomStyleConfig';
import AddTrackingProgress from '../../components/dialogs/AddTrackingProgress';
import { getTrackingProgresses, deleteTrackingProgress, searchTrackingProgresses } from '../../services/tracking_progress.service';

function TrackingProgressPage(props: any) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [trackingProgresses, setTrackingProgresses] = useState([] as ITrackingProgress[]);
  const [selectedTrackingProgress, setSelectedTrackingProgress] = useState(Object);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const result = await getTrackingProgresses();
      setTrackingProgresses(result);
      setLoading(false);
    }
    
    fetchDataAsync()
   }, []);
  
  const openModal = () => {
    setSelectedTrackingProgress(null);
    setIsOpen(true);
  }

  const openModal2 = (trackingProgressData: ITrackingProgress) => {
    setSelectedTrackingProgress(trackingProgressData);
    setIsOpen(true);
  }

  const afterOpenModal = () => { }

  const closeModal = () => {
    setIsOpen(false);
  }

  const addTrackingProgress = (trackingProgressData: ITrackingProgress) => {
    trackingProgresses.push(trackingProgressData);
    setTrackingProgresses(trackingProgresses);
  }

  const updateTrackingProgress = (trackingProgressData: ITrackingProgress) => {
    const index = trackingProgresses.findIndex((item) => item.id === trackingProgressData.id);
    if (index >= 0) {
      trackingProgresses[index] = trackingProgressData
      setTrackingProgresses(trackingProgresses);
    }
  }

  const deleteTrackingProgressClicked = async (trackingProgressData: ITrackingProgress) => {
    await deleteTrackingProgress(trackingProgressData);
    const index = trackingProgresses.findIndex((item) => item.id === trackingProgressData.id);
    if (index >= 0) {
      trackingProgresses.splice(index, 1);
      setTrackingProgresses(trackingProgresses);
      forceUpdate(1);
    }
  }

  const keywordChanged = async (e: any) => {
    const temp = e.target.value;
    setKeyword(temp);

    if (temp === '/')
      return;

    if (temp === '' || !temp) {
      const result = await getTrackingProgresses();
      setTrackingProgresses(result);
    } else {
      const result = await searchTrackingProgresses(e.target.value);
      setTrackingProgresses(result);
    }
  }

  return (
    <>
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1>Tracking Progress</h1>

          <div className="actionGroup">
            <input className="input" placeholder="enter keyword" style={{marginRight: '10px'}} onChange={(e) => keywordChanged(e)} value={keyword} />
            <button className="btn btnColor5" style={{marginRight: '10px'}}>Search</button>
            <button className="btn btnColor1" style={{marginRight: '0px'}} onClick={openModal}>Add New Tracking Progress</button>
          </div>
        </div>
      
        <div className="tableContainer">
          <table>
            <thead>
              <tr className="tableHeader">
                <th>ID</th>
                <th>Name</th>
                <th style={{ width: '450px' }}>Description</th>
                <th>Order Progress</th>
                <th>Created By</th>
                <th>Updated By</th>
                <th>Updated Date</th>
                <th>Edit / View / Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                trackingProgresses.length === 0 ?
                  <tr>
                    <td colSpan={8} style={{textAlign: 'center'}}>No Rows.</td>
                  </tr>
                  :
                  trackingProgresses.map((item: ITrackingProgress, index) => {
                    return <tr key={index}>
                      <td>{ index + 1 }</td>
                      <td style={{ lineHeight: '25px'}}>{ item.name }</td>
                      <td style={{ fontSize: '12px', lineHeight: '25px'}}>{ item.description }</td>
                      <td>{ item.orderProgress }</td>
                      <td>{ item.createdBy?.username }</td>
                      <td>{item.updatedBy?.username}</td>
                      <td>{ item.updatedAt }</td>
                      <td>
                        <button className="btn btnColor1" onClick={() => openModal2(item)}>Edit</button>
                        <button className="btn btnColor2">View</button>
                        <button className="btn btnColor3" style={{marginRight: '0px'}} onClick={() => deleteTrackingProgressClicked(item)}>Delete</button>
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
        <AddTrackingProgress closeModal={closeModal}  onAddTrackingProgress={addTrackingProgress} onUpdateTrackingProgress={updateTrackingProgress} trackingProgressData={selectedTrackingProgress} />
      </Modal>
    </>
  );
}

export default TrackingProgressPage;