import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { PaletteContext } from "../../providers/PaletteProvider";

const ColorPalette = () => {
  const { palette } = useContext(PaletteContext);

  const tableKeys = ["brand", "success", "error", "warning", "neutral"];
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
                    {palette[key][rowIndex]}
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
