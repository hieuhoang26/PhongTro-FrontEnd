export const setAccessTokenToSession = (token) => {
  sessionStorage.setItem("accessToken", token);
};

export const setRefreshTokenToSession = (token) => {
  sessionStorage.setItem("refreshToken", token);
};

export const getAccessTokenFromSession = () =>
  sessionStorage.getItem("accessToken") || "";

export const getRefreshTokenFromSession = () =>
  sessionStorage.getItem("refreshToken") || "";

export const setProfileToSession = (profile) => {
  sessionStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfileFromSession = () => {
  const result = sessionStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const clearSession = () => {
  sessionStorage.clear();
};
