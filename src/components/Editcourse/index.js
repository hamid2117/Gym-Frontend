import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CalendarToday, Description, Title } from '@material-ui/icons'
import axios from 'axios'
import { useAuthContext } from './../../context/AuthContext'
import Formm from './Formm'

// or
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '90%',
    margin: '0px auto',
    marginBottom: '35px',
  },
  main2: {
    width: '100%',
    maxWidth: '90%',
    margin: '0px auto',
    height: '70vh',
    display: 'grid',
    gap: '9px',
    gridTemplateColumns: '25% 75%',
  },
}))

const User = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [newData, setNewData] = useState({})
  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://gymhaskdfjlhasdlkjfadshfkjlasd.herokuapp.com/api/v1/course/${id}`,
        config
      )
      if (data) {
        setNewData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
      }
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div>
        <div className={classes.main}>
          <h1>Edit User</h1>
        </div>
        <div className={classes.main2}>
          <div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Account Detail</span>
              <div style={{ marginBottom: '9px' }}>
                <span style={{ fontWeight: 'bold' }}> Id </span>
                <span style={{ marginLeft: '10px' }}>
                  {newData && newData._id}
                </span>
              </div>
              <div style={{ marginBottom: '9px' }}>
                <CalendarToday />
                <span
                  style={{
                    marginLeft: '10px',
                    marginBottom: '15px',
                    fontSize: '13px',
                  }}
                >
                  {newData && newData.createdAt}
                </span>
              </div>
              <div style={{ margin: '20px 0px' }}>
                <span style={{ fontWeight: 'bold' }}>Course Detail</span>
              </div>
              <div>
                <Title />
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.coursetitle}
                </span>
              </div>
              <div>
                <Description />
                <span>{newData && newData.coursedescription}</span>
              </div>
              <div style={{ margin: '20px 0px' }}>
                <span style={{ fontWeight: 'bold' }}>Instructor Detail</span>
              </div>
              <div>
                <Title />
                <span>{newData && newData.instructor}</span>
              </div>
              <div>
                <Description />
                <span>{newData && newData.instructordescription}</span>
              </div>
              <div style={{ margin: '20px 0px' }}>
                <span style={{ fontWeight: 'bold' }}>More Detail</span>
              </div>
              {newData && newData.gymname && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> GYM Name : </span>

                  <span>{newData && newData.gymname}</span>
                </div>
              )}
              {newData && newData.address && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> Address : </span>
                  <span>{newData && newData.address}</span>
                </div>
              )}
              {newData && newData.starttime && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> Start Time : </span>
                  <span>{newData && newData.starttime}</span>
                </div>
              )}
              {newData && newData.endtime && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> End Time : </span>
                  <span>{newData && newData.endtime}</span>
                </div>
              )}
              {newData && newData.charges && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> Charges : </span>
                  <span>{newData && newData.charges}</span>
                </div>
              )}
              {/* {newData && newData.address && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> address : </span>
                  <span>{newData && newData.location}</span>
                </div>
              )} */}
              {newData && newData.lecturelink && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> Lecture Link : </span>
                  <span>{newData && newData.lecturelink}</span>
                </div>
              )}
              {newData && newData.contact && (
                <div>
                  <span style={{ fontWeight: 'bold' }}> Contact : </span>
                  <span>{newData && newData.contact}</span>
                </div>
              )}
              {newData && newData.maxstudents && (
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontWeight: 'bold' }}> Max Students : </span>

                  <span>{newData && newData.maxstudents}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>edit</span>
            </div>
            <Formm config={config} id={id} setNewData={setNewData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default User
