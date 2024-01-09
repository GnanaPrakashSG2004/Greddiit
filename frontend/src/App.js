import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { LoginForms, user, setUser } from './components/Login'
import { Profile } from './components/User/Profile'
import { Navbar } from './components/Navbar'
import { MySubGreddiit } from './components/MySubGreddiits/MySubgreddiit'
import { MySubUsers } from './components/MySubGreddiits/MySubUsers'
import { MySubRequests } from './components/MySubGreddiits/MySubRequests'
import { MySubStats } from './components/MySubGreddiits/MySubStats'
import { MySubReports } from './components/MySubGreddiits/MySubReports'
import { AllSubGreddiits } from './components/AllSubGreddiits/AllSubGreddiits'
import { AllSubGreddiitPage } from './components/AllSubGreddiits/AllSubGreddiitPage'
import { SavedPosts } from './components/User/SavedPosts'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const App = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(true)

  useEffect(() => {
    setLoad(true)
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON)
      setUser(JSON.parse(loggedUserJSON))
    setLoad(false)
  }, [])

  useEffect(() => {
    if (user === null) {
      navigate('/signin')
    }
  }, [navigate])

  return (
    <div>
      {
        load ?
          <div>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div> :
          <div>
            <Navbar />
            <Routes>
              <Route exact path='/profile' element={user ? <Profile /> : <Navigate replace to='/signin' />} />
              <Route exact path='/signin' element={user ? <Navigate replace to='/profile' /> : <LoginForms />} />
              <Route exact path='/mysubgreddiits' element={user ? <MySubGreddiit /> : <Navigate replace to='/signin' />} />
              <Route exact path='/mysubgreddiits/:id' element={user ? <></> : <Navigate replace to='/signin' />} />
              <Route exact path='/mysubgreddiits/:id/users' element={user ? <MySubUsers /> : <Navigate replace to='/signin' />} />
              <Route exact path='/mysubgreddiits/:id/requests' element={user ? <MySubRequests /> : <Navigate replace to='/signin' />} />
              <Route exact path='/mysubgreddiits/:id/stats' element={user ? <MySubStats /> : <Navigate replace to='/signin' />} />
              <Route exact path='/mysubgreddiits/:id/reports' element={user ? <MySubReports /> : <Navigate replace to='/signin' />} />
              <Route exact path='/allsubgreddiits' element={user ? <AllSubGreddiits /> : <Navigate replace to='/signin' />} />
              <Route exact path='/allsubgreddiits/:id' element={user ? <AllSubGreddiitPage /> : <Navigate replace to='/signin' />} />
              <Route exact path='/savedposts' element={user ? <SavedPosts /> : <Navigate replace to='/signin' />} />
              <Route path='*' element={user ? <Navigate replace to='/profile' /> : <Navigate replace to='/signin' />} />
            </Routes>
          </div>
      }
    </div>
  )
}

export default App
