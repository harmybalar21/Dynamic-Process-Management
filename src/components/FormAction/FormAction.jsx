import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, FormControl, InputLabel, MenuItem, Select, IconButton, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid} from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Label } from '@mui/icons-material';



const FormAction = () => {
    const [controlType, setControlType] = useState('');
    const [displayOrder, setDisplayOrder] = useState('');
    const [success, setSuccess] = useState('');
    const [failure, setFailure] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState('');
    const [defaultValue, setDefaultValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null); 
    const [data, setData] = useState([
      
        {
            "id": 1,
            "color": "yellow",
            "controlType": "button",
            "text": "save",
            "displayOrder": "1",
            "success": "success",
            "failure": "no"
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
        }]);
      const controlTypeChange = (event) => {
        setControlType(event.target.value);
      };

      const displayOrderChange = (event) => {
        if (selectedRow === null) {
          setDisplayOrder(event.target.value);
        }
      };

    //   const displayOrderChange = (event) => {
    //    setDisplayOrder(event.target.value);
    //   };
      const colorChange = (event) => {
        setColor(event.target.value)
      }

      const successChange = (event) => {
        setSuccess(event.target.value)
      }

      const failureChange = (event) => {
        setFailure(event.target.value)
      }

      const TextChange = (event) => {
        setText(event.target.value)
      } 


      const columns = [
        { field: 'displayOrder', headerName: 'Display Order', width: 250 },
        { field: 'text', headerName: 'Text', width: 350 },
        { field: 'controlType', headerName: 'Control Type', width: 350 },
        {
          field: 'Action', headerName: 'Action', width: 250,
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

      const handleDelete = (id) => {
        const updatedRows = data.filter(row => row.id !== id);
        setData(updatedRows);
      };

      const Save = () => {
        if (selectedRow) {
          const updatedRows = data.map(row => {
            if (row.id === selectedRow.id) {
              return {
                ...row, controlType, displayOrder, text, color, success ,
                failure,
                defaultValue
              };
            }
            return row;
          });
          setData(updatedRows);
          setSelectedRow(null);
        } else 
        {const isDisplayOrderExists = data.some(row => row.displayOrder === displayOrder);
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
          setData([...data, newRow]);
          console.log(data)
        }
        HandleClear();
      };
      const HandleClear = () => {
        setDisplayOrder('');
        setControlType('');
        setText('');
        setSuccess('');
        setFailure('');
        setColor('');
        setDefaultValue('');
        setSelectedRow(null);
      };
      const handleEdit = (row) => {
        setSelectedRow(row);
        setControlType(row.controlType);
        setDisplayOrder(row.displayOrder);
        setText(row.text);
        setSuccess(row.success);
        setFailure(row.failure);
        setColor(row.color);
        setDefaultValue(row.defaultValue);
       
      };

    return(
        <div style={{  width: '100%' }}>
      <Accordion>
        <AccordionSummary style={{fontWeight: 700, margin:"5px"}} expandIcon={<ExpandMoreIcon />}>
          Form Actions
        </AccordionSummary>
        <AccordionDetails>
          <div>
           
            <TextField id="displayOrder2" required label="Display Order" variant="outlined" value={displayOrder} onChange={displayOrderChange} disabled={selectedRow !== null} style={{marginRight:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }}>Display Order</TextField>
        
  
            <TextField id="text" required label="Text" variant="outlined" onChange={TextChange} value={text} style={{marginBottom:"25px", marginRight:"25px"}}InputLabelProps={{ style: { fontSize: "15px" } }} >Text</TextField>
            
            <TextField id="color" label="Color" variant="outlined" onChange={colorChange} value={color} style={{marginBottom:"25px", marginRight:"25px"}} InputLabelProps={{ style: { fontSize: "15px" } }}>Color</TextField>

            <FormControl id="controlType2"  required>
              <InputLabel id="controlType"style={{ fontSize: "15px"}}>Control Type</InputLabel>
              <Select
                labelId="controlType"
                id="control-select"
                value={controlType}
                onChange={controlTypeChange} style={{marginBottom:"5px",height:"45px"}}
              >
                <MenuItem value="submit">submit</MenuItem>
                <MenuItem value="button">button</MenuItem></Select>
            </FormControl>
            
            <br />

            <TextareaAutosize autoFocus value={success}  margin="dense" id="success" name="success" placeholder="Success Message" style={{ width: '300px', marginRight:'25px'}} onChange={successChange}  minRows={4}/> 

           <TextareaAutosize autoFocus value={failure} onChange={failureChange} margin="dense" id="failure" name="failure" placeholder="Failure Message" style={{ width: '300px'}}minRows={4} /> 
            <br />
       
          
            <Button variant="contained" onClick={Save} style={{marginRight: "10px",backgroundColor: "rgb(122 161 187) "}} >Save</Button>
           
            <Button variant="contained" onClick={HandleClear} style={{backgroundColor: "rgb(122 161 187)"}}>Add</Button>
            
          </div>
        </AccordionDetails>
        <DataGrid rows={data} columns={columns} />
      </Accordion>
     </div>
    )
}
export default FormAction;