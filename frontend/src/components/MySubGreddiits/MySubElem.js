import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteMySubGreddiit } from '../../services/subgreddiits'

const MySubElem = ({ mySub }) => {
  const [open, setOpen] = useState(false)
  const [allDisable, setAllDisable] = useState(false)
  
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))  
  const navigate = useNavigate()

  const onClose = () => setOpen(false)

  const onDelete = async () => {
    setOpen(false)
    setAllDisable(true)
    await deleteMySubGreddiit(user.token, mySub.id)
    setAllDisable(false)
  }

  return (
    <Card variant='outlined'>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the subgreddiit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Typography variant='h5' component='div'>{mySub.name}</Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>{mySub.description}</Typography>
        <Typography variant='body2'>Number of user(s) in subgreddiit: {mySub.members.length + 1}</Typography>
        <Typography variant='body2'>Number of post(s) in subgreddiit: {mySub.posts.length}</Typography>
        <div>
          <Typography variant='body2'>
            Banned keywords:<br />
            {mySub.bannedKeywords.join(', ')}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size='small' variant='outlined' onClick={() => navigate(`/mysubgreddiits/${mySub.id}`)} disabled={allDisable}>Open</Button>
        <Button size='small' variant='outlined' color='error' disabled={allDisable} onClick={() => setOpen(true)}>Delete</Button>
      </CardActions>
    </Card>
  )
}

export { MySubElem }