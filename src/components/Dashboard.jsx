import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import DG from './DG';
import FormDialog from './FormDialog';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { formJson } = location.state || {};
 
const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'HARMY',
      lastName: 'BALAR',
      userName: 'Harmy',
      email: 'GSXVSV@gmail.com',
      phoneNumber: '9859664115',
      active: false,
    }
    ]);
    const [isInitialMount, setIsInitialMount] = useState(true);

    useEffect(() => {
      // Check if it's not the initial mount
      if (!isInitialMount && formJson && Object.keys(formJson).length > 0) {
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            id: prevUsers.length + 1,
            firstName: formJson.firstName || '',
            lastName: formJson.lastName || '',
            userName: formJson.userName || '',
            email: formJson.email || '',
            phoneNumber: formJson.phoneNumber || '',
            active: 'true',
          },
        ]);
      }
      setIsInitialMount(false);
    }, [formJson, isInitialMount]);

  const fields = [
    { field: 'firstName', headerName: 'FirstName', width: 210, editable: true },
    { field: 'lastName', headerName: 'LastName', width: 210, editable: true },
    { field: 'userName', headerName: 'UserName', width: 210, editable: true },
    { field: 'email', headerName: 'Email', width: 240, editable: true },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 210, editable: true },
    { field: 'active', headerName: 'Active', width: 210, editable: true },
  ];

  return (
    <div>
    <div style={{ height: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography style={{ fontSize: '25px', fontWeight: '600' }}>USER MANAGEMENT </Typography>
      <FormDialog >Add User</FormDialog>
    </div>

      
      <DG users={users} fields={fields} />
    </div>
  );
};

export default Dashboard;  