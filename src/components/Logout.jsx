import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (token) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/logout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const datas = await response.json();
            throw new Error(
              `HTTP error: ${datas.message} (status: ${response.status})`
            );
          }
        } else {
          console.error("Token manquant.");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(Logout());
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;