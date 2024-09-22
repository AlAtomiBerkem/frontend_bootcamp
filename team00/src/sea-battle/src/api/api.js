import axios from "axios";

export const registerUser = async (login, name, password) => {
  try {
    const response = await axios.post("http://localhost:3001/api/signup", {
      login,
      name,
      password,
    });
    console.log("User registered:", response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const authUser = async (login, password) => {
  try {
    const response = await axios.post("http://localhost:3001/api/signin", {
      login,
      password,
    });
    console.log("User authorized:", response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error("Error authorization user:", error);
    throw error;
  }
};
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getUserByLogin = async (login) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/users/login/${login}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
