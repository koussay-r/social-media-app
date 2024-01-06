import React, { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { toast } from "react-hot-toast";
import axios from 'axios';
import UserInSearch from '../../navbar/userInSearch';
import List from '@mui/joy/List';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import { useSelector } from 'react-redux';
export default function ReactorsModal({reactorsArray,userName,setReactorsArray,handleOpenReactorsModal,openReactorsModal,id}) {
    const handleOpen=()=>{
      setReactorsArray([])
      handleOpenReactorsModal()
    }
    const state=useSelector((state)=>state.user.value)
    const [postReactorsFetchingCount,setPostReactorsFetchingCount]=useState(0)
    useEffect(()=>{
        const handleGetPostReactors=async()=>{
            try {
                const response=await axios.post(`http://localhost:9000/posts/getReactors/${id}`,{postReactorsFetchingCount:postReactorsFetchingCount})
                setReactorsArray([...reactorsArray,...response.data]);
                console.log(reactorsArray)
              } catch (error) {
                console.log(error.message);
                toast.error("something went wrong!! try again")
                handleOpenReactorsModal()
            }
          }
            handleGetPostReactors()
          
    },[postReactorsFetchingCount])
  return (
    <React.Fragment>
  <Modal
    open={openReactorsModal?"fullScreen":undefined}
    onClose={handleOpen}
  >
    <ModalDialog sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              right: 0,
              
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
            backgroundColor:state.nightDayMode===true?"#242526":"white"
          })} layout={openReactorsModal?"fullScreen":undefined}>
      <ModalClose />
      <DialogTitle >{userName}'s Post</DialogTitle>
      <List
        sx={{
          overflow: scroll ? 'scroll' : 'initial',
          mx: 'calc(-1 * var(--ModalDialog-padding))',
          px: 'var(--ModalDialog-padding)',
        }}
      >
         {
      reactorsArray.length === 0?
      <p>loading...</p>:
      reactorsArray.map(item=>{
        return  <UserInSearch key={item._id} _id={item._id} name={item.name} Occupation={item.Occupation} friendsListIds={item.friendsListIds} freindRequest={item.freindRequest} />
      })
     }
      </List>
    </ModalDialog>
  </Modal>
</React.Fragment>
  )
}
