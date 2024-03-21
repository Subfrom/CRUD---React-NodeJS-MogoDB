import axios from "axios";

export const list = async (authtoken) =>
  await axios.get(
    process.env.REACT_APP_API + "/users",
    { headers: { authtoken } }
  );

export const updateRole = async (authtoken, data) =>
  await axios.post(
    process.env.REACT_APP_API + "/updaterole",
    { data },
    { headers: { authtoken } }
  );
