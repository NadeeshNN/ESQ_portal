// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  const accessToken = localStorage.getItem("AccessToken");
  if (userStr && accessToken) return userStr;
  else return null;
};

// return the token from the session storage
// export const getToken = () => {
//   return localStorage.getItem("token") || null;
// };

// remove the token and user from the session storage
export const removeUserSession = () => {
  // localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};

// set the token and user from the session storage
// export const setUserSession = (token, user) => {
export const setUserSession = (user) => {
  localStorage.setItem("user", user);
  sessionStorage.setItem("user", user);
};
