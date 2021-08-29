import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '80%',
    gap: '10px',
    '@media (max-width: 500px)': {},
  },
}))

const Formm = ({ config, id, setNewData }) => {
  const classes = useStyles()

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `https://gymhaskdfjlhasdlkjfadshfkjlasd.herokuapp.com/api/v1/course/${id}`,
        data,
        config
      )
      if (dataa) {
        setNewData(dataa)
        toast.success('Course Data is updated.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        formik.resetForm()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      address: '',
      charges: '',
      contact: '',
      instructor: '',
      coursetitle: '',
      coursedescription: '',
      instructordescription: '',
      endtime: '',
      starttime: '',
      gymname: '',
      lecturelink: '',
      location: '',
      maxstudents: '',
    },
    onSubmit,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='coursetitle'
              fullWidth
              name='coursetitle'
              variant='standard'
              label='Course Name'
              value={formik.values.coursetitle}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='instructor'
              name='instructor'
              variant='standard'
              label='Instructor Id'
              value={formik.values.instructor}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='coursedescription'
              fullWidth
              name='coursedescription'
              variant='standard'
              label='Course Description'
              value={formik.values.coursedescription}
              onChange={formik.handleChange}
              multiline
              rows={4}
              rowsMax={6}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='instructordescription'
              id='instructordescription'
              fullWidth
              label='Instructor Description'
              variant='standard'
              multiline
              rows={4}
              fullWidth
              rowsMax={6}
              value={formik.values.instructordescription}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='gymname'
              name='gymname'
              variant='standard'
              label='GYM Name'
              value={formik.values.gymname}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='address'
              name='address'
              variant='standard'
              label='Address'
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='starttime'
              name='starttime'
              variant='standard'
              label='Start Time'
              value={formik.values.starttime}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='endtime'
              name='endtime'
              variant='standard'
              label='End Time'
              value={formik.values.endtime}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='charges'
              name='charges'
              variant='standard'
              label='Charges'
              value={formik.values.charges}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='lecturelink'
              name='lecturelink'
              variant='standard'
              label='lecture Link'
              value={formik.values.lecturelink}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='contact'
              name='contact'
              variant='standard'
              fullWidth
              label='Contact'
              value={formik.values.contact}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='maxstudents'
              name='maxstudents'
              variant='standard'
              label='Max Student'
              value={formik.values.maxstudents}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant='outlined' color='primary' type='submit'>
          Edit
        </Button>
      </form>
    </>
  )
}
export default Formm
