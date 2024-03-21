// EditDialog.js
import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormAction from '../FormAction/FormAction';
import FormField from '../FormField/FormField';
import CancelIcon from '@mui/icons-material/Cancel';

const EditDialog = ({ open, user, onSave, onClose, mode, isAccordionsVisible }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [field, setField] = useState('')
  const [action, setAction] = useState('')
  const [showFormDetails, setShowFormDetails] = useState(false);
  const [accordionsVisible, setAccordionsVisible] = useState(false); 
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const dialogTitle = mode === 'add' ? 'Add New Form' : 'Edit Form';

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedUser.name.trim() || (!editedUser.description.trim())) {
      setNameError('Name is required');
      setDescriptionError('Description is required');
      return;
    }
    const updatedUser ={...editedUser, 
      formfields: field,
      formactions: action
    }
    onSave(updatedUser);
    // onClose();
    if (mode === 'add') {
      setAccordionsVisible(true);
    }
    
    
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
