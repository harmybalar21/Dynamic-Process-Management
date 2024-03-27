import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import HeaderBar from '../Header/Header';
import EditDialog from '../FormMaster/dialog';
import { useLocation } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormField from '../FormField/FormField';
import DynamicForm from '../FormMaster/DynamicForm'

const FormMaster = () => {
  const location = useLocation();
  const { formJson } = location.state || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editDialogMode, setEditDialogMode] = useState('add');
  const [isAccordionsVisible, setIsAccordionsVisible] = useState(true);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [editableUser, setEditableUser] = useState(null);
  const [isNewFormAdded, setIsNewFormAdded] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
    setIsNewFormAdded(true); 
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Leave Application Form',
      description: 'Requesting time off from work for personal or professional reasons.',
      formfields: [
        {
          "id": 1,
          "controlType": "textfield",
          "fieldName": "name",
          "displayOrder": "1",
          "maxLength": "8",
          "disabled": "no",
          "required": "yes",
          "defaultValue": ""
        },
        {
          "id": 0.6935281981609382,
          "controlType": "textfield",
          "displayOrder": "2",
          "required": "yes",
          "disabled": "no",
          "fieldName": "username",
          "maxLength": "",
          "defaultValue": ""
        },
        {
          "id": 0.04840120202241982,
          "controlType": "textfield",
          "displayOrder": "3",
          "required": "yes",
          "disabled": "no",
          "fieldName": "email",
          "maxLength": "",
          "defaultValue": ""
        }
      ],
      formactions: [
        {
          "id": 1,
          "color": "yellow",
          "controlType": "button",
          "text": "save",
          "displayOrder": "1",
          "success": "success",
          "failure": "no",
          "defaultValue": ""
        },
        {
          "id": 0.4100180468503791,
          "controlType": "button",
          "displayOrder": "2",
          "text": "cancel",
          "success": "",
          "failure": "",
          "color": "",
          "defaultValue": ""
        },
        {
          "id": 0.7595405644721089,
          "controlType": "submit",
          "displayOrder": "3",
          "text": "save",
          "success": "",
          "failure": "",
          "color": "",
          "defaultValue": ""
        }
      ]
    },
  ]);

  const handleSaveUser = (newUser) => {
    console.log("New User:", newUser); 
    console.log("New User ID:", newUser.id);
    console.log("Current Users:", users);

    const userIndex = users.findIndex((user) => Number(user.id) === Number(newUser.id));
  
    console.log("User Index:", userIndex);
  
    if (userIndex !== -1) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...newUser,
        id: newUser.id,
        formfields: newUser.formfields || [],
        formactions: newUser.formactions || []
      };
      setUsers(updatedUsers);
    } else {
      // Add new user
      setUsers(prevUsers => [
        ...prevUsers,
        {
          id: prevUsers.length + 1,
          ...newUser,  
          formfields: newUser.formfields || [],
          formactions: newUser.formactions || []
        }
      ]);
    }
    setIsOpen(false);
};


const handleSaveEdit = (editableUser) => {
  const updatedUsers = users.map(user => {
    if (user.id === editableUser.id) {
      return {
        ...user,
        ...editableUser,
        formfields: editableUser.formfields || [],
        formactions: editableUser.formactions || []
      };
    }
    return user;
  });
  setUsers(updatedUsers);
  setEditableUser(null);
};




useEffect(() => {
  if (isNewFormAdded && formJson && Object.keys(formJson).length > 0) {
    setUsers(prevUsers => [
      ...prevUsers,
      {
        id: prevUsers.length + 1,
        name: formJson.name || '',
        description: formJson.description || '',
        formfields: formJson.formfields || [],
        formactions: formJson.formactions || []
      },
    ]);
    setIsNewFormAdded(false); // Reset the flag after adding the new form
  }
}, [isNewFormAdded, formJson]);

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
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteOutlineIcon />
          </IconButton>
          <DynamicForm >Dynamic Form generated</DynamicForm>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleEdit = (row) => {
    setEditableUser(row);
    setIsAccordionsVisible(true);
  };
  

  const handleCloseEditDialog = () => {
    setEditableUser(null);
  };


  return (
    <>
      <div style={{ margin: '0' }}>
        <HeaderBar />
        <div style={{ height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography style={{ fontSize: '20px', fontWeight: '500' }} >FORM MASTER </Typography>
          <Button variant="contained" onClick={() => openDialog('add')}>Add form <AddIcon/></Button>
          {isOpen && (
        <EditDialog
          open={isOpen}
          user={editableUser}
          onClose={() => setIsOpen(false)}
          mode="add"
          onSave={handleSaveUser}
          users={users} setUsers={setUsers} 
        />)}
        </div>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid rows={users} columns={columns} pageSize={9} disableRowSelectionOnClick/>
          {editableUser && (
          <EditDialog 
          open={Boolean(editableUser)}
            user={editableUser}
            onSave={handleSaveEdit}
            onClose={handleCloseEditDialog}
            mode="edit"
           isAccordionsVisible={isAccordionsVisible} 
          />
          )}
         {/* <FormField  users={users} setUsers={setUsers} /> */}
        </Box>
      </div>
    </>
  );
};

export default FormMaster;
