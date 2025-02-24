import api from "./api";

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default class UserService {
  static async list() {
    const response = await api.get(`${baseUrl}/users`);
    return response.data;
  }

  static async get({ id }) {
    const response = await api.get(`${baseUrl}/users/${id}`);
    return response.data;
  }

  static async create(data) {
    const response = await api.post(`${baseUrl}/users`, data);
    return response.data;
  }

  static async update({ id, data }) {
    const response = await api.put(`${baseUrl}/users/${id}`, data);
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete(`${baseUrl}/users/${id}`);
    return response.data;
  }
}