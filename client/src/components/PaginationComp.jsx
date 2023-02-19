import { Pagination, Stack } from '@mui/material'
import React from 'react'

const PaginationComp = ({ page, total, handlePage }) => {
  return (
    <Stack direction='row' justifyContent={'flex-end'} width='90vw' m='auto'> 
      <Pagination size='large' color='primary' sx={{ my: '2rem', width: 'fit-content' }} count={total} variant="outlined" shape="rounded" value={ page} page={page} onChange={(e,value)=>handlePage(e,value)} />
    </Stack>
  )
}

export default PaginationComp