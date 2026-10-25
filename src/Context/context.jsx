import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import Cookies from "js-cookie";
import axios from "axios";

const savedToken = Cookies.get("token");
const initialToken =
  savedToken && savedToken !== "undefined" ? savedToken : undefined;

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
// set it before any child component makes a request
setAuthHeader(initialToken);

let data = {
  user: undefined,
  role: undefined,
  token: initialToken,
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);

  // keep the cookie and the axios Authorization header in sync with the token
  useEffect(() => {
    setAuthHeader(state.token);
    if (state.token) {
      Cookies.set("token", state.token, { expires: 7, sameSite: "lax" });
    } else {
      Cookies.remove("token");
    }
  }, [state.token]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
