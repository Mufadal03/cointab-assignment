import React, { useEffect, useState } from 'react'
import axios from '../axios/axios'
import {TableContainer ,Paper, Table, TableHead, TableCell, TableRow, TableBody, Avatar, Stack, CircularProgress} from "@mui/material"
import PaginationComp from '../components/PaginationComp'
import {useSearchParams} from "react-router-dom"
import Filter from '../components/Filter'
import notFound from '../utils/notFound.webp'
const UserDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading,setLoading] = useState(false)
    const [users, setUsers] = useState()
    const [page, setPage] = useState(+searchParams.get('page') || 1)
    const [limit, setLimit] = useState(10)
    const [totalUsers, setTotalUsers] = useState(0)
    useEffect(() => {
        const payload = {
            params: {
                limit:limit,
                page: page,
                gender: searchParams.get('gender'),
                country: searchParams.get('country'),
                username: searchParams.get('username'),
                age_lte: searchParams.get('age_lte'),
                age_gte: searchParams.get('age_gte'),
                city : searchParams.get('city')
            }
        }
        fetchUsers(payload)
    }, [page,searchParams,limit])

    const fetchUsers = async(payload) => {
        try {
            setLoading(true)
            const { data ,data:{response} } = await axios.get(`/`, payload)
            setUsers(response)
            setTotalUsers(data.totalData)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePage = (e, value) => {
        setPage(value)
    }
    // if (loading) {
    //     return (<CircularProgress />)
    // }
    return (
        <>
            <Filter page={page} setPage={setPage } />
            <Stack sx={{ width: '90vw', fontWeight: 'bold', fontFamily: 'cursive', m: 'auto' }} justifyContent={'flex-end'} direction='row'>Got {totalUsers} results for this search</Stack>
            {users?.length===0?<Stack direction={'row'} justifyContent='center'><img src={notFound}/></Stack> :loading ? <Stack direction={'row'} justifyContent={'center'}><CircularProgress size={50} thickness={2} /></Stack> :
                <TableContainer component={Paper}>
                    <Table size='medium' sx={{ width: '90vw', border: '1px solid rgba(1,1,1,0.5)', m: '2rem auto' }}>
                        <TableHead>
                            <TableRow sx={{ fontWeight: "bold" }}>
                                <TableCell>Sr No</TableCell>
                                <TableCell>Pofile</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>Country</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users?.length > 0 && users?.map((user, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>
                                                <Avatar sx={{ height: '100px', width: '100px' }} alt={user.name} src={user.profilePic} />
                                            </TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.gender}</TableCell>
                                            <TableCell>{user.age}</TableCell>
                                            <TableCell>{user.city}</TableCell>
                                            <TableCell>{user.state}</TableCell>
                                            <TableCell>{user.country}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
            {users && <PaginationComp page={page} total={Math.ceil(totalUsers/limit)} handlePage={handlePage} />}
        </>
  )
}

export default UserDetails