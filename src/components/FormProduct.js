import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { GetData, Create, Delete } from '../functions/product'
import { Link } from 'react-router-dom'

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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    Create(form)  
    .then((response) => {
        console.log(response)
        loadData()
      })
      .catch((error) => console.log(error))
  }

  const handleDelete = async (id) => {
    Delete(id)
      .then((response) => {
        console.log(response)
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

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' placeholder='name' onChange={e => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="detail" className="form-label">Detail</label>
          <input type="text" className="form-control" id="detail" name='detail' placeholder='detail' onChange={e => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="text" className="form-control" id="price" name='price' placeholder='price' onChange={e => handleChange(e)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Detail</th>
            <th scope="col">Price</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {
            products ? products.map((product, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.detail}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link to={`/edit/${product._id}`}><button className="btn btn-warning">Edit</button></Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              )
            }) : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default FormProduct