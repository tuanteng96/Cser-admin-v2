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
  },
  editTagsMember: data => {
    return http.post('/api/v3/tele23@edit_tags', JSON.stringify(data))
  },
  editNoteMember: data => {
    return http.post('/api/v3/tele23@edit_note', JSON.stringify(data))
  },
  getListBuydingProduct: ({ MemberID, pi, ps }) => {
    return http.get(
      `/api/v3/member23?cmd=da_mua&memberid=${MemberID}&pi=${pi}&ps=${ps}`
    )
  },
  getHisUseServices: MemberID => {
    return http.get(
      `/services/preview.aspx?a=1&cmd=loadOrderService&MemberID=${MemberID}&IsMember=0&fromOrderAdd=0`
    )
  },
  getListProductInDate: data => {
    return http.post('/api/v3/tele23@prods_indate', JSON.stringify(data))
  },
  addWishListMember: data => {
    return http.post('/api/v3/tele23@member_wishlist', JSON.stringify(data))
  },
  getWishListMember: data => {
    return http.post(
      '/api/v3/tele23@member_wishlist_list',
      JSON.stringify(data)
    )
  },
  addCareHistory: data => {
    return http.post('/api/v3/tele23@edit_tele', JSON.stringify(data))
  },
  getCareHistory: data => {
    return http.post('/api/v3/tele23@list_tele', JSON.stringify(data))
  }
}
export default telesalesApi
