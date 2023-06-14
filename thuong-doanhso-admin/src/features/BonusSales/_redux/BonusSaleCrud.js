import axiosClient from "../../../redux/axioClient";

const BONUS_STAFF_URL = "/api/v3/orderbonus?cmd=calc";
const fakeToken =
  window?.top?.token ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJVc2VyRW50IiwiSUQiOiIxIiwiVG9rZW5JZCI6IjEwMzExNDEwMzQ1MCIsIm5iZiI6MTY4NjcwNzI5NSwiZXhwIjoxNjg3MzEyMDk1LCJpYXQiOjE2ODY3MDcyOTV9.DIbqovrlyjf5Hr_U00XA_6wnuxhi8fdCZlUeaT9syQA";
const ConfigGlobal = {
  headers: {
    Authorization: "Bearer " + fakeToken,
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
