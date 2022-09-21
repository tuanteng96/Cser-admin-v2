import http from './configs/http'

const moreApi = {
  getProductService: key => {
    return http.get(
      `/api/gl/select2?cmd=prod&cate_name=san_pham,dich_vu&ignore_all=1&q=${key}`
    )
  },
  getAllStaffs: key => {
    return http.get(`/api/gl/select2?cmd=user&q=${key}`)
  }
}
export default moreApi
