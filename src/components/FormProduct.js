import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { GetData, Create, Delete } from '../functions/product'
import { Link } from 'react-router-dom'
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, IconButton, Tooltip } from '@mui/material'
// icon
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { toast } from "react-toastify";

const FormProduct = () => {

  const [products, setProducts] = useState([])
  const [form, setForm] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    GetData()
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error))
  }

  const handleChange = (e) => {

    if(e.target.name === 'file')
    {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      })
    }else{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formWithFileData = new FormData()

    for (const key in form)
    {
      formWithFileData.append(key, form[key])
    }

    Create(formWithFileData)  
    .then((response) => {
        console.log(response)
        loadData()
      })
      .catch((error) => console.log(error))
  }

  const handleDelete = async (id) => {
    Delete(id)
      .then((response) => {
        toast.success(response.data.name + ' is deleted', { position: "top-left" });
        loadData()
      })
      .catch((error) => console.log(error))
  }

  const handleEdit = async (id) => {
    await axios.get(process.env.REACT_APP_API + `/product/${id}`)
      .then((response) => {
        console.log(response)
        setForm(response.data)
      })
      .catch((error) => console.log(error))
  }



  return (
    <div>
      FormProject

      {/* <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div>
          <TextField id="name" label="name" variant="outlined" name='name' onChange={e => handleChange(e)}/>
        </div>
        <br />
        <div>
          <TextField id="detail" label="detail" variant="outlined" name='detail' onChange={e => handleChange(e)}/>
        </div>
        <br />
        <div>
          <TextField type='file' id="file" variant="outlined" name='file' onChange={e => handleChange(e)}/>
        </div>
        <br />
        <div>
          <TextField type='number' id="price" label="price" variant="outlined" name='price' onChange={e => handleChange(e)}/>
        </div>
        <br />
        <Button type='submit' variant="outlined">Submit</Button>
      </form>
      <br /> */}

    <Grid container spacing={3}>
      <Grid item xs>
        
      </Grid>
      <Grid item xs={6}>
        
      </Grid>
      <Grid item xs textAlign={'end'}>
        <Link to="/add">
          <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
            Create
          </Button>
        </Link>
      </Grid>
    </Grid>
    <br />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Detail</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            products ? products.map((product, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell>{product.image}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.detail}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                     <Tooltip title="Edit">
                        <IconButton>
                          <Link to={`/edit/${product._id}`}><EditIcon fontSize="large" color='warning' /></Link>
                        </IconButton>
                      </Tooltip>
                     <Tooltip title="Delete">
                        <IconButton>
                          <DeleteForeverIcon fontSize="large" color='error' onClick={() => handleDelete(product._id)} />
                        </IconButton>
                      </Tooltip>
                  </TableCell>
                </TableRow>
              )
            }) : null
          }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default FormProduct