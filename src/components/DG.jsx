
import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const DG = ({ users, fields }) => {
  return (
    <Box sx={{ height:'530px', width: '100%' }}>
      <DataGrid
        rows={users}
        columns={fields}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      
      />
    </Box>
  );
};

export default DG;