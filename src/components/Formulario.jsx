import { Button, Col, Form, Row } from "react-bootstrap";
import useCategorias from "../hooks/useCategorias";

const Formulario = () => {
  const { categorias } = useCategorias();
  return (
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="nombre">Nombre bebida</Form.Label>
            <Form.Control
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Tequila, Vodka,etc"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="categoria">Categoria</Form.Label>
            <Form.Select id="categoria" name="categoria">
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
          <Button variant="danger" className="text-uppercase w-100 mt-3">
            Buscar bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
