import axiosClient from "../../../redux/axioClient";

const BONUS_STAFF_URL = "/api/v3/orderbonus?cmd=calc";
const fakeToken =
  window?.top?.token ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJVc2VyRW50IiwiSUQiOiIxIiwiVG9rZW5JZCI6IjEwMjAxMDMwMTAyMDIzMjMiLCJuYmYiOjE2NzUxNDA4ODksImV4cCI6MTY3NTc0NTY4OSwiaWF0IjoxNjc1MTQwODg5fQ.HsZ-p8ZhFjuLDHyiYZp-FHoFDw8ahSfOr4NOTcNPBKQ";
const ConfigGlobal = {
  headers: {
    Authorization: "Bearer " + window?.top?.token,
  },
};
const getOrderItem = (data) => {
  return axiosClient.post(
    `${BONUS_STAFF_URL}`,
    JSON.stringify(data),
    ConfigGlobal
  );
};
const postOrderItem = (data) => {
  return axiosClient.post(
    `${BONUS_STAFF_URL}`,
    JSON.stringify(data),
    ConfigGlobal
  );
};

const BonusSaleCrud = {
  getOrderItem,
  postOrderItem,
};
export default BonusSaleCrud;
