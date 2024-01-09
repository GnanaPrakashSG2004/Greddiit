import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import { useState } from 'react'
import { createNewPost } from '../../services/posts'
import { getMySubGreddiitPage } from '../../services/subgreddiits'

const NewPost = ({subPage, userToken, setSubPage}) => {
  const [open, setOpen] = useState(false)
  const [postText, setPostText] = useState('')
  const [textError, setTextError] = useState(false)
  const [createDisable, setCreateDisable] = useState(false)

  const addPost = async () => {
    const post = {
      text: postText,
      subId: subPage.id,
      upvotes: 0,
      downvotes: 0
    }

    let alertFlag = false

    subPage.bannedKeywords.forEach(word => {
      const bannedRegex = new RegExp(`\\b${word}\\b`, 'gi')
      alertFlag |= bannedRegex.test(post.text)
    })

    if (alertFlag)
      alert('Your post contains words that are banned in this subgreddiit')

    setCreateDisable(true)
    await createNewPost(userToken, post)
    setCreateDisable(false)

    setPostText('')
    setTextError(false)
    
    const newSubPage = await getMySubGreddiitPage(userToken, subPage.id)
    setOpen(false)
    setSubPage(newSubPage)
  }

  const onCancel = () => {
    setTextError(false)
    setPostText('')
    setOpen(false)
  }

  const handleTextChange = event => {
    setPostText(event.target.value)
    if (event.target.value) setTextError(false)
  }

  return (
    <>
      <Fab variant='extended' size='medium' color='primary' aria-label='New Post' sx={{ position: 'sticky', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}>
        <AddIcon sx={{ mr: 1 }} />New Post
      </Fab>
      <Dialog open={open} onClose={onCancel} fullWidth>
        <DialogContent>
          <DialogContentText>
            Provide text to add to the post
          </DialogContentText>
          <TextField
            id='textPost'
            label='Post Text'
            type='text'
            fullWidth
            variant='outlined'
            multiline
            sx={{ mt: 1 }}
            onChange={handleTextChange}
            onBlur={() => !postText ? setTextError(true) : setTextError(false)}
            error={textError}
            helperText={textError ? 'Text to include in the post cannot be empty' : ''}
            value={postText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={addPost} disabled={!postText || createDisable}>Create Post</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { NewPost }