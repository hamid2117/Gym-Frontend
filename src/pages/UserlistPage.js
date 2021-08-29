import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Userlist from '../components/Userlist'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0px auto',
    display: 'grid',
    gridTemplateColumns: '13% 87%',
    '@media (max-width: 500px)': {},
  },
}))
const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>GYM | Userlist</title>
      </Helmet>
      <Navbar />

      <section className={classes.main}>
        <Sidebar />
        <Userlist />
      </section>
    </>
  )
}
export default InvoicePage
