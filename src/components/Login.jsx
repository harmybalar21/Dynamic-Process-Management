import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Button, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  // const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleUsernameChange = (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
    // setUsernameError(!emailRegexp.test(enteredUsername));
    setUsernameError(enteredUsername !== undefined && enteredUsername.trim() === '');
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    setPasswordError(enteredPassword !== undefined && enteredPassword.trim() === '');
  };

  const handleSubmit = async () => {
    console.log('Handle Submit called');
    setUsernameError(username.trim() ==='');
    setPasswordError(password.trim() === '');
    

    if (!usernameError && !passwordError) {
      
      // if (password.trim() !== '') {
       let details = {username, password}
       try {
        const response = await AuthService.signin(details);
         console.log('Response Headers:', response.headers);
        // const sessionKey = response.headers;
        const token = response.headers.get('token');

        localStorage.setItem('token', token);
        console.log("Token:",token)
     
        console.log('Signup successful:', sessionKey);
        if (response){
          console.log(response)
          navigate('/Dashboard');
        } 
      } catch (error) {
        console.error('Signup failed:', error.message);
      }
    }
       else {
        console.error('Password is required');
      }
    
  };

  const goToSignUp= () =>{navigate('/SignUp')}

  return (
    <>
    <Grid   style={{ margin: '100px' }}>
      <Paper elevation={10} style={{ padding: 20, height: '64vh', width: 280, margin: '20px auto' }}>
        <Grid align='center' >
          <Avatar style={{ backgroundColor: 'rgb(185 123 184 / 79%)' }}></Avatar>
          <h2 style={{fontWeight:'500'}}>Login</h2>
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
          helperText={usernameError ? 'Email required' : ''}
        />
        <TextField
        style={{ margin: '8px 0' }}
          autoFocus
          id="pwd"
          label="Password"
          variant="standard"
          type='password' 
          placeholder='Enter password'
          value={password}
          fullWidth
          required
          onChange={handlePasswordChange}
          onClick={handlePasswordChange}
          error={passwordError}
          helperText={passwordError ? 'Password required' : ''}
        />
        <Button type="submit" color='primary' variant='contained' style={{ margin: '16px 0'}} fullWidth onClick={handleSubmit}>
          Login
        </Button>
        <Link
        style={{margin:'16px 0'}}
          component="button"
          variant="body2"
          onClick={() => {
            console.info("Forgot Password clicked.");
          }}>
          Forgot Password
        </Link>
        <Typography>
          Don't have an account?
          <Link
            component="button"
            variant="body2"
            onClick={goToSignUp}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>

  </>
    
  );
};

export default Login;
