export const passwordValidity = (password: string) => {
  // regex for password validation (at least 1 uppercase, 1 lowercase, 1 number, 1 special character,  min 8 characters long)
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const result = re.test(password);
  return result;
};

export const emailValidity = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  const result = re.test(email);
  return result;
};

export const usernameValidity = (username: string) => {
  const re = /\s/;
  const result = re.test(username);
  return !result;
};

export const confirmPasswordValidity = (
  confirmPassword: string,
  password: string
) => {
  const result = password === confirmPassword;
  return result;
};
