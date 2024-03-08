import React,{ useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Read, Update } from '../functions/product'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        detail: '',
        price: ''
    })

    const [oldImage, setOldImage] = useState()

    useEffect(() => {
        loadData(params.id)
    }, [params])

    const loadData = async (id) => {
        Read(id)
        .then((response) => {
            setForm(response.data)
            setOldImage(response.data.image)
        })
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
    
        formWithFileData.append('oldImage', oldImage)


        Update(params.id, formWithFileData)  
        .then((response) => {
            navigate('/')
            })
            .catch((error) => console.log(error))
    }


  return (
    <div>
        FormEditProduct
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' placeholder='name' onChange={e => handleChange(e)} value={form.name}/>
        </div>
        <div className="mb-3">
          <label htmlFor="detail" className="form-label">Detail</label>
          <input type="text" className="form-control" id="detail" name='detail' placeholder='detail' onChange={e => handleChange(e)} value={form.detail}/>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="text" className="form-control" id="price" name='price' placeholder='price' onChange={e => handleChange(e)} value={form.price}/>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="file" className="form-control" id="file" name='file' onChange={e => handleChange(e)}/>
        </div>        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default FormEditProduct