import * as React from 'react';
import { Box } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';
import {Menu,MenuItem,Divider,ListItemIcon,IconButton} from '@mui/material';
import { BiLogOut } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import nopfp from "./../../assets/noPfp.png"
import {changeAuth,changeAccountExistCookies,changeAccountExistSession} from '../redux/user'
export default function AccountMenu() {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const state=useSelector((state)=>state.user.value)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    localStorage.removeItem("userID")
    dispatch(changeAccountExistCookies())
    dispatch(changeAccountExistSession())
    dispatch(changeAuth())
    localStorage.removeItem("account")
    sessionStorage.removeItem("account")
    sessionStorage.removeItem("profilePic")
    document.body.style.backgroundColor="#f3f3f3"
    navigate("/")
    window.location.reload();
    
  };
  const hanldecloseMenu=()=>
  {
    setAnchorEl(null);
  }
  return (
    <React.Fragment >
      <Box className="mt-1" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            
            <img src={!state.loadingUserPfp?(state.UserPfp.length!=0?state.UserPfp:nopfp):nopfp} className='w-[32px] rounded-full h-[32px]'/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}  
        onClose={hanldecloseMenu}    
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
          },  
          
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={`/profile/${state.UserData._id}`}>
        <MenuItem className='flex gap-1'>
        <img src={!state.loadingUserPfp?(state.UserPfp.length!=0?state.UserPfp:nopfp):nopfp} className='w-[32px] rounded-full h-[32px]'/> <p>Profile</p>
        </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BiLogOut  />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}