const TokenKey = "qx_mis_token";
const UserInfoKey = "qx_mis_userinfo";
const LoginInfoKey = "qx_mis_logininfo";

// 用户token
export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

// 用户信息
export function getUserInfo() {
  let userInfo = "";
  try {
    userInfo = localStorage.getItem(UserInfoKey);
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    } else {
      userInfo = "";
    }
  } catch (error) {
    userInfo = "";
    removeUserInfo();
  }
  return userInfo;
}

export function setUserInfo(data) {
  return localStorage.setItem(UserInfoKey, JSON.stringify(data));
}

export function removeUserInfo() {
  return localStorage.removeItem(UserInfoKey);
}

// 登录信息
export function getLoginInfo() {
  let loginInfo = "";
  try {
    loginInfo = localStorage.getItem(LoginInfoKey);
    if (loginInfo) {
      loginInfo = JSON.parse(loginInfo);
    } else {
      loginInfo = "";
    }
  } catch (error) {
    loginInfo = "";
    removeLoginInfo();
  }
  return loginInfo;
}

export function setLoginInfo(data) {
  return localStorage.setItem(LoginInfoKey, JSON.stringify(data));
}

export function removeLoginInfo() {
  return localStorage.removeItem(LoginInfoKey);
}
