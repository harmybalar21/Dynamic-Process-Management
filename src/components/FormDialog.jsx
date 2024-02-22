import React,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';;
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';


function FormDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);


  
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'HARMY',
      lastName: 'BALAR',
      userName: 'Abhi',
      email: 'GSXVSV',
      phoneNumber: '9859664115',
      active: false,
    },

]);

  const [firstName,setFirstname]= useState('');
  const [firstnameError,setFirstnameError]= useState(false);
  const [lastName,setLastname]= useState('');
  const [lastnameError,setLastnameError]= useState(false)
  const [userName,setUsername]= useState('');
  const [usernameError,setUsernameError]= useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError]  = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleFirstNameChange =(e) => {
    const enteredFirstname = e.target.value;
    setFirstname(enteredFirstname);
    setFirstnameError(enteredFirstname !== undefined && enteredFirstname.trim() === '');
  };

  const handleLastNameChange = (e) => {
    const enteredLastname = e.target.value;
    setLastname(enteredLastname);
    setLastnameError(enteredLastname !== undefined && enteredLastname.trim() === '');
  };
  
  const handleUserNameChange =(e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
    setUsernameError(enteredUsername !== undefined && enteredUsername.trim() === '');
  };

  const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setEmailError(enteredEmail.trim() === '');
  };


  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
  
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(enteredPassword);
    const hasNumber = /\d/.test(enteredPassword);
    const hasUpperCase = /[A-Z]/.test(enteredPassword);
  
    setPasswordError(!(hasSpecialChar && hasNumber && hasUpperCase) || enteredPassword.trim() === '');
  };

  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);
    setConfirmPasswordError(enteredConfirmPassword !== password);
  };

  const handlePhoneNumberChange = (e) => {
    const enteredPhoneNumber = e.target.value;
    const isNumeric = /^[0-9]+$/.test(enteredPhoneNumber);
    const isValidLength = enteredPhoneNumber.length <= 10;
    setPhoneNumber(enteredPhoneNumber);
    setPhoneNumberError(!isNumeric || !isValidLength);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isFirstNameError = firstName.trim() === '';
    const isLastNameError = lastName.trim() === '';
    const isUsernameError = userName.trim() === '';
    const isPhoneNumberError = !/^[0-9]+$/.test(phoneNumber) || phoneNumber.length !== 10;
    const isEmailError = email.trim() === '' || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordError = password.trim() === '' || !/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d)(?=.*[A-Z])/.test(password);
    const isConfirmPasswordError = confirmPassword !== password;

    setFirstnameError(isFirstNameError);
    setLastnameError(isLastNameError);
    setUsernameError(isUsernameError);
    setPhoneNumberError(isPhoneNumberError);
    setEmailError(isEmailError);
    setPasswordError(isPasswordError);
    setConfirmPasswordError(isConfirmPasswordError);

    if (
      isFirstNameError ||
      isLastNameError ||
      isUsernameError ||
      isPhoneNumberError ||
      isEmailError ||
      isPasswordError ||
      isConfirmPasswordError
    ) {
      return;
    }
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(users);
    users.push(formJson);
    handleClose();
    navigate('/dashboard', { state: { formJson } });
  };


  

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} style={{ margin: '25px' }} startIcon={<PersonAddIcon/>}>
        Add User
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit,
          
        }}
      >
        <DialogTitle>ADD USER</DialogTitle>
        <DialogContent>
          
          <TextField   margin="dense" id="firstName" name="firstName" label="Firstname" type="text"  variant="standard" style={{marginRight: "20px", width:'260px'}} onChange={handleFirstNameChange} onClick={handleFirstNameChange}
          error={firstnameError} helperText={firstnameError ? 'Firstname required' : ''}
          />
           <TextField    margin="dense" id="lastName" name="lastName" label="Lastname" type="text"  variant="standard" style={{marginRight: "20px", width:'250px'}} onChange={handleLastNameChange}
           onClick={handleLastNameChange} error={lastnameError} helperText={lastnameError ? 'Lastname required' : ''}
          />
           <TextField   margin="dense" id="userName" name="userName" label="Username" type="text"  variant="standard" style={{marginRight: "20px", width:'260px'}}  onChange={handleUserNameChange} 
           onClick={handleUserNameChange} error={usernameError} helperText={usernameError ? 'Username required' : ''}
          />
           <TextField   margin="dense" id="phoneNumber" name="phoneNumber" label="Phone number" type="text"  variant="standard" style={{marginRight: "20px", width:'250px'}} onChange={handlePhoneNumberChange} error={phoneNumberError} helperText={phoneNumberError ? 'Phone number must be 10 digits' : ''} onClick={handlePhoneNumberChange}
          /> 
          <TextField   margin="dense" id="email" name="email" label="Email Address" type="email"  variant="standard" fullWidth onChange={handleEmailChange} onClick={handleEmailChange} error={emailError} helperText={emailError ? 'Email required': ''}
          />
            <TextField   margin="dense" id="password" name="password" label="Password" type="password"  variant="standard"  autoComplete="new-password" style={{marginRight: "20px", width:'260px'}} onChange={handlePasswordChange} onClick={handlePasswordChange}
            error={passwordError} helperText={passwordError? 'Password must contain at least one special character, one number, and one uppercase letter.': ''}
          />
           <TextField   margin="dense" id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password"  variant="standard" style={{ marginRight: "20px", width:'250px'}} onChange={handleConfirmPasswordChange}onClick={handleConfirmPasswordChange} error={confirmPasswordError} helperText={confirmPasswordError ? 'Passwords do not match.' : ''} 
          
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog;