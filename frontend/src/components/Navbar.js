import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import LogoutIcon from '@mui/icons-material/Logout'
import { user, setUser } from './Login'
import { useNavigate, useMatch } from 'react-router-dom'

import RedditIcon from '@mui/icons-material/Reddit'
import LineWeightIcon from '@mui/icons-material/LineWeight'
import ListAltIcon from '@mui/icons-material/ListAlt'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import GroupIcon from '@mui/icons-material/Group'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import BarChartIcon from '@mui/icons-material/BarChart'
import ReportIcon from '@mui/icons-material/Report'

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [subId, setSubId] = useState('')
  const navigate = useNavigate()
  const mySubPageMatch = useMatch('/mysubgreddiits/:id/*')

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  useEffect(
    () => {
      const handleKeyboardShortcut = event => {
        if (event.key.toLowerCase() === 'u')
          navigate(`/mysubgreddiits/${subId}/users`)
        else if (event.key.toLowerCase() === 'j')
          navigate(`/mysubgreddiits/${subId}/requests`)
        else if (event.key.toLowerCase() === 's')
          navigate(`/mysubgreddiits/${subId}/stats`)
        else if (event.key.toLowerCase() === 'r')
          navigate(`/mysubgreddiits/${subId}/reports`)
      }

      if (mySubPageMatch) {
        setSubId(document.URL.substring(37).split('/')[0])
        document.addEventListener('keypress', handleKeyboardShortcut)
      }

      return () => document.removeEventListener('keypress', handleKeyboardShortcut)
    }
    , [mySubPageMatch, subId, navigate]
  )

  const mySubPages = [
    { url: `/mysubgreddiits/${subId}/users`, name: 'Users' },
    { url: `/mysubgreddiits/${subId}/requests`, name: 'Join Requests' },
    { url: `/mysubgreddiits/${subId}/stats`, name: 'Stats' },
    { url: `/mysubgreddiits/${subId}/reports`, name: 'Reports' }
  ]

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handeLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    navigate('/signin')
    setUser(null)
  }

  const handleRedirect = (event, url) => {
    event.preventDefault()
    navigate(url)
  }

  const handleNavListRedirect = (event, url) => {
    event.preventDefault()
    handleCloseNavMenu()
    navigate(url)
  }

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography onClick={event => handleRedirect(event, '/profile')}>
            <IconButton sx={{
              display: { xs: 'none', md: 'flex' },
              color: 'white',
              textDecoration: 'none',
            }}
            ><RedditIcon />Greddiit</IconButton>
          </Typography>

          {
            user ?
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem>
                    <Typography textAlign='center' onClick={event => handleNavListRedirect(event, '/mysubgreddiits')}>My Subgreddiits</Typography>
                  </MenuItem>
                  {
                    mySubPageMatch ?
                      mySubPages.map(page =>
                        <MenuItem key={page.url}>
                          <Typography textAlign='center' onClick={event => handleNavListRedirect(event, page.url)}>{page.name}</Typography>
                        </MenuItem>
                      )
                      : null
                  }
                  <MenuItem>
                    <Typography textAlign='center' onClick={event => handleNavListRedirect(event, '/allsubgreddiits')}>All Subgreddiits</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign='center' onClick={event => handleNavListRedirect(event, '/savedposts')}>Saved Posts</Typography>
                  </MenuItem>
                </Menu>
              </Box> : null
          }

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={event => handleRedirect(event, '/profile')}
          >
            Greddiit
          </Typography>

          {
            user ?
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={event => handleRedirect(event, '/mysubgreddiits')}
                  sx={{ my: 2, ml: 1, color: 'white' }} startIcon={<LineWeightIcon />}
                >
                  My Subgreddiits
                </Button>
                {
                  mySubPageMatch ?
                    <>
                      <Button
                        onClick={event => handleRedirect(event, `/mysubgreddiits/${subId}/users`)}
                        sx={{ my: 2, ml: 1, color: 'white' }} startIcon={<GroupIcon />}
                      >
                        Users
                      </Button>
                      <Button
                        onClick={event => handleRedirect(event, `/mysubgreddiits/${subId}/requests`)}
                        sx={{ my: 2, ml: 1, color: 'white' }} startIcon={<PendingActionsIcon />}
                      >
                        Join Requests
                      </Button>
                      <Button
                        onClick={event => handleRedirect(event, `/mysubgreddiits/${subId}/stats`)}
                        sx={{ my: 2, ml: 1, color: 'white' }} startIcon={<BarChartIcon />}
                      >
                        Stats
                      </Button>
                      <Button
                        onClick={event => handleRedirect(event, `/mysubgreddiits/${subId}/reports`)}
                        sx={{ my: 2, ml: 1, color: 'white' }} startIcon={<ReportIcon />}
                      >
                        Reports
                      </Button>
                    </>
                    : null
                }
                <Button
                  onClick={event => handleRedirect(event, '/allsubgreddiits')}
                  sx={{ my: 2, ml: 1, color: 'white' }} startIcon={<ListAltIcon />}
                >
                  All Subgreddiits
                </Button>
                <Button
                  onClick={event => handleRedirect(event, '/savedposts')}
                  sx={{ my: 2, ml: 1, color: 'white' }} startIcon={<BookmarkAddedIcon />}
                >
                  Saved Posts
                </Button>
              </Box> : null
          }
          {
            user ?
              <Button sx={{ my: 2, color: 'white' }} endIcon={<LogoutIcon />} onClick={handeLogout}>
                Logout
              </Button> :
              null
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export { Navbar }