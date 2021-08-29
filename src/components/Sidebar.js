import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Sidebar } from '../DummyData'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    gap: '20px 0px',
    marginTop: '50px',
    marginRight: '10px',
    height: '250px',
  },
  btn: {
    height: '50px',
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <aside className={classes.main}>
      {Sidebar.map((data) => {
        const { Icon, heading, id, link } = data
        return (
          <Button
            startIcon={<Icon />}
            key={id}
            component={Link}
            to={link}
            className={classes.btn}
            variant='outlined'
            color='primary'
          >
            {heading}
          </Button>
        )
      })}
    </aside>
  )
}
export default App
