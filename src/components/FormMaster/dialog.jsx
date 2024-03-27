import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CancelIcon from '@mui/icons-material/Cancel';
 
 
const EditDialog = ({ open, user, onSave, onClose, mode, isAccordionsVisible }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const dialogTitle = mode === 'add' ? 'Add New Form' : 'Edit Form';
  const [controlType, setControlType] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [required, setRequired] = useState('');
  const [disabled, setDisabled] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [controlType2, setControlType2] = useState('');
  const [displayOrder2, setDisplayOrder2] = useState('');
  const [success, setSuccess] = useState('');
  const [failure, setFailure] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [data, setData] = useState([]);
  const [field, setField] = useState('')
  const [action, setAction] = useState('')
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (user && Array.isArray(user.formfields)) {
      setEditedUser({ ...user });
      setField([...user.formfields]);
    }
    if (user && Array.isArray(user.formactions)) {
      setAction([...user.formactions]);
    }
  }, [user]);
 
  const handleSave = () => {
    if (!editedUser || !editedUser.name || !editedUser.description ||
      !editedUser.name.trim() || !editedUser.description.trim()) {
    setNameError('Name is required');
    setDescriptionError('Description is required');
    return;
  }
    const updatedUser = {
      ...editedUser,
      formfields: field,
      formactions: action,
     
    }
    onSave(updatedUser);
    onClose();
  };
  //fields
 
  const controlTypeChange = (event) => {
    setControlType(event.target.value);
  };
 
  const displayOrderChange = (event) => {
    setDisplayOrder(event.target.value);
  };
 
  const isRequiredChange = (event) => {
    setRequired(event.target.value);
  };
 
  const isDisabledChange = (event) => {
    setDisabled(event.target.value);
  };
 
  const fieldNameChange = (event) => {
    setFieldName(event.target.value);
  };
 
  const maxLengthChange = (event) => {
    setMaxLength(event.target.value);
  };
 
  const defaultValueChange = (event) => {
    setDefaultValue(event.target.value);
  };

  const columnsField = [
    { field: 'displayOrder', headerName: 'Display Order', width: 250, },
    { field: 'fieldName', headerName: 'Field Name', width: 350 },
    { field: 'controlType', headerName: 'Control Type', width: 350 },
    {
      field: 'Action', headerName: 'Action', width: 200,
      renderCell: (params) => (
          <>
              <IconButton onClick={() => handleEditField(params.row)}>
                  <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteOutlineIcon />
              </IconButton>
          </>
      )
    }
  ];

  const handleSaveField = () => {
    if (selectedRow) {
      const updatedRows = field.map(row => {
        if (row.id === selectedRow.id) {
          return {
            ...row,
            controlType,
            displayOrder,
            required,
            disabled,
            fieldName,
            maxLength,
            defaultValue
          };
        }
        return row;
      });
      setField(updatedRows);
      setSelectedRow(null);
    } else {
      const displayOrderExists3 = field.some(row => row.displayOrder === displayOrder);
      if (displayOrderExists3) {
        alert("Display Order must be unique.");
        return;
      }
      const newRow = {
        id: Math.random(),
        controlType,
        displayOrder,
        required,
        disabled,
        fieldName,
        maxLength,
        defaultValue
      };
      setField([...field, newRow]);
     
    }
    clearFields();
  };

  const clearFields = () => {
    setDisplayOrder('');
    setControlType('');
    setRequired('');
    setDisabled('');
    setFieldName('');
    setMaxLength('');
    setDefaultValue('');
    setSelectedRow(null);
  };

  const handleEditField = (row) => {
   
    setSelectedRow(row);
    setControlType(row.controlType);
    setDisplayOrder(row.displayOrder);
    setRequired(row.isRequired);
    setDisabled(row.isDisabled);
    setFieldName(row.fieldName);
    setMaxLength(row.maxLength);
    setDefaultValue(row.defaultValue);
  };

  //actions
  
  const controlTypeChange2 = (event) => {
    setControlType2(event.target.value);
  };

  const displayOrderChange2 = (event) => {
    if (selectedRow === null) {
      setDisplayOrder2(event.target.value);
    }
  };
 
  const colorChange = (event) => {
    setColor(event.target.value)
  };;

  const successChange = (event) => {
    setSuccess(event.target.value)
  };

  const failureChange = (event) => {
    setFailure(event.target.value)
  };

  const TextChange = (event) => {
    setText(event.target.value)
  } ;

  const columnsAction = [
    { field: 'displayOrder', headerName: 'Display Order', width: 250 },
    { field: 'text', headerName: 'Text', width: 350 },
    { field: 'controlType', headerName: 'Control Type', width: 350 },
    {
      field: 'Action', headerName: 'Action', width: 250,
      renderCell: (params) => (
          <>
              <IconButton onClick={() => handleEditAction(params.row)}>
                  <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteOutlineIcon />
              </IconButton>
          </>
      )
    }
  ];
  
  const handleSaveAction = () => {
    if (selectedRow) {
      const updatedRows = action.map(row => {
        if (row.id === selectedRow.id) {
          return {
            ...row, 
            controlType, 
            displayOrder, 
            text, 
            color, 
            success ,
            failure,
            defaultValue
          };
        }
        return row;
      });
      setAction(updatedRows);
      onActionChange(updatedRows);
      setSelectedRow(null);
    } else 
    {const isDisplayOrderExists = action.some(row => row.displayOrder === displayOrder);
        if (isDisplayOrderExists) {
          alert('Please enter unique display order. The number you added is already in use.');
          return;
        }
      const newRow = {
        id: Math.random(),
        controlType,
        displayOrder,
        text,
        success,
        failure,
        color,
        defaultValue
      };
      setAction([...action, newRow]);
      onActionChange([...action, newRow]);
      console.log(action)
    }
    HandleClear();
  };
 
  const handleDelete = (id) => {
    const updatedRows = data.filter(row => row.id !== id);
    setData(updatedRows);
    setSelectedRow(null);
  };
 
  const clearActions = () => {
    setDisplayOrder2('');
    setControlType2('');
    setText('');
    setSuccess('');
    setFailure('');
    setColor('');
    setDefaultValue('');
    setSelectedRow(null);
  };

  const handleEditAction = (row) => {
    setSelectedRow(row);
    setControlType2(row.controlType);
    setDisplayOrder2(row.displayOrder);
    setText(row.text);
    setSuccess(row.success);
    setFailure(row.failure);
    setColor(row.color);
    setDefaultValue(row.defaultValue);
   
  };

  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize: '22px' }}>
        {dialogTitle}
        <CancelIcon onClick={onClose} />
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
      <div>
      {(isAccordionsVisible ) && (
        <div>
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
              <Button variant="contained" onClick={handleSaveField} style={{ textTransform: 'capitalize',fontSize:'16px', fontWeight: 400  }}>Save</Button>
              <Button type="submit"   variant="contained" onClick={clearFields} style={{ textTransform: 'capitalize',fontSize:'16px',  fontWeight: 400, }}>Add</Button>
            </DialogActions>
          </div>
        </AccordionDetails>
        <DataGrid rows={field} columns={columnsField} />

      </Accordion>
      {/* actionaccordian */}
      <Accordion>
      <AccordionSummary style={{fontWeight: 700, margin:"5px"}} expandIcon={<ExpandMoreIcon />}>
        Form Actions
      </AccordionSummary>
      <AccordionDetails>
        <div>
         
          <TextField id="displayOrder2" required label="Display Order" variant="outlined" value={displayOrder2} onChange={displayOrderChange2} disabled={selectedRow !== null} style={{marginRight:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }}>Display Order</TextField>
      

          <TextField id="text" required label="Text" variant="outlined" onChange={TextChange} value={text} style={{marginBottom:"25px", marginRight:"25px"}}InputLabelProps={{ style: { fontSize: "15px" } }} >Text</TextField>
          
          <TextField id="color" label="Color" variant="outlined" onChange={colorChange} value={color} style={{marginBottom:"25px", marginRight:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }}>Color</TextField>

          <FormControl id="controlType2"  required>
            <InputLabel id="controlType"style={{ fontSize: "15px"}}>Control Type</InputLabel>
            <Select
              labelId="controlType"
              id="controlType2"
              value={controlType2}
              onChange={controlTypeChange2} style={{marginBottom:"5px",height:"45px"}}
            >
              <MenuItem value="submit">submit</MenuItem>
              <MenuItem value="button">button</MenuItem></Select>
          </FormControl>
          
          <br />

          <TextareaAutosize autoFocus value={success}  margin="dense" id="success" name="success" placeholder="Success Message" style={{ width: '300px', marginRight:'25px'}} onChange={successChange}  minRows={4}/> 

         <TextareaAutosize autoFocus value={failure} onChange={failureChange} margin="dense" id="failure" name="failure" placeholder="Failure Message" style={{ width: '300px'}}minRows={4} /> 

      <DialogActions>
      <Button variant="contained" onClick={handleSaveAction} style={{ textTransform: 'capitalize',fontSize:'16px', fontWeight: 400  }}>Save</Button>
      <Button type="submit"   variant="contained" onClick={clearActions} style={{ textTransform: 'capitalize',fontSize:'16px',  fontWeight: 400, }}>Add</Button>
      </DialogActions>
       </div>
      </AccordionDetails>
      <DataGrid rows={action} columns={columnsAction} />
    </Accordion>
    </div>
        )}
      </div>
 
    </Dialog>
  );
};
 
export default EditDialog;
 