import axios from "axios";
import React, { createContext, useState } from "react";
import { config } from "../config/config";

export const PaletteContext = createContext();

const PaletteProvider = ({ children }) => {
  const [palette, setPalette] = useState(null);
  const geminiUrl =
    process.env.REACT_APP_GEMINI_API +
    "?key=" +
    process.env.REACT_APP_GEMINI_KEY;

  const getPalette = (brandColor) => {
    const queryReqBody = config.queryReqBody;
    queryReqBody.contents[0].parts[0].text =
      queryReqBody.contents[0].parts[0].text.replace(
        "${brandColor}",
        `${brandColor}`
      );

    axios.post(geminiUrl, queryReqBody).then((response) => {
      setPalette(JSON.parse(response.data.candidates[0].content.parts[0].text));
    });
  };

  return (
    <PaletteContext.Provider value={{ palette, getPalette, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
};

export default PaletteProvider;
