import axios from "axios";

// const url = "https://limitless-sands-86427.herokuapp.com";
const url = "http://127.0.0.1:8000";

const UserModel = {
  id: "",
  username: "",
  token: "",
};

class AuthService {
  setUserInLocalStorage(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  async login(username, password) {
    const response = await axios.post(url + "/api/users/auth/", {
      username,
      password,
    });
    if (!response.data.token) {
      return response.data;
    }
    this.setUserInLocalStorage(response.data);
    return response.data;
  }

  async register(username, password, email, phone_number) {
    const response = await axios.post(
      url + "/api/users/",
      {
        username,
        password,
        email,
        phone_number,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    return user;
  }
}

export default new AuthService();