import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid rgba(1,1,1,.5)',
  boxShadow: 24,
  p: 4,
};
const CustomModal = ({ open, handleClose,handleDelete }) => {
  const handleClick = () => {
    handleClose()
    handleDelete()
  }
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
    >
          <Box sx={style}>
          <Typography color='error' id="modal-modal-title" variant="h6" component="h2">
            Delete User Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            are you sure you want to delete all the entries from the database
        </Typography>
        <Stack direction={'row'}justifyContent="space-between">
          <Button onClick={handleClick} size='large' variant='contained' color='error'  >proceed</Button>
          <Button onClick={()=>handleClose()} size='large' variant='outlined' color='primary' >Cancel</Button>
        </Stack>
        </Box>
    </Modal>
  )
}

export default CustomModal