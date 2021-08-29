import React, { useState } from 'react'
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CssBaseline,
  makeStyles,
  Container,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useFormik } from 'formik'
import { useAuthContext } from '../../context/AuthContext'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(0.2),
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1),
  },
  changerr: {
    '@media (max-width: 500px)': {
      marginTop: '17px',
    },
  },
}))
const validationSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function SignIn({ changeExpand }) {
  const classes = useStyles()
  const [emailerror, setEmailerror] = useState(false)
  const [passworderror, setpassworderror] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { loginData } = useAuthContext()

  const handleClickShowPassword = () => {
    setShowPassword((e) => !e)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onSubmit = async (value) => {
    const { ...data } = value
    const response = await axios
      .post(
        'https://gymhaskdfjlhasdlkjfadshfkjlasd.herokuapp.com/api/v1/login',
        data
      )
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 404) {
            setEmailerror(true)
          }
          if (e.response.status === 403) {
            setEmailerror(false)
            setpassworderror(true)
          }
        }
      })
    if (response && response.data) {
      loginData(response.data)
      formik.resetForm()
      setEmailerror(false)
      setpassworderror(false)
      setTimeout(() => {
        setRedirect(true)
      }, 800)
      toast.success('You are logged in .', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  if (redirect) {
    return <Redirect to='/userlist' />
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null || (emailerror && 'This email address not registered')
              }
              error={
                formik.touched.email && formik.errors.email
                  ? true
                  : false || emailerror
                  ? true
                  : false
              }
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              style={{ paddign: 5 }}
              autoFocus
            />
            <TextField
              variant='standard'
              margin='normal'
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null || (passworderror && 'Invalid password')
              }
              error={
                formik.touched.password && formik.errors.password
                  ? true
                  : false || passworderror
                  ? true
                  : false
              }
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      aria-label='password'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
              style={{ marginTop: 1 }}
            />
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              color='primary'
              loading={true}
              disabled={!formik.isValid}
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}
