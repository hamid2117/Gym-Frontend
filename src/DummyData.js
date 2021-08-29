import UsersIcon from '@material-ui/icons/GroupOutlined'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
export const Sidebar = [
  {
    id: 1,
    link: '/dashboard',
    heading: 'Dashboard',
    Icon: DashboardIcon,
  },
  {
    id: 2,
    link: '/userlist',
    heading: 'User list',
    Icon: UsersIcon,
  },
  {
    id: 3,
    link: '/courselist',
    heading: 'Courselist',
    Icon: CollectionsBookmarkIcon,
  },
]

export const rows = [
  {
    isAdmin: false,
    _id: '1212121',
    name: 'Ahmed Ali ',
    email: 'hamid@gmail.com',
    createdAt: '12-6-2021',
  },
]

export const courseData = [
  {
    _id: '1212121',
    address: 'rawalpindi plaza',
    createdAt: '12-6-2021',
    charges: '2000 rs',
    contact: '03121302839',
    instructor: '6128b7ddd60a70069c898138',
    coursetitle: 'Best Course ever build',
    coursedescription: 'Best Course ever build',
    instructordescription: 'Best Instructor ever build',
    endtime: '18:00',
    starttime: '15:00',
    gymname: 'bahadur gym',
    lecturelink: 'https://meet.google.com/',
    location: 'alsdkfjaslkd;fj;aslkdfj',
    maxstudents: '80',
  },
]
