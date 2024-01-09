import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import PersonIcon from '@mui/icons-material/Person'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import { updateUser, updateFollowerByID, updateFollowingByID } from '../../services/userFields'

const Followers = ({ initialUser, setInitialUser }) => {
  const [open, setOpen] = useState(false)
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const handleClick = () => {
    setOpen(!open)
  }

  const removeFollower = async deleteFollower => {
    const finalUser = { ...initialUser }
    finalUser.followers = initialUser.followers.filter(follower => follower.id.toString() !== deleteFollower.id.toString())
    await updateUser(user.token, finalUser)
    setInitialUser(finalUser)
    await updateFollowerByID(user.token, deleteFollower.id)
  }

  const followerCount = () => `Followers: ${initialUser.followers.length}`

  return (
    <div>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            List of Followers
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <RecentActorsOutlinedIcon /><ArrowForwardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={followerCount()} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {
              initialUser.followers.map(
                follower => (
                  <List key={follower.id}>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={follower.userName} />
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                      <Button variant='filled' endIcon={<DeleteIcon />} onClick={() => removeFollower(follower)}>Remove</Button>
                    </ListItem>
                  </List>
                )
              )
            }
          </List>
        </Collapse>
      </List>
    </div>
  )
}

const Following = ({ initialUser, setInitialUser }) => {
  const [open, setOpen] = useState(false)
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const handleClick = () => setOpen(!open)

  const removeFollowing = async deleteFollowing => {
    const finalUser = { ...initialUser, following: initialUser.following.filter(following => following.id.toString() !== deleteFollowing.id.toString()) }
    await updateUser(user.token, finalUser)
    setInitialUser(finalUser)
    await updateFollowingByID(user.token, deleteFollowing.id)
  }

  const followingCount = () => `Following: ${initialUser.following.length}`

  return (
    <div>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            List of Following users
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <RecentActorsOutlinedIcon /><ArrowBackOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={followingCount()} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {
              initialUser.following.map(
                following => (
                  <List key={following.id}>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={following.userName} />
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                      <Button variant='filled' endIcon={<PersonRemoveIcon />} onClick={() => removeFollowing(following)}>Unfollow</Button>
                    </ListItem>
                  </List>
                )
              )
            }
          </List>
        </Collapse>
      </List>
    </div>
  )
}

export { Followers, Following }