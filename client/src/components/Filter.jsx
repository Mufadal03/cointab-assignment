import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { countryDb } from '../utils/countryDb'
function valuetext(value) {
  return `${value}°C`;
}
const Filter = ({page,setPage}) => {
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
  const [age, setAge] = useState([10, 90])
  const [ageParams,setAgeParams] = useState([10,90])
  const [query,setQuery] = useState('')
  const [name,setName] = useState('')
    useEffect(() => {
        const minAge = Math.min(...ageParams)
        const maxAge = Math.max(...ageParams)
        const params = {}
        gender && (params.gender = gender)
        country && (params.country = country)
        page && (params.page = page)
      query && (params.username = query)
      age[0] && (params.age_gte = minAge)
      age[1] && (params.age_lte=maxAge)
        setSearchParams(params)
    }, [gender, country,page,query,ageParams])
    
  useEffect(() => {
    let timer = setTimeout(() => {
      setQuery(name)
    },500)
      return ()=>clearTimeout(timer)
    },[name])
  const handleReset = () => {
      setName('')
        setPage(1)
        setCountry('')
        setGender('')
        setAge([10,90])
    }
  const handleAge = (e, newValue) => {
      setAge(newValue)  
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      setAgeParams(age)
    }, 500)
    return ()=> clearTimeout(timer)
  },[age])
  return (
    <Box sx={{width:'90vw',m:'auto',mt:'2rem'}}>
          <Stack direction={'row'} spacing={3}>
              <Link to='/'><Button variant='contained'>go Home</Button></Link>
              <TextField size='small'value={name} onChange={(e)=>setName(e.target.value)} sx={{ width: '200px' }} label="Search by Name" variant="outlined" />
              <FormControl sx={{width:'210px'}}>
                <InputLabel id='gender'>FILTER BY GENDER</InputLabel>
              <Select size='small' label='Gender' value={gender} onChange={(e) => setGender(e.target.value)} labelId='gender'>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
              </Select>
              </FormControl>
              <FormControl sx={{width:'210px'}}>
                <InputLabel id='country'>FILTER BY COUNTRY</InputLabel>
              <Select size='small' label='country' value={country} onChange={(e) => setCountry(e.target.value)} labelId='country'>
                      {
                          countryDb.map((el) => <MenuItem value={el.name}>{ el.name}</MenuItem>)
                 }
              </Select>
              </FormControl>
              <Box sx={{width:'300px'}}>
                  <Slider
                      value={age}
                      getAriaLabel={() => 'Temperature range'}
                      onChange={handleAge}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                  />
                  <Typography textAlign={'center'}>Searching age from {age[0]} to {age[1] }</Typography>
              </Box>
              <Button onClick={handleReset} variant='contained' color='error'>RESET FILTER</Button>
          </Stack>
    </Box>
  )
}

export default Filter