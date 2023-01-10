import http from './configs/http'

const worksheetApi = {
  getAllWorkSheet: data => {
    return http.post('/api/v3/userwork23@workList', JSON.stringify(data))
  },
  checkinWorkSheet: data => {
    return http.post('/api/v3/userwork23@sysCheckin', JSON.stringify(data))
  },
  addWorkOff: data => {
    return http.post('/api/v3/userwork23@workoffs', JSON.stringify(data))
  },
  deleteWorkOff: data => {
    return http.post('/api/v3/userwork23@workoffs-delete', JSON.stringify(data))
  }
}
export default worksheetApi
