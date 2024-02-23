import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Button, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const navigate = useNavigate();

    const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleUsernameChange = (e) => {
        const enteredUsername = e.target.value;
        setUsername(enteredUsername); 
        setUsernameError(enteredUsername !== undefined && enteredUsername.trim() === '')
    }

    const handleEmailChange = (e) => {
      const enteredEmail = e.target.value;
      setEmail(enteredEmail);
      setEmailError(!emailRegexp.test(enteredEmail));
    };
  
    const handlePasswordChange = (e) => {
      const enteredPassword = e.target.value;
      setPassword(enteredPassword);
      setPasswordError(enteredPassword !== undefined && enteredPassword.trim() === '');
    };


    const handleSignUp = async () => {
     

        console.log('Handle Submit called');
        setEmailError(!emailRegexp.test(email));
        setPasswordError(password.trim() === '');
        setUsernameError(username.trim() === '');
        
    
        if (!emailError && !passwordError && !usernameError) {
          
          if (password.trim() !== '') {
            let req ={username,email,password,roles:["admin"]}
            
            try {
              const response = await AuthService.signup(req);
          
              console.log('Signup successful:', response);
              if (response){
                navigate('/');
              } 
            } catch (error) {
              // Handle signup failure, e.g., display an error message
              console.error('Signup failed:', error.message);
            }
            // navigate('/', { state: req });
          } else {
            console.error('Password is required');
          }
        } else {
          console.error('Invalid username or password');
        }
      };
      

    const goToLogin = () =>{navigate('/')}
  return (
  <>
  <Grid   style={{ margin: '100px' }}>
      <Paper elevation={10} style={{ padding: 20, height: '70vh', width: 280, margin: '20px auto' }}>
        <Grid align='center' >
          <Avatar style={{ backgroundColor: '#1976d2' }}></Avatar>
          <h2 style={{fontWeight:'200'}}>Sign Up</h2>
        </Grid>
        <TextField
        style={{ margin: '8px 0' }}
          autoFocus
          id="standard-basic"
          label="Username"
          variant="standard"
          placeholder='Enter username'
          fullWidth
          required 
          onChange={handleUsernameChange}
          onClick={handleUsernameChange}
          error={usernameError}
          helperText={usernameError ? 'Username required' : ''}
        
        />
        <TextField
        style={{ margin: '8px 0' }}
          autoFocus
          id="standard-basic"
          label="Email"
          variant="standard"
          placeholder='Enter email-address'
          fullWidth
          required 
          onChange={handleEmailChange}
          onClick={handleEmailChange}
          error={emailError}
          helperText={emailError ? 'Email required' : ''}
         
        />
        <TextField
        style={{ margin: '8px 0' }}
          autoFocus
          id="pwd"
          label="Password"
          variant="standard"
          type='password' 
          placeholder='Enter password'
          fullWidth
          required
          onChange={handlePasswordChange}
          onClick={handlePasswordChange}
          error={passwordError}
          helperText={passwordError ? 'Password required' : ''}
        />
        <Button type="submit" color="primary" variant='contained' style={{ margin: '14px 0' }} fullWidth  onClick={handleSignUp} >
          Sign up
        </Button>
        <Typography>
          Go Back to
          <Link component="button" variant="body2" onClick={goToLogin}> Login </Link>
        </Typography>
       </Paper>
    </Grid>  
  </>
  )
}

export default SignUp
