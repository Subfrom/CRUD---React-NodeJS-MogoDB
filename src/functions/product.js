import axios from 'axios'

export const Delete = async (id) => {
    await axios.delete(process.env.REACT_APP_API + `/product/${id}`)
}

export const Create = async (form) => {
    await axios.post(process.env.REACT_APP_API + '/product', form)
}

export const listby = async (limit, sort, order) => 
    await axios.post(process.env.REACT_APP_API + '/productby', 
    {
        limit,
        sort,
        order
    })

export const GetData = async () => {
   return await axios.get(process.env.REACT_APP_API + '/product')
}

export const Read = async (id) => {
   return await axios.get(process.env.REACT_APP_API + `/product/${id}`)
}

export const Update = async (id, form) => {
   return await axios.put(process.env.REACT_APP_API + `/product/${id}`, form)
}