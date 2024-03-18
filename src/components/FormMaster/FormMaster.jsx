import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import HeaderBar from '../Header/Header';
import FDialog from './FormDialog';
import EditDialog from '../FormMaster/EditDialog';
import { useLocation } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';


const FormMaster = () => {
  const location = useLocation();
  const { formJson } = location.state || {};
 
  const [users, setUsers] = useState([
    { id: 1, name: 'Form 1', description: 'hasdbxchsd' },
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
          name: formJson.name || '',
          description: formJson.description || '',
        },
      ]);
    }
    setIsInitialMount(false);
  }, [formJson, isInitialMount]);
  
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
 
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 900,
      
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon  />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton>
            <VisibilityIcon/>
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleEdit = (row) => {
    setEditableUser(row);
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
  return (
    <>
    <div style={{margin: '0'}}>
    <HeaderBar ></HeaderBar>
    <div style={{ height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography style={{ fontSize: '20px', fontWeight: '500' }} >FORM MASTER </Typography>
      <FDialog>Add Form</FDialog>
    </div>
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={9}
        disableRowSelectionOnClick
      />
      <EditDialog
          open={Boolean(editableUser)}
          user={editableUser}
          onSave={handleSaveEdit}
          onClose={handleCloseEditDialog}
        />
    </Box>
    </div>

    </>
  );
};

export default FormMaster;

