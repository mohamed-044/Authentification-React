import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch(
          "https://offers-api.digistos.com/api/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const datas = await response.json();
          throw new Error(
            `HTTP error: ${datas.message} (status: ${response.status})`
          );
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
