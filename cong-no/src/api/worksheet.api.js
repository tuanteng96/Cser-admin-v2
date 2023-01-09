import http from './configs/http'

const worksheetApi = {
  getAllWorkSheet: data => {
    return http.post('/api/v3/userwork23@workList', JSON.stringify(data))
  }
}
export default worksheetApi
