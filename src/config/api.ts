import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    // const token = useAuthStore.getState().token
    // const company = useAuthStoreCompany.getState().company

    // if (token) {
    //   config.headers.set('Authorization', `Bearer ${token}`)
    // }
    // if (company) {
    //   config.headers.set('x-company-id', company.id)
    // }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  // (error) => {
  //   if (error.response.status === 401) {
  //     useAuthStore.getState().logout()
  //     useAuthStoreCompany.getState().logoutCompany()
  //   }
  //   return Promise.reject(error)
  // },
)

export default api
