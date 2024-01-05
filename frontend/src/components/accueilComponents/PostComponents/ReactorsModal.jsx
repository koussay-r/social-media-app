import React, { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { toast } from "react-hot-toast";
import axios from 'axios';
export default function ReactorsModal({reactorsArray,setReactorsArray,handleOpenReactorsModal,openReactorsModal,id}) {
    const handleOpen=()=>{
        handleOpenReactorsModal()
    }
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
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openReactorsModal}
      onClose={handleOpen}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        {
      reactorsArray.length === 0?
      <p>loading...</p>:
      reactorsArray.map(item=>{
        return <p>{item.name}</p>
      })
     }
      </Sheet>
    </Modal>
  </React.Fragment>
  )
}
