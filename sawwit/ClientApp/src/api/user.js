import axios from "axios";

// prettier-ignore
export async function createAccount(firstName, lastName, email, username, password) {
  return await axios({
    method: "post",
    url: `api/user/register`,
    data: {
      firstName,
      lastName,
      email,
      username,
      password
    },
  });
}


export async function login(email, password) {
  return await axios({
    method: "post",
    url: `api/user/login`,
    data: {
      email,
      password
    },
  });
}
