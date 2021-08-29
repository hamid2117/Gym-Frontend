import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper } from '@material-ui/core'
import { useAuthContext } from '../context/AuthContext'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: '70px',
  },
  main2: {
    display: 'grid',
    justifyItems: 'end',
    margin: '0px auto',
    maxWidth: '1200px',
  },
}))

const Navbar = () => {
  const { logout } = useAuthContext()
  const classes = useStyles()
  return (
    <Paper elevation={4} className={classes.main}>
      <div className={classes.main2}>
        <div style={{ marginTop: '17px' }}>
          <Button variant='outlined' onClick={() => logout()} color='secondary'>
            logout
          </Button>
        </div>
      </div>
    </Paper>
  )
}
export default Navbar
