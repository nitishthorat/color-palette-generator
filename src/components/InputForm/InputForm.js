import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { PaletteContext } from "../../providers/PaletteProvider";

const InputForm = () => {
  const { getPalette } = useContext(PaletteContext);
  const [brandColor, setBrandColor] = useState("");
  return (
    <Container>
      <h3>Preferences</h3>
      <Form>
        <Form.Group className="mb-3" controlId="brand-color">
          <Form.Label>Brand Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="#000000"
            onChange={(e) => setBrandColor(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button onClick={() => getPalette(brandColor)}>Get Color Palette</Button>
    </Container>
  );
};

export default InputForm;
