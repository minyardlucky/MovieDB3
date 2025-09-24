import { jwtDecode } from "jwt-decode";

const checkIfUserIsAuth = () => {
  // get token
  const token = window.localStorage.getItem("jwt");

  if (!token) {
    return false; // no token = not logged in
  }

  try {
    const decoded = jwtDecode(token);

    // check if expired
    if (decoded.exp && decoded.exp > Date.now() / 1000) {
      return true; // valid
    } else {
      return false; // expired
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return false; // invalid token
  }
};

export default checkIfUserIsAuth;