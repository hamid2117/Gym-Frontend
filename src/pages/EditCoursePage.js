import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'
import EditCourse from '../components/Editcourse'
import Sidebar from '../components/Sidebar'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '1200px',
    display: 'grid',
    gridTemplateColumns: '13% 87%',
    margin: '0px auto',
    '@media (max-width: 500px)': {},
  },
}))

const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>GYM | UserEdit</title>
      </Helmet>
      <Navbar />

      <section className={classes.main}>
        <Sidebar />
        <EditCourse />
      </section>
    </>
  )
}
export default InvoicePage
