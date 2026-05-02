export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validateRequired = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && value !== '';
};
