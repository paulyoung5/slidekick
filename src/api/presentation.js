import axios from '@/api'

export const getPresentation = (id, success, failure) =>
  axios.get(`/presentations/${id}`).then(success).catch(failure)

export const getPresentations = (success, failure) =>
  axios.get('/presentations').then(success).catch(failure)

export const savePresentation = (presentation, success, failure) => {
  if (presentation.id) {
    // Updating existing presentation
    return axios.put(`/presentations/${presentation.id}`, presentation).then(success).catch(failure)
  }
  // Create new presentation
  return axios.post('/presentations', presentation).then(success).catch(failure)
}

export const deletePresentation = (id, success, failure) =>
  axios.delete(`/presentations/${id}`).then(success).catch(failure)
