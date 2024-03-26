import React, { useEffect, useState } from 'react'
import { listby } from '../../functions/product'
import ProductCard from '../card/ProductCard'
import LoadingCard from '../card/LoadingCard'

const ProductNew = () => {

    const [products, setProducts] = useState([])
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        await listby(3, 'createdAt', 'desc').then(res => {
            setProducts(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

  return (
    <div className='container'>
        <div className='row'>
            { loading 
            ? <LoadingCard count={3}/> 
            : products.map((product) => 
                        <div className='col-md-4'>
                        <ProductCard data={product}/>
                        </div>
                    )
            }
                
        </div>
    </div>
  )
}

export default ProductNew