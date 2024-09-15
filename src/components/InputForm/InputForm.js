import React, { useContext, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { PaletteContext } from "../../providers/PaletteProvider";
import { config } from "../../config/config";
import colorUtils from "../../miscellaneous/HexAndHSL";
import "./InputForm.scss";

const InputForm = () => {
  const { getPalette, hues, setHues } = useContext(PaletteContext);
  const [brandColor, setBrandColor] = useState("#1160df");
  const [isBrandColorSet, setIsBrandColorSet] = useState(false);
  const [supportingColors, setSupportingColors] = useState({
    success: "#4fdf11",
    error: "#df3011",
    warning: "#dfc311",
  });
  const [neutralColor, setNeutralColor] = useState("#414a58");
  const supportingColorKeys = config.supportingColorKeys;

  const onBrandColorChange = (colorHex) => {
    setBrandColor(colorHex);
    const hslValue = colorUtils.hexToHsl(colorHex);

    setHues((prevHues) => ({
      ...prevHues,
      ["brand"]: hslValue.h,
      ["neutral"]: hslValue.h,
    }));

    supportingColorKeys.map((colorItem) => {
      const hexValue = colorUtils.hslToHex(colorItem.h, hslValue.s, hslValue.l);
      setHues((prevHues) => ({
        ...prevHues,
        [colorItem.key]: colorItem.h,
      }));
      updateColor(colorItem, hexValue);
    });

    setNeutralColor(colorUtils.hslToHex(hslValue.h, 15, 30));
  };

  const updateColor = (colorItem, colorValue) => {
    setSupportingColors((prevColors) => ({
      ...prevColors,
      [colorItem.key]: colorValue,
    }));
  };

  return (
    <Container className="input-form-container">
      <h3>Preferences</h3>
      <div className="form-box">
        <h4>Brand Color</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Brand Color</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                id="brand-color-input"
                className="color-input"
                placeholder="#000000"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
              />
              <Form.Control
                type="color"
                value={brandColor}
                onChange={(e) => {
                  onBrandColorChange(e.target.value);
                }}
              />
            </InputGroup>
          </Form.Group>
        </Form>
        <Button
          onClick={() => setIsBrandColorSet(true)}
          style={{ background: brandColor }}
        >
          Set Brand Color
        </Button>
      </div>
      <div className="form-box">
        <h4>Supporting Colors</h4>
        <Form>
          {supportingColorKeys.map((colorItem, index) => {
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{colorItem.label} Color</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    id="success-color-input"
                    className="color-input"
                    placeholder="#000000"
                    value={supportingColors[colorItem.key]}
                    onChange={(e) => updateColor(colorItem, e.target.value)}
                    disabled={!isBrandColorSet}
                  />
                  <Form.Control
                    type="color"
                    value={supportingColors[colorItem.key]}
                    onChange={(e) => updateColor(colorItem, e.target.value)}
                    disabled={!isBrandColorSet}
                  />
                </InputGroup>
              </Form.Group>
            );
          })}
          <Form.Group className="mb-3">
            <Form.Label>Neutrals</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                id="success-color-input"
                className="color-input"
                placeholder="#000000"
                value={neutralColor}
                onChange={(e) => setNeutralColor(e.target.value)}
                disabled={!isBrandColorSet}
              />
              <Form.Control
                type="color"
                value={neutralColor}
                onChange={(e) => setNeutralColor(e.target.value)}
                disabled={!isBrandColorSet}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>

      <Button
        onClick={() => getPalette(brandColor, supportingColors, neutralColor)}
        style={{ background: brandColor }}
      >
        Get Color Palette
      </Button>
    </Container>
  );
};

export default InputForm;
