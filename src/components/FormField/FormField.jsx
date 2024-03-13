import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, FormControl, InputLabel, MenuItem, Select, IconButton, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid} from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function FormField() {
  const [controlType, setControlType] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [required, setRequired] = useState('');
  const [disabled, setDisabled] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); 
  const [data, setData] = useState([
    {
      id: 1,
      controlType: 'checkbox',
      fieldName: 'Form',
      displayOrder: '1',
      
    }]);
    

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
      setSelectedRow(null);
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
    { field: 'displayOrder', headerName: 'Display Order', width: 150 },
    { field: 'fieldName', headerName: 'Field Name', width: 150 },
    { field: 'controlType', headerName: 'Control Type', width: 150 },
    {
      field: 'Action', headerName: 'Action', width: 150,
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
        <AccordionSummary style={{border: '1px solid black',fontWeight: 1000, margin:"5px"}} expandIcon={<ExpandMoreIcon />}>
          Form Fields
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <TextField id="displayOrder" type='number' required label="Display Order" variant="outlined" value={displayOrder} onChange={displayOrderChange} disabled={selectedRow !== null} style={{marginBottom:"5px", marginRight:"5px"}} />
            <TextField id="fieldName" required label="Field Name" variant="outlined" onChange={fieldNameChange} value={fieldName} />
            <TextField id="maxLength" label="Max Length" variant="outlined" onChange={maxLengthChange} value={maxLength} style={{marginBottom:"5px" , marginRight:"5px"}}/>
            <TextField id="defaultValue" label="Default Value" variant="outlined" onChange={defaultValueChange} value={defaultValue} />
            <FormControl fullWidth required>
              <InputLabel id="controlType">Control Type</InputLabel>
              <Select
                labelId="controlType"
                id="control-select"
                value={controlType}
                onChange={controlTypeChange} style={{marginBottom:"5px"}}
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
            <FormControl fullWidth>
              <InputLabel id="isRequired">Is Required?</InputLabel>
              <Select
                labelId="isRequired"
                id="isRequired-select"
                value={required}
                onChange={isRequiredChange}
                style={{marginBottom:"5px"}}
                
              >
                <MenuItem value="yes">yes</MenuItem>
                <MenuItem value="no">no</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="isDisabled">Is Disabled?</InputLabel>
              <Select
                labelId="isDisabled"
                id="isDisabled-select"
                value={disabled}
                onChange={isDisabledChange}
                style={{marginBottom:"5px"}}
              >
                <MenuItem value="yes">yes</MenuItem>
                <MenuItem value="no">no</MenuItem>
              </Select>
            </FormControl>
           
            <Button variant="contained" style={{marginRight: "10px",backgroundColor: "rgb(122 161 187)"}} onClick={Save}>Save</Button>
            <Button variant="contained" style={{backgroundColor: "rgb(122 161 187)"}} onClick={HandleClear}>Add</Button>
            
          </div>
        </AccordionDetails>
        <DataGrid rows={data} columns={columns} />
      </Accordion>
     
     
     
    </div>
  );
}
