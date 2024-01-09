import axios from 'axios'
const mysubgreddiitsUrl = '/api/mysubgreddiits'
const allsubgreddiitsUrl = '/api/allsubgreddiits'

const createMySubgreddiit = async (userToken, mysubgreddiit) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(mysubgreddiitsUrl, mysubgreddiit, config)
  return response.data
}

const getAllMySubGreddiits = async userToken => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(mysubgreddiitsUrl, config)
  return response.data
}

const getMySubGreddiitPage = async (userToken, subId) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(`${mysubgreddiitsUrl}/${subId}`, config)
  return response.data
}

const getMySubGreddiitPageReports = async (userToken, subId) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(`${mysubgreddiitsUrl}/${subId}/reports`, config)
  return response.data
}

const getAllSubGreddiits = async userToken => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(allsubgreddiitsUrl, config)
  return response.data
}

const getAllSubGreddiitPage = async (userToken, id) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(`${allsubgreddiitsUrl}/${id}`, config)
  if (response.status === 200 && response.data)
    return response.data
  else
    return response.error
}

const addJoinRequest = async (userToken, id) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${mysubgreddiitsUrl}/${id}/requests`, null, config)
  return response.data
}

const handleJoinRequest = async (userToken, subId, action) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${mysubgreddiitsUrl}/${subId}/requests`, action, config)
  return response.data
}

const leaveSubGreddiit = async (userToken, subId) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${mysubgreddiitsUrl}/${subId}`, null, config)
  return response.data
}

const deleteMySubGreddiit = async (userToken, subId) => {
  const token = `bearer ${userToken}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${mysubgreddiitsUrl}/${subId}`, config)
  return response.data
}

const savedImageUrl = async formData => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }
  const response = await axios.post(`${process.env.REACT_APP_CLOUDINARY_URL}/image/upload`, formData, config)
  return response.data.url
}

export { createMySubgreddiit, getAllMySubGreddiits, getMySubGreddiitPage, getAllSubGreddiits, getAllSubGreddiitPage, addJoinRequest, handleJoinRequest, getMySubGreddiitPageReports, leaveSubGreddiit, deleteMySubGreddiit, savedImageUrl }