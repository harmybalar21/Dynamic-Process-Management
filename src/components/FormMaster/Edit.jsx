// EditDialog.js
import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormAction from '../FormAction/FormAction';
import FormField from '../FormField/FormField';
import CancelIcon from '@mui/icons-material/Cancel';

const EditDialog = ({ open, user, onSave, onClose, mode, isAccordionsVisible ,users, setUsers }) => {
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
    if (!editedUser || !editedUser.name || !editedUser.description ||
      !editedUser.name.trim() || !editedUser.description.trim()) {
    setNameError('Name is required');
    setDescriptionError('Description is required');

    return;
  }
  
    const updatedUser = {
      ...editedUser,
      // formfields: field,
      // formactions: action
    };
  
    onSave(updatedUser);
  
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
    <>
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

    </Dialog>
        <div style={{  width: '100%' }}>
        <Accordion>
          <AccordionSummary style={{fontWeight: 700, margin:"5px"}} expandIcon={<ExpandMoreIcon />}>
            Form Fields
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <TextField id="displayOrder" type='number' required label="Display Order" variant="outlined" value={displayOrder} onChange={displayOrderChange} disabled={selectedRow !== null} style={{ marginRight:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }}>Display Order</TextField>
  
              <FormControl id="controlType" required>
                <InputLabel id="controlType" style={{fontSize:"15px"}}>Control Type</InputLabel>
                <Select
                  labelId="controlType"
                  id="control-select"
                  value={controlType}
                  onChange={controlTypeChange} style={{height:"40px", width:"250px",marginRight:"25px"}}
                >
                  <MenuItem value="picklist">picklist</MenuItem>
                  <MenuItem value="multiple picklist">multiple picklist</MenuItem>
                  <MenuItem value="checkbox">checkbox</MenuItem>
                  <MenuItem value="multiple checkbox">multiple checkbox</MenuItem>
                  <MenuItem value="textfield">textfield</MenuItem>
                  <MenuItem value="datepicker">datepicker</MenuItem>
                  <MenuItem value="date-timepicker">date-timepicker</MenuItem>
                  <MenuItem value="textarea">textarea</MenuItem>
                </Select>
              </FormControl>
  
              <TextField id="fieldName" required label="Field Name" variant="outlined" onChange={fieldNameChange} value={fieldName}  style={{ marginRight:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }} >Field Name</TextField>
  
              <TextField id="maxLength" label="Max Length" variant="outlined" onChange={maxLengthChange} value={maxLength} style={{marginBottom:"5px" , marginRight:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }}>Max length</TextField>
  
              <TextField id="defaultValue" label="Default Value" variant="outlined" onChange={defaultValueChange} value={defaultValue} style={{ marginBottom:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }}/>
          
              <FormControl >
                <InputLabel id="isRequired" style={{fontSize:"15px"}}>Is Required?</InputLabel>
                <Select
                  labelId="isRequired"
                  id="isRequired-select"
                  value={required}
                  onChange={isRequiredChange}
                  style={{marginBottom:"5px", height:"40px",marginRight:"35px",width:"250px"}}
                  
                >
                  <MenuItem value="yes">yes</MenuItem>
                  <MenuItem value="no">no</MenuItem>
                </Select>
              </FormControl>
             
              <FormControl >
                <InputLabel id="isDisabled" style={{fontSize:"15px"}}>Is Disabled?</InputLabel>
                <Select
                  labelId="isDisabled"
                  id="isDisabled-select"
                  value={disabled}
                  onChange={isDisabledChange}
                  style={{marginBottom:"5px",height:"40px",marginRight:"35px",width:"250px"}}
                >
                  <MenuItem value="yes">yes</MenuItem>
                  <MenuItem value="no">no</MenuItem>
                </Select>
              </FormControl>
             
              <DialogActions>
                <Button variant="contained" onClick={Save} style={{ textTransform: 'capitalize',fontSize:'16px', fontWeight: 400  }}>Save</Button>
                <Button type="submit"   variant="contained" onClick={HandleClear} style={{ textTransform: 'capitalize',fontSize:'16px',  fontWeight: 400, }}>Add</Button>
              </DialogActions>
            </div>
          </AccordionDetails>
          <DataGrid rows={data} columns={columns} />
  
        </Accordion>
      </div>
      </>
  );
};

export default EditDialog;
