import http from './configs/http'

const bookingApi = {
  getStock: () => {
    return http.get('/api/v3/web?cmd=getStock')
  },
  getService: ({ StockID = '', MemberID = '', Ps = 10, Pi = 1, Key = '' }) => {
    return http.get(
      `/api/v3/mbook?cmd=getroot&memberid=${MemberID}&ps=${Ps}&pi=${Pi}&key=${Key}&stockid=${StockID}`
    )
  }
}

export default bookingApi
