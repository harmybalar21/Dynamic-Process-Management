
import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormAction from '../FormAction/FormAction';
import FormField from '../FormField/FormField';
import CancelIcon from '@mui/icons-material/Cancel';

const EditDialog = ({ open, user, onSave, onClose, mode, users, isAccordionsVisible }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [field, setField] = useState('')
  const [action, setAction] = useState('')
  const [showFormDetails, setShowFormDetails] = useState(false);
  const [accordionsVisible, setAccordionsVisible] = useState(false); 
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [initialId, setInitialId] = useState(0);
  const dialogTitle = mode === 'add' ? 'Add New Form' : 'Edit Form';

  // useEffect(() => {
  //   if (user && Array.isArray(user.formfields)) {
  //     setEditedUser({ ...user });
  //     setData([...user.formfields]); // Update form fields from user prop
  //   }
  // }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev,[name]: value }));
  };

  const handleSave = () => {
    if (!editedUser || !editedUser.name || !editedUser.description ||
        !editedUser.name.trim() || !editedUser.description.trim()) {
      setNameError('Name is required');
      setDescriptionError('Description is required');
      return;
    }

    let updatedUser;
     if (mode === 'add') {
      updatedUser = {
        ...editedUser,
        id: users.length + 1, // Generate new ID
        formfields: field,
        formactions: action
      };
      setInitialId(updatedUser.id); // Set initial ID when adding new form
    } else {
      updatedUser = {
        ...editedUser,
        formfields: field,
        formactions: action
      };
    }

    onSave(updatedUser);
    onClose()
    // if (mode === 'add') {
    //   setAccordionsVisible(true);
    // } else {
    //   onClose(); // Close the dialog after saving changes for edit mode
    // }
  };

  
  
  const handleClose = () => {
    onClose();
  };

  const fieldChange = (updateField) => {
    setField(updateField);
  }

  const actionChange = (updateAction) => {
    setAction(updateAction);
  }
  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
     <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize:'22px'}}>
        {dialogTitle} 
        <CancelIcon onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        <TextField
          label="name"
          name="name"
          value={editedUser.name || ''}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          error={!!nameError}
          helperText={nameError}
          
        />
        <TextField
          label="Description"
          name="description"
          value={editedUser.description || ''}
          onChange={handleInputChange}
          style={{ marginTop: '5px' }}
          fullWidth
          margin="dense"
          error={!!descriptionError}
          helperText={descriptionError}
          
        />
      
        
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} style={{ fontWeight: 700 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} style={{ fontWeight: 700 }}>
          Save
        </Button>
      </DialogActions>
      {(isAccordionsVisible || accordionsVisible) && (
          <>
            <FormField formfields={editedUser.formfields} onFieldChange={fieldChange} onSave={onSave} />
            <FormAction formactions={editedUser.formactions} onActionChange={actionChange} />
          </>
        )}
    </Dialog>
  );
};

export default EditDialog;