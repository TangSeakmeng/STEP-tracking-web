import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

import AddUserDialog from '../../components/dialogs/AddUserDialog';
import { IUser } from '../../models/User.model';
import { dialogCustomStyleConfig } from '../../config/dialogCustomStyleConfig';
import { getUsers } from '../../services/user.service';

function UserPage(props: any) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);

  const [keyword, setKeyword] = React.useState('');
  const [users, setUsers] = useState([] as IUser[]);
  const [selectedUser, setSelectedUser] = useState(Object);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const result = await getUsers();
      setUsers(result);
      setLoading(false);
    }
    
    fetchDataAsync()
   }, []);
  
  const openModal = () => {
    setSelectedUser(null);
    setIsOpen(true);
  }

  const openModal2 = (userData: IUser) => {
    setSelectedUser(userData);
    setIsOpen(true);
  }

  const afterOpenModal = () => { }

  const closeModal = () => {
    setIsOpen(false);
  }

  const addUser = (userData: IUser) => {
    users.push(userData);
    setUsers(users);
  }

  const updateUser = (userData: IUser) => {
    const index = users.findIndex((item) => item.id === userData.id);
    if (index >= 0) {
      users[index] = userData
      setUsers(users);
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
          <h1>Users</h1>

          <div className="actionGroup">
            <button className="btn btnColor1" style={{marginRight: '0px'}} onClick={openModal}>Add New User</button>
          </div>
        </div>
      
        <div className="tableContainer">
          <table>
            <thead>
              <tr className="tableHeader">
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Address</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Edit / View / Delete</th>
              </tr>
            </thead>
            <tbody>

              {
                users.length === 0 ?
                  <tr>
                    <td colSpan={8} style={{textAlign: 'center'}}>No Rows.</td>
                  </tr>
                  :
                  users.map((item: IUser, index) => {
                    return <tr key={index}>
                      <td>{item?.id}</td>
                      <td>{item?.firstName}</td>
                      <td>{item?.lastName}</td>
                      <td>{item?.username}</td>
                      <td>{item?.email}</td>
                      <td>{item?.telephone}</td>
                      <td>{item?.address}</td>
                      <td>{item?.createdBy}</td>
                      <td>{convertStrDateTimeToDateTime(item.createdAt)}</td>
                      <td>
                        {/* <button className="btn btnColor1" onClick={() => openModal2(item)}>Edit</button> */}
                        <button className="btn btnColor2">View</button>
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
        <AddUserDialog closeModal={closeModal}  onAddUser={addUser} onUpdateUser={updateUser} userData={selectedUser} />
      </Modal>
    </>
  );
}

export default UserPage;