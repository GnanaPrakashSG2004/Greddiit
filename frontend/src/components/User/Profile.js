import { useEffect, useState } from 'react'
import { getUserFields, updateUser } from '../../services/userFields'
import { Followers, Following } from './Follower'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [password, setPassword] = useState('')
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [initialUser, setInitialUser] = useState({})

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [userNameError, setUserNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [contactNumberError, setContactNumberError] = useState(false)

  const [saveDisable, setSaveDisable] = useState(false)
  const [buttonType, setButtonType] = useState(true)

  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const firstNameChange = event => setFirstName(event.target.value)
  const lastNameChange = event => setLastName(event.target.value)
  const userNameChange = event => setUserName(event.target.value)
  const emailChange = event => setEmail(event.target.value)
  const ageChange = event => setAge(event.target.value)
  const contactNumberChange = event => setContactNumber(event.target.value)
  const passwordChange = event => setPassword(event.target.value)

  const firstNameBlur = event => !event.target.value ? setFirstNameError(true) : setFirstNameError(false)
  const lastNameBlur = event => !event.target.value ? setLastNameError(true) : setLastNameError(false)
  const userNameBlur = event => !event.target.value ? setUserNameError(true) : setUserNameError(false)
  const emailBlur = event => !event.target.value ? setEmailError(true) : setEmailError(false)
  const ageBlur = event => !event.target.value ? setAgeError(true) : setAgeError(false)
  const contactNumberBlur = event => !event.target.value ? setContactNumberError(true) : setContactNumberError(false)

  const useEffectHook = () => {
    const getUserDetails = async () => {
      setSaveDisable(true)
      const userDetails = await getUserFields()
      setSaveDisable(false)
      setFirstName(userDetails.firstName)
      setLastName(userDetails.lastName)
      setUserName(userDetails.userName)
      setEmail(userDetails.email)
      setAge(userDetails.age)
      setContactNumber(userDetails.contactNumber)
      setFollowers(userDetails.followers)
      setFollowing(userDetails.following)
      setInitialUser(userDetails)
    }

    getUserDetails()
  }

  useEffect(useEffectHook, [])

  const onEdit = async event => {
    event.preventDefault()

    if (!buttonType) {
      const updatedUser = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        age: age,
        contactNumber: contactNumber,
        password: password,
        followers: followers,
        following: following
      }

      try {
        setSaveDisable(true)
        await updateUser(user.token, updatedUser)
        setSaveDisable(false)
        setPassword('')
      } catch (exception) {
        setSaveDisable(false)
      }
    }

    setButtonType(!buttonType)
  }

  const onCancel = event => {
    event.preventDefault()
    setButtonType(true)

    setFirstName(initialUser.firstName)
    setLastName(initialUser.lastName)
    setUserName(initialUser.userName)
    setEmail(initialUser.email)
    setAge(initialUser.age)
    setContactNumber(initialUser.contactNumber)
    setFollowers(initialUser.followers)
    setFollowing(initialUser.following)
    setPassword('')

    setFirstNameError(false)
    setLastNameError(false)
    setUserNameError(false)
    setEmailError(false)
    setAgeError(false)
    setContactNumberError(false)
  }

  return (
    <div>
      {
        initialUser.userName ?
          <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography component='h1' variant='h5'>User Profile</Typography>
                <Box component='form' noValidate onSubmit={onEdit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth id='firstName' label='First Name' name='firstName' autoComplete='given-name' InputProps={{ readOnly: buttonType }}
                        value={firstName} onChange={firstNameChange} helperText={firstNameError ? 'First Name is a required field' : ''} error={firstNameError} onBlur={firstNameBlur} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth id='lastName' label='Last Name' name='lastName' autoComplete='family-name' InputProps={{ readOnly: buttonType }}
                        value={lastName} onChange={lastNameChange} helperText={lastNameError ? 'Last Name is a required field' : ''} error={lastNameError} onBlur={lastNameBlur} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField required fullWidth id='age' label='Age' name='age' autoComplete='age' InputProps={{ readOnly: buttonType }}
                        value={age} onChange={ageChange} helperText={ageError ? 'Age is a required field' : ''} error={ageError} onBlur={ageBlur} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField required fullWidth id='contactNumber' label='Contact Number' name='contactNumber' autoComplete='tel-national' InputProps={{ readOnly: buttonType }}
                        value={contactNumber} onChange={contactNumberChange} helperText={contactNumberError ? 'Contact Number is a required field' : ''} error={contactNumberError} onBlur={contactNumberBlur} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required fullWidth id='userName' label='Username' name='username' autoComplete='username' InputProps={{ readOnly: true }}
                        value={userName} onChange={userNameChange} helperText={userNameError ? 'Username is a required field' : ''} error={userNameError} onBlur={userNameBlur} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required fullWidth id='email' label='Email Address' name='email' autoComplete='email' InputProps={{ readOnly: buttonType }}
                        value={email} onChange={emailChange} helperText={emailError ? 'Email is a required field' : ''} error={emailError} onBlur={emailBlur} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required fullWidth name='password' label='Password' type='password' id='password' autoComplete='new-password' InputProps={{ readOnly: buttonType }}
                        value={password} onChange={passwordChange} />
                    </Grid>
                  </Grid>
                  <Button fullWidth type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}
                    disabled={(!firstName || !lastName || !userName || !email || (age.toString() === '') || !contactNumber || saveDisable) && !buttonType}>{buttonType ? 'Edit' : 'Save'}</Button>
                  {!buttonType ? <Button fullWidth type='button' variant='contained' sx={{ mt: 3, mb: 2 }} onClick={onCancel}>Cancel</Button> : null}
                </Box>
              </Box>
              <Followers initialUser={initialUser} setInitialUser={setInitialUser} />
              <Following initialUser={initialUser} setInitialUser={setInitialUser} />
            </Container>
          </ThemeProvider> : null
      }
    </div>
  )
}

export { Profile }