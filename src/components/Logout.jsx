import { useEffect } from 'react';
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
   useEffect(() => {
    const handleLogout = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;
        if (token) {
        const response = await fetch('https://offers-api.digistos.com/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const datas = await response.json();
          throw new Error(`HTTP error: ${datas.message} (status: ${response.status})`);
        }
      } else {
        console.error("Token manquant.");
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
