import axios from "axios";
import React, { createContext, useState } from "react";
import { config } from "../config/config";
import _ from "lodash";
import colorUtils from "../miscellaneous/HexAndHSL";

export const PaletteContext = createContext();

const PaletteProvider = ({ children }) => {
  const [palette, setPalette] = useState(null);
  const geminiUrl =
    process.env.REACT_APP_GEMINI_API +
    "?key=" +
    process.env.REACT_APP_GEMINI_KEY;

  const paletteKeys = config.paletteKeys;
  const [hues, setHues] = useState({
    brand: null,
    success: null,
    error: null,
    warning: null,
    neutral: null,
  });

  const transformPalette = (palette) => {
    return Object.keys(palette).reduce((acc, key) => {
      acc[key] = palette[key].map((color) => {
        const hslValue = colorUtils.hexToHsl(color);
        color = colorUtils.hslToHex(hues[key], hslValue.s, hslValue.l);

        return { checked: false, color };
      });
      return acc;
    }, {});
  };

  const getPalette = (brandColor, supportingColors, neutralColor) => {
    const queryReqBody = _.cloneDeep(config.queryReqBody);
    const queryParams = [
      {
        searchValue: "${brandColor}",
        replaceValue: brandColor,
      },
      {
        searchValue: "${successColor}",
        replaceValue: supportingColors.success,
      },
      {
        searchValue: "${errorColor}",
        replaceValue: supportingColors.error,
      },
      {
        searchValue: "${warningColor}",
        replaceValue: supportingColors.warning,
      },
      {
        searchValue: "${neutralColor}",
        replaceValue: neutralColor,
      },
    ];

    queryParams.map((colorItem) => {
      queryReqBody.contents[0].parts[0].text =
        queryReqBody.contents[0].parts[0].text.replace(
          colorItem.searchValue,
          colorItem.replaceValue
        );
    });
    axios.post(geminiUrl, queryReqBody).then((response) => {
      var jsonString = response.data.candidates[0].content.parts[0].text;

      if (jsonString.startsWith("```json")) {
        jsonString = jsonString.substring(7);
      }

      if (jsonString.endsWith("```")) {
        jsonString = jsonString.slice(0, -3);
      }

      setPalette(transformPalette(JSON.parse(jsonString)));
    });
  };

  return (
    <PaletteContext.Provider
      value={{ palette, getPalette, setPalette, setHues }}
    >
      {children}
    </PaletteContext.Provider>
  );
};

export default PaletteProvider;
