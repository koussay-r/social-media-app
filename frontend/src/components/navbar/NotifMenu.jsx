import { useSelector } from 'react-redux';
import * as React from 'react';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
export default function NotifMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const state=useSelector(state=>state.user.value);
  const open = Boolean(anchorEl);
  const [notfis,setNotifs]=React.useState([])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notification">

<CircleNotificationsIcon role="button" onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}  className={` ${state.nightDayMode===false?"text-black/80":"text-white "}  w-4 h-4  cursor-pointer`} ></CircleNotificationsIcon>
        </Tooltip>
      </Box>
      <Menu            
      anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: state.nightDayMode===true? "#3a3b3c" : "white",
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
          style: {
            backgroundColor: state.nightDayMode===true? "#3a3b3c" : "white", // Change the background color here
            color:state.nightDayMode===true? "white" : "black",
            width:340,
          },  
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        
      >
        {notfis.length!=0&&
        notfis.map(data=>{
          return <p>{data}</p>
        })}
        <MenuItem  onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> 
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
