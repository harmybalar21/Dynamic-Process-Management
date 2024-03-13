import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  '@media all': {
    minHeight: 20,
  },
}));



export default function HeaderBar() {
  const [arrowAnchorEl, setArrowAnchorEl] = React.useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);

  const handleArrowClick = (event) => {
    setArrowAnchorEl(event.currentTarget);
  };

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setArrowAnchorEl(null);
    setMoreAnchorEl(null);
  };

  const openArrow = Boolean(arrowAnchorEl);
  const openMore = Boolean(moreAnchorEl);

  const navigate = useNavigate();
 
  const toFormMaster = () => {
    try {
      navigate('/formMaster'); // Use navigate to go to 'FormMaster' page
    } catch (error) {
      console.error('Error navigating to FormMaster:', error);
    }
    handleClose();
  };

  const toUsermaster = () => {
    navigate('/dashboard')
  }

 

  const handleLogout = async () => {
    try {
        localStorage.removeItem('token');
        navigate('/');
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Header style={{backgroundColor: "rgb(122 161 187)"}}>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
            
            {/* Arrow Icon Popover */}
            <div>
              <IconButton
                size="large"
                aria-label="display more actions"
                color="inherit"
                onClick={handleArrowClick}
              >
                <Typography style={{fontSize: '20px'}}>Admin Management</Typography>
                <ArrowDropDownIcon />
              </IconButton>
              <Popover
                open={openArrow}
                anchorEl={arrowAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuList>
                  <MenuItem onClick={toUsermaster}>User Master</MenuItem>
                  <MenuItem onClick={toFormMaster}>Form Master</MenuItem>
                </MenuList>
              </Popover>
            </div>

            {/* More Icon Popover */}
            <div>
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={handleMoreClick}
              >
                <MoreIcon />
              </IconButton>
              <Popover
                open={openMore}
                anchorEl={moreAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Popover>
            </div>
          </Typography>
        </Header>
      </AppBar>
    </Box>
  );
}
