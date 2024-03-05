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

    useEffect(() => {
        loadData(params.id)
    }, [params])

    const loadData = async (id) => {
        Read(id)
        .then((response) => {
            setForm(response.data)
        })
        .catch((error) => console.log(error))
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        Update(params.id, form)  
        .then((response) => {
            navigate('/')
            })
            .catch((error) => console.log(error))
    }


  return (
    <div>
        FormEditProduct
        <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default FormEditProduct