import { Navigate } from "react-router-dom";
const Protected = ({children }) => {

    const isLoggedIn = localStorage.getItem("userData");

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
