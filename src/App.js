import logo from "./logo.svg";
import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "./components/InputForm/InputForm";
import ColorPalette from "./components/ColorPalette/ColorPalette";

function App() {
  return (
    <div className="App">
      <Row>
        <Col xs={2}>
          <InputForm />
        </Col>
        <Col xs={10}>
          <ColorPalette />
        </Col>
      </Row>
    </div>
  );
}

export default App;
