import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditDialog = ({ open, user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    // Update the editedUser state when the user prop changes
    setEditedUser({ ...user });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Add logic to save the edited user
    // For simplicity, you can log the edited user details
    onSave(editedUser);
    console.log('Edited User:', editedUser);

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Firstname"
          name="firstName"
          value={editedUser.firstName || ''}
          onChange={handleInputChange}
          style={{marginRight: "5px", width:'260px'}}
          margin="dense"
        />
        <TextField
          label="Lastname"
          name="lastName"
          value={editedUser.lastName || ''}
          onChange={handleInputChange}
          style={{marginRight: "5px", width:'260px'}}
          margin="dense"
        />
         <TextField
          label="Username"
          name="userName"
          value={editedUser.userName || ''}
          onChange={handleInputChange}
          style={{marginRight: "5px", width:'260px'}}
          margin="dense"
        />
        <TextField
          label="Phone Number "
          name="phoneNumber"
          value={editedUser.phoneNumber|| ''}
          onChange={handleInputChange}
          style={{marginRight: "5px", width:'260px'}}
          margin="dense"
          
        />
        <TextField
          label="Email Address"
          name="email"
          value={editedUser.email || ''}
          onChange={handleInputChange}
          
          style={{marginRight: "20px", width: '525px'}}
          margin="dense"

        />
    
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
