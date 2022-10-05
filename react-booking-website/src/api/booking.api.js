import http from './configs/http'

const bookingApi = {
  getStock: () => {
    return http.get('/api/v3/web?cmd=getStock')
  }
}

export default bookingApi
