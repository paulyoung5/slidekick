import axios from '@/api'

console.log(axios)

export const getPresentation = (id, success, failure) =>
  axios.get(`/presentations/${id}`).then(success).catch(failure)

export const savePresentation = (presentation, success, failure) => {
  if (presentation.id) {
    return axios.post(`/presentations/${presentation.id}`, presentation)
      .then(success).catch(failure)
  }
  return axios.post('/presentations/new', presentation).then(success).catch(failure)
}

export default {
<<<<<<< HEAD
  getPresentation (id) {
    return axios.get(`/presentations/${id}`).then(({data}) => data.presentation)
  },
  getPresentationsForUser () {
    return axios.get('/presentations')
  },
  createPresentation (title) {
    return axios.post('/presentations/new', {title})
  }
}
