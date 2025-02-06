import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [current_user, setCurrentUser] = useState(null);

  console.log("Current user:", current_user);

  // LOGIN
  const login = (email, password) => {
    toast.loading("Logging you in ... ");
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => {
        // Check for any HTTP errors
        if (!resp.ok) {
          throw new Error("Login failed. Please check your credentials.");
        }
        return resp.json();
      })
      .then((response) => {
        if (response.access_token) {
          toast.dismiss();
          sessionStorage.setItem("token", response.access_token);
          setAuthToken(response.access_token);
          fetchCurrentUser(response.access_token);
          toast.success("Successfully Logged in");
          navigate("/");
        } else {
          toast.dismiss();
          toast.error(response.error || "Failed to login");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  // LOGOUT
  const logout = () => {
    toast.loading("Logging out ... ");
    fetch("http://127.0.0.1:5000/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);

        if (response.success) {
          sessionStorage.removeItem("token");
          setAuthToken(null);
          setCurrentUser(null);

          toast.dismiss();
          toast.success("Successfully Logged out");

          navigate("/login");
        }
      });
  };

  // Fetch current user
  useEffect(() => {
    if (authToken) {
      fetchCurrentUser(authToken);
    }
  }, [authToken]);

  const fetchCurrentUser = (token) => {
    console.log("Fetching current user with token:", token);

    if (!token) {
      toast.error("No token found.");
      return;
    }

    fetch("http://127.0.0.1:5000/current_user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Current user data:", data);
        if (data.email) {
          setCurrentUser(data);
        } else {
          toast.error("Failed to fetch user data.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message || "An error occurred while fetching user data.");
      });
  };

  // ADD user
  const addUser = (username, email, password) => {
    toast.loading("Registering ... ");
    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);

        if (response.msg) {
          toast.dismiss();
          toast.success(response.msg);
          navigate("/login");
        } else if (response.error) {
          toast.dismiss();
          toast.error(response.error);
        } else {
          toast.dismiss();
          toast.error("Failed to add user.");
        }
      });
  };

  const updateUser = () => {
    console.log("Updating user:");
  };

  const deleteUser = async (userId) => {
    console.log("Deleting user:", userId);
  };

  const data = {
    authToken,
    login,
    current_user,
    logout,
    addUser,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
