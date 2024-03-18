import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import FormAccordian from '../FormField/FormField';
import AddIcon from '@mui/icons-material/Add';
import FormField from '../FormField/FormField';
import FormAction from '../FormAction/FormAction';

function FDialog() {
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);

  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: 'Form 1', description: 'hasdbxchsd' },
  ]);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };
 
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 
  const nameChange = (e) => {
    const enteredName = e.target.value;
    setNameError(enteredName.trim() === '');
  };
 
  const descriptionChange = (e) => {
    const enteredDescription = e.target.value;
    setDescriptionError(enteredDescription.trim() === '');
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}style={{marginLeft: '735px',backgroundColor: "rgb(122 161 187)",marginTop: '5px',marginBottom: "5px",color: 'white',textTransform: 'capitalize',fontSize:"15px"}}
      >
        Add Form<AddIcon/>
      </Button>
 
      <Dialog
        maxWidth="lg" fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { name, description } = formJson;
 
            if (!name|| !description) {
              setNameError(!name);
              setDescriptionError(!description);
              return;
            }

            setShowAccordion(true)
            navigate('/formMaster', { state: { formJson } });
          },
        }}
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize:'22px'}}>Add Form <CancelIcon  onClick={handleClose} ></CancelIcon></DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" name="name" label="Name" type="text"  variant="outlined" onChange={nameChange} error={nameError} helperText={nameError ? 'First Name required' : ''} 
          style={{width:'1145px',border:'1px solid black'}}/>
          <br />
          <TextareaAutosize autoFocus margin="dense" id="description" name="description" placeholder="Description" style={{width:'1140px',border:'1px solid black'}} onChange={descriptionChange} error={descriptionError ? 'true' : undefined} minRows={3}
          />  
          {descriptionError && (
          <div style={{ color: 'red', fontSize: '17px' }}>
          Description required
          </div>
          )}
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}variant="contained" style={{ textTransform: 'capitalize',fontSize:'16px', fontWeight: 700,backgroundColor: "rgb(122 161 187)"  }}>Cancel</Button>
          <Button type="submit"   variant="contained" style={{ textTransform: 'capitalize',fontSize:'16px',  fontWeight: 700,backgroundColor: "rgb(122 161 187)" }}>Save</Button>
          </DialogActions>
          {showAccordion && (
          <>
            <FormField/>
            <FormAction/>
           </>
       
          )}
        </Dialog>
    </React.Fragment>
  );
}
export default FDialog;