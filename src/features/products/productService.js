import axios from "axios";
import { base_url, config } from "../../utils/axiosconfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const getAProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);

  return response.data;
};

const rating = async (ratingData) => {
  const response = await axios.put(`${base_url}product/rating/`, ratingData, config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};


const productService = {
  getProducts,
  getAProduct,
  rating,
};

export default productService;
