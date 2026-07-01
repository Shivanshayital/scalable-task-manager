const TOKEN_KEY = "stm_token";
const USER_KEY = "stm_user";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, value);
}

export function removeToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function setUser(value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(value));
}

export function removeUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(USER_KEY);
}

export function clearAuthStorage() {
  removeToken();
  removeUser();
}
