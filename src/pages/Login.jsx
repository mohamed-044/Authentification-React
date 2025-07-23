import { use, useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://offers-api.digistos.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || "Erreur de connexion");
        error.status = response.status;
        throw error;
      }

      dispatch(
        loginSuccess({
          token: data.access_token,
          expiresAt: new Date(
            Date.now() + data.expires_in * 1000
          ).toISOString(),
        })
      );

      navigate("/offres/professionnelles");
    } catch (error) {
      console.error("Erreur :", error.status || "?", error.message);
      if (error.status === 404) {
        setError("Identifiant incorrect.");
      } else if (error.status === 401) {
        setError("Identifiant ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h1 className="text-center mb-4">Se connecter</h1>
            {error && (
              <div className="alert alert-danger text-center mb-3" role="alert">
                {error}
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
