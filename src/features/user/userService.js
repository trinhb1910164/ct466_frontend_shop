import axios from "axios";
import { base_url, config } from "../../utils/axiosconfig";

const register=async(userData)=>{
    const response = await axios.post(`${base_url}user/register`, userData);
    if(response.data){
        return response.data;
    }
}

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  return response.data;
};
const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
      return response.data;
  }
};
const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};

const removeCart = async (id) => {
  const response = await axios.delete(`${base_url}user/cart/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const updateCart = async (cartDetail) => {
  const response = await axios.delete(`${base_url}user/cart/${cartDetail.cartId}/${cartDetail.quantity}`, config);
  if (response.data) {
    return response.data;
  }
};
const createOrder=async(orderData)=>{
  const response = await axios.post(`${base_url}user/cart/create-order`, orderData, config);
  if(response.data){
      return response.data;
  }
};
const saveAddress = async (userDetail) => {
  const response = await axios.put(`${base_url}user/address/user-address`, userDetail, config);
  if (response.data) {
    return response.data;
  }
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-orders`, config);
  if (response.data) {
    return response.data;
  }
};

export const authService={
    register,
    login,
    addToCart,
    getCart,
    removeCart,
    updateCart,
    createOrder,
    saveAddress,
    getOrders
}