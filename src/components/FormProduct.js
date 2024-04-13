import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid } from '@mui/material'
// icon
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// DataTable
import DataTable from './DataTables/Product'

const FormProduct = () => {

  return (
    <div>
      FormProject

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
    <DataTable />
    </div>
  )
}

export default FormProduct