import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { InputAdornment } from '@mui/material'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import { createMySubgreddiit, getAllMySubGreddiits, savedImageUrl } from '../../services/subgreddiits'
import { MySubElem } from './MySubElem'

const theme = createTheme()

const MySubGreddiit = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [ban, setBan] = useState('')
  const [banned, setBanned] = useState([])
  const [imageUrl, setImageUrl] = useState()

  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [tagsError, setTagsError] = useState(false)
  const [bannedError, setBannedError] = useState(false)
  const [tagHelperText, setTagHelperText] = useState('')
  const [banHelperText, setBanHelperText] = useState('')
  const [invalidBanError, setInvalidBanError] = useState(false)
  const [invalidTagError, setInvalidTagError] = useState(false)

  const [createDisable, setCreateDisable] = useState(false)
  const [newDisable, setNewDisable] = useState(false)

  const [mySubs, setMySubs] = useState([])

  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const useEffectFn = () => {
    const getAllMySub = async () => {
      const mySubsList = await getAllMySubGreddiits(user.token)
      setMySubs(mySubsList)
    }

    getAllMySub()
  }

  useEffect(useEffectFn, [user.token, newDisable])

  const createSubgreddiit = async event => {
    event.preventDefault()

    const newMySubgreddiit = {
      name: name,
      description: description,
      tags: tags,
      bannedKeywords: banned,
      imageUrl: imageUrl
    }

    try {
      setCreateDisable(true)
      await createMySubgreddiit(user.token.toString(), newMySubgreddiit)
      setCreateDisable(false)
    } catch (exception) {
      setCreateDisable(false)
    }

    setName('')
    setDescription('')
    setTag('')
    setTags([])
    setBan('')
    setBanned([])
    setImageUrl('')

    setNameError(false)
    setDescriptionError(false)
    setTagsError(false)
    setBannedError(false)
    setTagHelperText('')
    setBanHelperText('')
    setInvalidTagError(false)
    setInvalidBanError(false)

    setNewDisable(!newDisable)
  }

  const addTag = (event, tagName) => {
    event.preventDefault()

    if (tagName.trim().indexOf(' ') !== -1 || tagName !== tagName.toLowerCase()) {
      setTagsError(false)
      setInvalidTagError(true)
      setTagHelperText('Tags must contain a single lower case word')
    } else {
      if (tagName && !tags.find(tag => tag === tagName))
        setTags(tags.concat(tagName))
      setTag('')
      setTagsError(false)
      setTagHelperText('')
      setInvalidTagError(false)
    }
  }

  const removeTag = (event, tagName) => {
    event.preventDefault()
    setTags(tags.filter(tag => tag !== tagName))
  }

  const addBan = (event, banName) => {
    event.preventDefault()

    if (banName.trim().indexOf(' ') !== -1) {
      setBannedError(false)
      setInvalidBanError(true)
      setBanHelperText('Banned words must be a single word')
    } else {
      if (banName && !banned.find(ban => ban === banName))
        setBanned(banned.concat(banName))
      setBan('')
      setBannedError(false)
      setBanHelperText('')
      setInvalidBanError(false)
    }
  }

  const removeBan = (event, banName) => {
    event.preventDefault()
    setBanned(banned.filter(ban => ban !== banName))
  }

  const onCancel = event => {
    event.preventDefault()

    setName('')
    setDescription('')
    setTag('')
    setTags([])
    setBan('')
    setBanned([])
    setImageUrl('')

    setNameError(false)
    setDescriptionError(false)
    setTagsError(false)
    setBannedError(false)
    setInvalidTagError(false)
    setInvalidBanError(false)

    setNewDisable(!newDisable)
  }

  const nameChange = event => setName(event.target.value)
  const nameBlur = event => !event.target.value ? setNameError(true) : setNameError(false)
  const descriptionChange = event => setDescription(event.target.value)
  const descriptionBlur = event => !event.target.value ? setDescriptionError(true) : setDescriptionError(false)
  const tagChange = event => setTag(event.target.value)
  const tagsBlur = () => !tags.length && !invalidTagError ? setTagsError(true) : setTagsError(false)
  const banChange = event => setBan(event.target.value)
  const bannedBlur = () => !banned.length && !invalidBanError ? setBannedError(true) : setBannedError(false)

  const uploadImage = async event => {
    const image = event.target.files[0]

    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_NAME)

      setCreateDisable(true)
      const savedUrl = await savedImageUrl(formData)
      setImageUrl(savedUrl)
      setCreateDisable(false)
    } else setImageUrl()
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
            <Button type='button' variant='contained' sx={{ mt: 3, mb: 2 }} disabled={newDisable} onClick={() => setNewDisable(!newDisable)} endIcon={<AddIcon />}>New</Button>
            {
              newDisable ?
                <Box component='form' onSubmit={createSubgreddiit} noValidate sx={{ mt: 1 }}>
                  <TextField margin='normal' required fullWidth name='name' label='Name' id='name' value={name} onChange={nameChange}
                    helperText={nameError ? 'Name is a required field' : ''} error={nameError} onBlur={nameBlur} />
                  <TextField margin='normal' required fullWidth name='description' label='Description' id='description' value={description} onChange={descriptionChange}
                    helperText={descriptionError ? 'Description is a required field' : ''} error={descriptionError} onBlur={descriptionBlur} />
                  <List component='div'>
                    <Stack direction='row' sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {
                        tags.map(
                          tag => (
                            <Chip key={tag} label={tag} onDelete={event => removeTag(event, tag)} />
                          ))
                      }
                    </Stack>
                  </List>
                  <TextField margin='normal' required fullWidth name='tags' label='Tags' id='tag' value={tag} onChange={tagChange}
                    helperText={tagsError ? 'Atleast one tag is required' : (invalidTagError ? tagHelperText : '')} error={tagsError || invalidTagError} onBlur={tagsBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Button variant='filled' endIcon={<AddIcon />} onClick={event => addTag(event, tag)} />
                        </InputAdornment>
                      )
                    }} />
                  <List component='div'>
                    <Stack direction='row' sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {
                        banned.map(
                          ban => (
                            <Chip key={ban} label={ban} onDelete={event => removeBan(event, ban)} />
                          ))
                      }
                    </Stack>
                  </List>
                  <TextField margin='normal' required fullWidth name='ban' label='Banned Keywords' id='ban' value={ban} onChange={banChange}
                    helperText={bannedError ? 'Atleast one banned keyword is required' : (invalidBanError ? banHelperText : '')} error={bannedError || invalidBanError} onBlur={bannedBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Button variant='filled' endIcon={<AddIcon />} onClick={event => addBan(event, ban)} />
                        </InputAdornment>
                      )
                    }} />
                  <Button fullWidth variant='outlined' sx={{ mt: 1, mb: 1 }} component='label' disabled={createDisable}>
                    Upload <PhotoCamera />
                    <input hidden accept='image/*' type='file' onChange={event => uploadImage(event)} />
                  </Button>
                  {
                    imageUrl && <img src={imageUrl} alt='Uploaded img' width='100%'/>
                  }
                  <Button type='submit' variant='contained' sx={{ width: '40%', mt: 2, mb: 2, mr: 1 }} disabled={!name || !description || !tags.length || !banned.length || createDisable}>Create</Button>
                  <Button type='submit' variant='contained' sx={{ width: '40%', mt: 2, mb: 2 }} disabled={createDisable} onClick={onCancel}>Cancel</Button>
                </Box>
                : null
            }
          </Box>
        </Container>
        <Grid container spacing={2}>
          {mySubs.map(mySub => <Grid item xs={2} sm={4} md={4} key={mySub.id}><MySubElem mySub={mySub} /></Grid>)}
        </Grid>
      </ThemeProvider>
    </div >
  )
}

export { MySubGreddiit }