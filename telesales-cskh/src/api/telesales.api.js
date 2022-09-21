import http from './configs/http'

const telesalesApi = {
  getListMemberTelesales: data => {
    return http.post('/api/v3/tele23@member_search', JSON.stringify(data))
  }
}
export default telesalesApi
