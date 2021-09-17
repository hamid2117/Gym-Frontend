import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  IconButton,
  Divider,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: '10px',
    padding: '30px 15px',
    width: '400px',
  },
  head: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
  },
  inputs: {
    padding: '25px 0px',
    display: 'grid',
    gap: '15px 0px',
  },
  sign: {
    backgroundColor: '#5f83ef',
    '&:hover': {
      backgroundColor: '#3764eb',
    },
  },
}))

const validationSchema = yup.object({
  coursetitle: yup.string().required('Course Name is required'),
  coursedescription: yup.string().required('Course Description is required'),
  instructordescription: yup
    .string()
    .required('Instructor Description is required'),
  lecturelink: yup.string().required('Lecture Link is required'),
})

export default function Login() {
  const classes = useStyles()
  const { adminCourse, adminCloseCourse } = useGlobalUiContext()
  const { userlist, getData, userdata } = useAuthContext()
  const [emailerror, setEmailerror] = useState(false)

  const { token } = userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const onSubmit = async (value) => {
    const { ...data } = value
    const response = await axios
      .post(
        'https://gymhaskdfjlhasdlkjfadshfkjlasd.herokuapp.com/api/v1/course',
        data,
        config
      )
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 409) {
            setEmailerror(true)
          }
        }
      })
    if (response && response.data) {
      adminCloseCourse()
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: {
      coursetitle: '',
      coursedescription: '',
      instructordescription: '',
      lecturelink: '',
      instructor: '',
      // filename: '',
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminCourse}
        onClose={adminCloseCourse}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminCourse}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>Add Course</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseCourse()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='coursetitle'
                    name='coursetitle'
                    variant='standard'
                    label='Course Name'
                    required
                    error={
                      formik.touched.coursetitle && formik.errors.coursetitle
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.coursetitle && formik.errors.coursetitle
                        ? formik.errors.coursetitle
                        : null
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.coursetitle}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='coursetitle'
                  />
                </Grid>
              </Grid>
              <TextField
                name='lecturelink'
                onBlur={formik.handleBlur}
                type='text'
                label='lecture link'
                error={
                  formik.touched.lecturelink && formik.errors.lecturelink
                    ? true
                    : false
                }
                helperText={
                  formik.touched.lecturelink && formik.errors.lecturelink
                    ? formik.errors.lecturelink
                    : null
                }
                value={formik.values.lecturelink}
                onChange={formik.handleChange}
                variant='standard'
              />
              <TextField
                name='coursedescription'
                onBlur={formik.handleBlur}
                type='text'
                label='Course Description'
                error={
                  formik.touched.coursedescription &&
                  formik.errors.coursedescription
                    ? true
                    : false
                }
                helperText={
                  formik.touched.coursedescription &&
                  formik.errors.coursedescription
                    ? formik.errors.coursedescription
                    : null
                }
                value={formik.values.coursedescription}
                onChange={formik.handleChange}
                multiline
                rows={4}
                rowsMax={6}
                variant='standard'
              />
              <InputLabel id='select-filled-label'>
                Select your instructor
              </InputLabel>
              <Select
                label='select-filled-label'
                className={classes.selected}
                name='instructor'
                id='instructor'
                required
                onChange={formik.handleChange}
                value={formik.values.instructor}
              >
                {userlist.map((data) => {
                  const { name, _id } = data
                  return (
                    <MenuItem
                      // onClick={() => updateSelected(_id)}
                      value={_id}
                      key={_id}
                    >
                      {data.trainer && name}
                    </MenuItem>
                  )
                })}
              </Select>
              <TextField
                name='instructordescription'
                onBlur={formik.handleBlur}
                type='text'
                label='Instructor Description'
                error={
                  formik.touched.instructordescription &&
                  formik.errors.instructordescription
                    ? true
                    : false
                }
                helperText={
                  formik.touched.instructordescription &&
                  formik.errors.instructordescription
                    ? formik.errors.instructordescription
                    : null
                }
                value={formik.values.instructordescription}
                onChange={formik.handleChange}
                multiline
                rows={4}
                rowsMax={6}
                variant='standard'
              />
              {/* <input
                accept='image/*'
                className={classes.input}
                style={{ display: 'none' }}
                id='raised-button-file'
                multiple
                value={formik.values.filename}
                onChange={formik.handleChange}
                type='file'
              />
              <label htmlFor='raised-button-file'>
                <Button
                  variant='raised'
                  component='span'
                  className={classes.button}
                >
                  Upload
                </Button>
              </label> */}
              <Button className={classes.sign} type='submit'>
                add Course
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
