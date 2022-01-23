export const jwtDecode = (token) => {
  try {
    const [, decodedRaw] = token.split('.');
    return JSON.parse(atob(decodedRaw));
  } catch (e) {
    throw new Error(e.message);
  }
};
