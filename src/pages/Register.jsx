import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://offers-api.digistos.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(error.message || `Erreur HTTP: ${response.status}`);
      }
      navigate("/connexion");
    } catch (error) {
      setError("Une erreur est survenue lors de l'inscription. Vérifiez que le mot de passe contient plus de 8 caractères.");
      console.error("Erreur JS :", error.message);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h1 className="text-center mb-4">Créer un compte</h1>
            {error && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
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
                {"S'inscrire"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Register;
