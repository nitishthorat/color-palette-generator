import React, { useContext, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { PaletteContext } from "../../providers/PaletteProvider";
import "./InputForm.scss";

const InputForm = () => {
  const { getPalette } = useContext(PaletteContext);
  const [brandColor, setBrandColor] = useState("#1160df");

  return (
    <Container>
      <h3>Preferences</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Brand Color</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="color-input"
              placeholder="#000000"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
            />
            <Form.Control
              type="color"
              value={brandColor}
              onChange={(e) => {
                setBrandColor(e.target.value);
              }}
            />
          </InputGroup>
        </Form.Group>
      </Form>
      <Button
        onClick={() => getPalette(brandColor)}
        style={{ background: brandColor }}
      >
        Get Color Palette
      </Button>
    </Container>
  );
};

export default InputForm;
