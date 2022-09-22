import http from './configs/http'

const telesalesApi = {
  getListMemberTelesales: data => {
    return http.post('/api/v3/tele23@member_search', JSON.stringify(data))
  },
  setUserIDTelesales: data => {
    return http.post(
      '/api/v3/tele23@member_setTeleUserID',
      JSON.stringify(data)
    )
  },
  getMemberIDTelesales: MemberID => {
    return http.get(`/api/v3/tele23@member_id?memberid=${MemberID}`)
  }
}
export default telesalesApi
