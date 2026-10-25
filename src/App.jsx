import { useContext } from "react";
import Admin from "./Admin";
import User from "./User";
import Guest from "./Guest";
import { UserContext } from "./Context/context";
import { decodeToken } from "react-jwt";
import "../src/App.css";

const ComponentByRoles = {
  admin: Admin,
  user: User,
  guest: Guest,
};

// bad, missing or expired tokens all fall back to the guest view
const getRole = (token) => {
  const payload = token ? decodeToken(token) : null;
  if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
    return "guest";
  }
  const role = String(payload.Role).toLowerCase();
  return ComponentByRoles[role] ? role : "guest";
};

export default function App() {
  const { state } = useContext(UserContext);
  const CurrentUser = ComponentByRoles[getRole(state.token)];
  return <CurrentUser />;
}
