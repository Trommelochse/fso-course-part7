import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken
}
const getAll = async () => {
  return await axios.get(baseUrl)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  }
  return await axios.post(baseUrl, blog, config)
}
const update = async (blog) => {
  blog.user = blog.user.id
  return await axios.put(`/api/blogs/${blog.id}`, blog)
}

const createComment = async (blogId, comment) => {
  return await axios.post(`/api/blogs/${blogId}/comments`, { comment })
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  }
  return await axios.delete(`/api/blogs/${id}`, config)
}

export default { setToken, getAll, create, update, createComment, remove }
