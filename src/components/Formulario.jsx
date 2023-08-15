import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import useCategorias from "../hooks/useCategorias";
import { useState } from "react";
import useBebidas from "../hooks/useBebidas";

const Formulario = () => {
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  const [alerta, setAlerta] = useState("");
  const { categorias } = useCategorias();
  const { consultarBebida } = useBebidas();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (Object.values(busqueda).includes("")) {
      setAlerta("Todos los campos son obligatorios.");
      return;
    }

    setAlerta("");
    consultarBebida(busqueda);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {alerta && (
        <Alert variant="danger" className="text-center">
          {alerta}
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="nombre">Nombre bebida</Form.Label>
            <Form.Control
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Tequila, Vodka,etc"
              value={busqueda.nombre}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="categoria">Categoria</Form.Label>
            <Form.Select
              id="categoria"
              name="categoria"
              value={busqueda.categoria}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option>Selecciona categoria</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.strCategory}
                  value={categoria.strCategory}
                >
                  {categoria.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-end">
        <Col md={3}>
          <Button
            type="submit"
            variant="danger"
            className="text-uppercase w-100 mt-3"
          >
            Buscar bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
