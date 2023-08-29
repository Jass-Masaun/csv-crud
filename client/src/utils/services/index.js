import axios from "axios";
import { BASE_URL } from "../constants";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

const getData = async (endpoint) => {
  try {
    const response = await axiosClient.get(endpoint);
    return { status: true, data: response.data };
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message,
      error: error?.response?.data || error,
    };
  }
};

const postData = async (endpoint, payload) => {
  try {
    const response = await axiosClient.post(endpoint, payload);
    return { status: true, data: response.data };
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message,
      error: error?.response?.data || error,
    };
  }
};

const putData = async (endpoint, payload) => {
  try {
    const response = await axiosClient.put(endpoint, payload);
    return { status: true, data: response.data };
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message,
      error: error?.response?.data || error,
    };
  }
};

const deleteData = async (endpoint, payload) => {
  try {
    const response = await axiosClient.delete(endpoint, payload);
    return { status: true, data: response.data };
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message,
      error: error?.response?.data || error,
    };
  }
};

export { getData, postData, putData, deleteData };
