import React, { useEffect, useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormAction from '../FormAction/FormAction';
import FormField from '../FormField/FormField';

const EditDialog = ({ open, user, onSave, onClose }) => {
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
    // setMenuBarVisible(true);
    // Close the dialog
    onClose();
  };

  const navigate = useNavigate();

  const handleClose = () => {
     onClose();
    // navigate('/FormMaster')
  }

  return (
    <>
    <Dialog open={open} >
      <DialogTitle style={{fontWeight: 900}}>Edit User Details</DialogTitle>
      <DialogContent>
        <TextField
          label="name"
          name="name"
          value={editedUser.name || ''}
          onChange={handleInputChange}
          style={{ marginRight: '5px', width: '260px' }}
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          value={editedUser.description || ''}
          onChange={handleInputChange}
          style={{ marginRight: '5px', width: '260px' }}
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
        <FormField/>
        <FormAction/>
    </Dialog>
</>
  );
};

export default EditDialog;
