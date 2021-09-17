import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { courseData } from './../../DummyData'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { useAuthContext } from './../../context/AuthContext'
import { Link, Redirect } from 'react-router-dom'
import { IconButton, Button, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { useGlobalUiContext } from './../../context/uiContext'
import DeleteModel from '../DeleteModel'
import { toast } from 'react-toastify'

const UserList = () => {
  const [data, setData] = useState(courseData)
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const [model, setModel] = useState(false)
  const [deleteData, setDeleteData] = useState(false)
  const [newId, setNewId] = useState('')
  const { adminCloseCourse } = useGlobalUiContext()
  const { userdata } = useAuthContext()
  const { token } = userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        'https://gymhaskdfjlhasdlkjfadshfkjlasd.herokuapp.com/api/v1/courses',
        config
      )
      if (data) {
        setLoading(false)
        setData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setRedirect(true)
      }
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        `https://gymhaskdfjlhasdlkjfadshfkjlasd.herokuapp.com/api/v1/course/${id}`,
        config
      )
      if (response) {
        getData()
        setDeleteData(false)
        toast.error('Course is deleted.', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const closeModel = () => {
    setModel(false)
  }
  const deleteUser = () => {
    setDeleteData(true)
    setModel(false)
  }
  const handleDeleteBtn = (id) => {
    setNewId(id)
    setModel(true)
  }

  useEffect(() => {
    getData()
  }, [adminCloseCourse])

  useEffect(() => {
    if (deleteData) {
      handleDelete(newId)
    }
  }, [deleteData])

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'gymname', headerName: 'Gym Name ', width: 180 },
    { field: 'address', headerName: 'Address', width: 180 },
    { field: 'contact', headerName: 'Contact', width: 180 },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 170,
      renderCell: (params) => {
        return (
          <div className='userList'>
            {params.row.createdAt.substring(0, 10)}
          </div>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button component={Link} to={`/courseedit/${params.row._id}`}>
              Edit
            </Button>
            <IconButton
              className='userListDelete'
              onClick={() => {
                handleDeleteBtn(params.row._id)
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )
      },
    },
  ]

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '80%',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </div>
      ) : (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      )}
      <DeleteModel
        model={model}
        closeModel={closeModel}
        deleteUser={deleteUser}
      />
    </>
  )
}

export default UserList
