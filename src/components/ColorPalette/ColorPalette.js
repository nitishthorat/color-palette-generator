import React, { useContext } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { PaletteContext } from "../../providers/PaletteProvider";
import "./ColorPalette.scss";
import { config } from "../../config/config";

const ColorPalette = () => {
  const { palette, setPalette } = useContext(PaletteContext);

  const tableKeys = config.paletteKeys;

  const handleColorChange = (category, index, newColor) => {
    setPalette((prevPalette) => ({
      ...prevPalette,
      [category]: prevPalette[category].map((color, i) =>
        i === index ? newColor : color
      ),
    }));
  };

  const getLuminance = (backgroundColor) => {
    backgroundColor = backgroundColor.replace(/^#/, "");

    // Parse the r, g, b values
    let r = parseInt(backgroundColor.substring(0, 2), 16);
    let g = parseInt(backgroundColor.substring(2, 4), 16);
    let b = parseInt(backgroundColor.substring(4, 6), 16);

    // Calculate the luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance;
  };

  const getTextColor = (backgroundColor) => {
    const luminance = getLuminance(backgroundColor);
    return luminance > 0.5 ? "#000000" : "#FFFFFF"; // Black text for light background, white text for dark background
  };

  function handleCheckboxChange(category, rowIndex, isChecked) {
    setPalette((prevPalette) => ({
      ...prevPalette,
      [category]: prevPalette[category].map((item, index) =>
        index === rowIndex ? { ...item, checked: isChecked } : item
      ),
    }));
  }

  return (
    <Container>
      <h3>Color Palette</h3>

      {palette ? (
        <Table>
          <thead>
            <tr>
              {tableKeys.map((key, index) => (
                <th
                  key={index}
                  style={{
                    background: palette[key][4]["color"],
                    color: getTextColor(palette[key][4]["color"]),
                  }}
                >
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
                    style={{
                      background: palette[key][rowIndex]["color"],
                      color: getTextColor(palette[key][rowIndex]["color"]),
                    }}
                  >
                    <div className="palette-cell">
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        checked={palette[key][rowIndex]["checked"]}
                        onChange={(e) => {
                          // Handle checkbox toggle
                          handleCheckboxChange(key, rowIndex, e.target.checked);
                        }}
                      />
                      {palette[key][rowIndex]["color"]}
                      <Form.Control
                        type="color"
                        value={palette[key][rowIndex]["color"]}
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
