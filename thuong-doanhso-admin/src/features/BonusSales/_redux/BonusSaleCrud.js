import axiosClient from "../../../redux/axioClient";

const BONUS_STAFF_URL = "/api/v3/orderbonus?cmd=calc";
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
