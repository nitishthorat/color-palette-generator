import React, { useContext } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { PaletteContext } from "../../providers/PaletteProvider";
import "./ColorPalette.scss";

const ColorPalette = () => {
  const { palette, setPalette } = useContext(PaletteContext);

  const tableKeys = ["brand", "success", "error", "warning", "neutral"];

  const handleColorChange = (category, index, newColor) => {
    setPalette((prevPalette) => ({
      ...prevPalette,
      [category]: prevPalette[category].map((color, i) =>
        i === index ? newColor : color
      ),
    }));
  };
  return (
    <Container>
      <h3>Color Palette</h3>

      {palette ? (
        <Table>
          <thead>
            <tr>
              {tableKeys.map((key, index) => (
                <th key={index} style={{ background: palette[key][4] }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 9 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {tableKeys.map((key, index) => (
                  <td
                    key={index}
                    style={{ background: palette[key][rowIndex] }}
                  >
                    <div className="palette-cell">
                      {palette[key][rowIndex]}
                      <Form.Control
                        type="color"
                        value={palette[key][rowIndex]}
                        onChange={(e) =>
                          handleColorChange(key, rowIndex, e.target.value)
                        }
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Enter brand color to get a color palette</p>
      )}
    </Container>
  );
};

export default ColorPalette;
