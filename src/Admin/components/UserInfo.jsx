import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/context";
import { API_URL } from "../../config";

export default function UserInfo() {
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users/me`)
      .then((json) => setUser(json.data.user))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <>
      <div className="rounded m-2 p-2">
        {user ? (
          <>
            {user.ProfilePic && (
              <img
                src={user.ProfilePic}
                alt="Profile"
                style={{ maxWidth: "120px" }}
                className="rounded-circle mb-3"
              />
            )}
            <h4>{user.Name}</h4>
            <p className="mb-1">{user.Email}</p>
            <p className="text-muted">{user.Number}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <button className="btn btn-outline-dark col-md-4" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
