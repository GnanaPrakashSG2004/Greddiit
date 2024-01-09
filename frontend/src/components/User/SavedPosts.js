import { useEffect, useState } from 'react'
import { getUserFields } from '../../services/userFields'
import { Post } from '../Post'

import Grid from '@mui/material/Grid'

const SavedPosts = () => {
  const [userDetails, setUserDetails] = useState({})

  useEffect(
    () => {
      const getUserData = async () => {
        const userData = await getUserFields()
        setUserDetails(userData)
      }
      getUserData()
    }, []
  )

  return (
    <>
      {
        userDetails.id ?
          <Grid container spacing={2}>
            {
              userDetails.saved
                .map(savedPost => <Grid key={savedPost.id} item xs={11}><Post post={savedPost} /></Grid>)
            }
          </Grid>
          : null
      }
    </>
  )
}

export { SavedPosts }