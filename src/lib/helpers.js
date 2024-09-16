export const updateLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
}

export const updateSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getSessionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  }
  
  export const deleteSessionStorage = (key) => {
    sessionStorage.removeItem(key);
  }
  