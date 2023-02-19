import React, { useState } from 'react'
import { Button, Stack, Box, Alert, AlertTitle } from "@mui/material"
import { Delete } from "@mui/icons-material"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from '../axios/axios'
import LoadingButton from '@mui/lab/LoadingButton'
import CustomModal from '../components/CustomModal';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const Home = () => {
    const [fetchLoading, setFetchLoading] = useState(false)
    const [deleteLoading,setDeleteLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const handleFetchUsers = () => {
        if (fetchLoading) {
           enqueueSnackbar('already Fetch is going on',{variant:'error'})
        }
        setFetchLoading(true)
        axios.post('/fetch').then((r) => {
            console.log(r.data)
            setFetchLoading(false)
            enqueueSnackbar('Users Fetched',{variant:"success"});

        }).catch((e) => console.error(e))
    }

    const handleDeleteUsers = () => {
        setDeleteLoading(true)
        axios.delete('/delete').then((r) => {
            console.log(r.data)
            setDeleteLoading(false)
            enqueueSnackbar('Users Deleted',{variant:"error"});
            
        }).catch((e) => {
            console.log(e)
        })
    }
  return (
      <Box sx={{
          display: "flex",
          height: "100vh",
          justifyContent: 'center',
          alignItems:'center'
      }}>
          <Stack spacing={5} direction='row'>
              <LoadingButton loading={fetchLoading} onClick={handleFetchUsers} size='large' variant='contained'endIcon={<CloudDownloadIcon />} color='success'>Fetch users</LoadingButton>
         
              <LoadingButton loading={deleteLoading} onClick={()=>setOpen(true)} size='large' variant='contained' color='error' endIcon={<Delete />}> Delete Users</LoadingButton>
              <CustomModal open={ open} handleClose={()=>setOpen(false)} handleDelete={handleDeleteUsers} />
          <Link to='/user-details' style={{textDecoration:"none"}}><Button size='large' variant='contained' >User details page</Button></Link>
          </Stack>  
      </Box>
  )
}

export default Home