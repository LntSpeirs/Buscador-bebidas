import { Button, Card, Col } from "react-bootstrap";

/* eslint-disable react/prop-types */
const Bebida = ({ bebida }) => {
  return (
    <Col md={6} lg={3}>
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src={bebida.strDrinkThumb}
          alt={`Imagen de ${bebida.strDrink}`}
        />
        <Card.Body>
          <Card.Title>{bebida.strDrink}</Card.Title>
          <Button variant="warning" className="w-100 mt-2 text-uppercase">
            Ver receta
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Bebida;
