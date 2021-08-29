import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0px auto',
    '@media (max-width: 500px)': {},
  },
}))
const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>GYM | Dashboard</title>
      </Helmet>
      <Navbar />
      <section className={classes.main}></section>
    </>
  )
}
export default InvoicePage
