import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import DG from './DG';
import FormDialog from './FormDialog';
import { useLocation } from 'react-router-dom';
import {  IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from './EditDialog';

const Dashboard = () => {
  const location = useLocation();
  const { formJson } = location.state || {};

 
 
const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'HARMY',
      lastName: 'BALAR',
      userName: 'Harmy',
      email: 'GSXVSV@gmail.com',
      phoneNumber: '9859664115',
      active: false,
    }
    ]);
    const [isInitialMount, setIsInitialMount] = useState(true);

    const [editableUser, setEditableUser] = useState(null);



    useEffect(() => {
      // Check if it's not the initial mount
      if (!isInitialMount && formJson && Object.keys(formJson).length > 0) {
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            id: prevUsers.length + 1,
            firstName: formJson.firstName || '',
            lastName: formJson.lastName || '',
            userName: formJson.userName || '',
            email: formJson.email || '',
            phoneNumber: formJson.phoneNumber || '',
            active: 'true',
          },
        ]);
      }
      setIsInitialMount(false);
    }, [formJson, isInitialMount]);

  const handleDelete = (id) => {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };
  const handleEdit = (user) => {
    setEditableUser(user);
  };

  const handleCloseEditDialog = () => {
    setEditableUser(null);
  };
  const handleSaveEdit = (editedUser) => {
    // Find the index of the user to be edited
    const userIndex = users.findIndex((user) => user.id === editedUser.id);

    if (userIndex !== -1) {
      // Update the user in the users state
      const updatedUsers = [...users];
      updatedUsers[userIndex] = editedUser;
      setUsers(updatedUsers);
    }

    // Reset editableUser state
    setEditableUser(null);
  };

  const fields = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'firstName', headerName: 'FirstName', width: 180 },
    { field: 'lastName', headerName: 'LastName', width: 180 },
    { field: 'userName', headerName: 'UserName', width: 180},
    { field: 'email', headerName: 'Email', width: 240  },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180},
    { field: 'active', headerName: 'Active', width: 150 },
    { field: 'Action', headerName: 'Action', width: 150,
    renderCell: (params) => (
      <>
        <IconButton><EditIcon onClick={() => handleEdit(params.row)}/></IconButton>
        <IconButton onClick={() => handleDelete(params.row.id)}><DeleteOutlineIcon /></IconButton>
      </>
    )
  }
  ];

 

  return (
    <div>
    <div style={{ height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography style={{ fontSize: '25px', fontWeight: '600' }}>USER MANAGEMENT </Typography>
      <FormDialog >Add User</FormDialog>
    </div>

      
      <DG users={users} fields={fields} />
      <EditDialog
          open={Boolean(editableUser)}
          user={editableUser}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
        />
    </div>
  );
};

export default Dashboard;  