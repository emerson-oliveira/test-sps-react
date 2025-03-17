import api from "./api";

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default class AuthService {
  static async login({ email, password }) {
    const response = await api.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    return response.data;
  }
}
