import React,{ useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Create } from '../functions/product'
import { TextField, Button, Grid, IconButton, Tooltip } from '@mui/material'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        detail: '',
        price: ''
    })

    useEffect(() => {
    }, [])

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
       navigate('/admin/tableproducts')
      })
      .catch((error) => console.log(error))
  }


  return (
    <div>
    FormAddProduct
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
    </div>
  )
}

export default FormEditProduct