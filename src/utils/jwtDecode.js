// eslint-disable-next-line consistent-return
export const jwtDecode = (token) => {
  try {
    let decoded = token.split('.');
    // eslint-disable-next-line prefer-destructuring
    decoded = decoded[1];
    decoded = atob(decoded);
    decoded = JSON.parse(decoded);
    console.log(decoded);
    return decoded;
  } catch (e) {
    e.message;
  }
};
