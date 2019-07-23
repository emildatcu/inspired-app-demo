const getStringAfterChar = (str: string, char: string) => {
  return str.split(char).pop();
};

const getStringBeforeChar = (str: string, char: string) => {
  return str.substring(0, str.indexOf(char));
};

const containsOnlyWhitespaces = (str: string) => {
  const regexStr = `\\s{${str.length}}`;
  const regex = new RegExp(regexStr, 'g');

  return regex.test(str);
};

const getStored = (key: string) => {
  const result = localStorage.getItem(key);

  if (!result) {
    return '';
  }

  try {
    return JSON.parse(result);
  } catch (e) {
    return '';
  }
};

const removeStored = (key: string) => {
  localStorage.removeItem(key);
};

const setStored = (key: string, payload: unknown) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const fakeAuth = {
  isAuthenticated: getStored('logged'),
  // tslint:disable-next-line: no-any
  authenticate(cb: any) {
    setStored('logged', true);
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  // tslint:disable-next-line: no-any
  signout(cb: any) {
    setStored('logged', false);
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export default {
  containsOnlyWhitespaces,
  fakeAuth,
  getStored,
  getStringAfterChar,
  getStringBeforeChar,
  removeStored,
  setStored,
};
