import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ToastContainer, toast } from 'react-toastify'

import {
  Account,
  Error,
  UserEdit,
  Userlist,
  EditCourse,
  Courselist,
} from './pages'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import AdminRoute from './utils/AdminRoute'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
})
const useStyles = makeStyles((theme) => ({
  main: {
    '@media (max-width: 500px)': {},
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className={classes.main}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Account />
            </Route>
            <Route exact path='/dashboard'>
              <Userlist />
            </Route>
            <AdminRoute exact path='/userlist'>
              <Userlist />
            </AdminRoute>
            <AdminRoute exact path='/useredit/:id'>
              <UserEdit />
            </AdminRoute>
            <AdminRoute exact path='/courseedit/:id'>
              <EditCourse />
            </AdminRoute>
            <AdminRoute exact path='/courselist'>
              <Courselist />
            </AdminRoute>
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  )
}
export default App
