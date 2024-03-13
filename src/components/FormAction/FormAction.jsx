import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, FormControl, InputLabel, MenuItem, Select, IconButton, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid} from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';



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
          id: 1,
          color: 'yellow',
          controlType: 'button',
          text: 'save',
          displayOrder: '1',
          success:'success',
          failure:'no'
        },
      ]);
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
        { field: 'displayOrder', headerName: 'Display Order', width: 150 },
        { field: 'text', headerName: 'Text', width: 150 },
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
        <AccordionSummary style={{border: '1px solid black',fontWeight: 1000, margin:"5px"}} expandIcon={<ExpandMoreIcon />}>
          Form Actions
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <TextField id="displayOrder" required label="Display Order" variant="outlined" value={displayOrder} onChange={displayOrderChange} disabled={selectedRow !== null} style={{marginBottom:"5px", marginRight:"5px"}} />

            {/* <TextField id="displayOrder" required label="Display Order" variant="outlined" value={displayOrder} onChange={displayOrderChange}  style={{marginBottom:"5px", marginRight:"5px"}} /> */}

            <TextField id="text" required label="Text" variant="outlined" onChange={TextChange} value={text} />
            
            <FormControl fullWidth required>
              <InputLabel id="controlType">Control Type</InputLabel>
              <Select
                labelId="controlType"
                id="control-select"
                value={controlType}
                onChange={controlTypeChange} style={{marginBottom:"5px"}}
              >
                <MenuItem value="submit">submit</MenuItem>
                <MenuItem value="button">button</MenuItem></Select>
            </FormControl>
            
            <TextField id="color" label="Color" variant="outlined" onChange={colorChange} value={color} style={{marginBottom:"5px" , marginRight:"5px"}}/>

            <TextareaAutosize autoFocus value={success}  margin="dense" id="success" name="success" placeholder="Success Message" style={{ width: '500px'}} onChange={successChange}  minRows={3}/> 

           <TextareaAutosize autoFocus value={failure} onChange={failureChange} margin="dense" id="failure" name="failure" placeholder="Failure Message" style={{ width: '500px'}}minRows={3} /> 
            
       
          
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