import { passwordRegex as passwordRegexREGEX } from "./../constants/index";

export const validatePasswrodReset = (
  passwordReset: string,
  confirmPasswordNew: string
): boolean => {
  const passwordRegex = new RegExp(passwordRegexREGEX);

  if (passwordRegex.test(passwordReset)) {
    if (passwordReset === confirmPasswordNew) return true;
  }

  return false;
};
