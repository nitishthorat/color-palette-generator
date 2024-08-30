import axios from "axios";
import React, { createContext, useState } from "react";
import { config } from "../config/config";
import _ from "lodash";

export const PaletteContext = createContext();

const PaletteProvider = ({ children }) => {
  const [palette, setPalette] = useState(null);
  const geminiUrl =
    process.env.REACT_APP_GEMINI_API +
    "?key=" +
    process.env.REACT_APP_GEMINI_KEY;

  const transformPalette = (palette) => {
    return Object.keys(palette).reduce((acc, key) => {
      acc[key] = palette[key].map((color) => ({ checked: false, color }));
      return acc;
    }, {});
  };

  const getPalette = (brandColor) => {
    const queryReqBody = _.cloneDeep(config.queryReqBody);

    queryReqBody.contents[0].parts[0].text =
      queryReqBody.contents[0].parts[0].text.replace(
        "${brandColor}",
        `${brandColor}`
      );
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
    <PaletteContext.Provider value={{ palette, getPalette, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
};

export default PaletteProvider;
