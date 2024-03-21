import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, FormControl, InputLabel, MenuItem, Select, IconButton, Button, DialogActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from 'react-router-dom';

export default function FormField({ formfields, onFieldChange, onSave }) {
  const [controlType, setControlType] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [required, setRequired] = useState('');
  const [disabled, setDisabled] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); 
  const [data, setData] = useState(formfields || []);

  useEffect(() => {
    setData(formfields || []);
  }, [formfields]);
  

  const controlTypeChange = (event) => {
    setControlType(event.target.value);
  };
  
  const displayOrderChange = (event) => {
    if (selectedRow === null) {
      setDisplayOrder(event.target.value);
    }
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

  const handleDelete = (id) => {
    const updatedRows = data.filter(row => row.id !== id);
    setData(updatedRows);
    onFieldChange(updatedRows);
  };

  const Save = () => {
    if (selectedRow) {
      const updatedRows = data.map(row => {
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
      setData(updatedRows);
      // onFieldChange(updatedRows);
      onSave(data);
      setSelectedRow(null);
      console.log(updatedRows);
      
    } else {
      const isDisplayOrderExists = data.some(row => row.displayOrder === displayOrder);

      if (isDisplayOrderExists) {
        alert('Please enter unique display order. The number you added is already in use.');
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
      setData([...data, newRow]);
      onFieldChange([...data, newRow]);
      
    }
    HandleClear();
  };

  const HandleClear = () => {
    setDisplayOrder('');
    setControlType('');
    setRequired('');
    setDisabled('');
    setFieldName('');
    setMaxLength('');
    setDefaultValue('');
    setSelectedRow(null);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setControlType(row.controlType);
    setDisplayOrder(row.displayOrder);
    setRequired(row.required);
    setDisabled(row.disabled);
    setFieldName(row.fieldName);
    setMaxLength(row.maxLength);
    setDefaultValue(row.defaultValue);
  };

  const columns = [
    { field: 'displayOrder', headerName: 'Display Order', width: 250, },
    { field: 'fieldName', headerName: 'Field Name', width: 350 },
    { field: 'controlType', headerName: 'Control Type', width: 350 },
    {
      field: 'Action', headerName: 'Action', width: 200,
      renderCell: (params) => (
          <>
              <IconButton onClick={() => handleEdit(params.row)}>
                  <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteOutlineIcon />
              </IconButton>
          </>
      )
    }
  ];

  

  return (
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
  );
}
