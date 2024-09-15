export const config = {
  queryReqBody: {
    contents: [
      {
        parts: [
          {
            text: "Generate a json color palette for a website based on the brand color ${brandColor}, and supporting color like success ${successColor}, error color ${errorColor}, warning color ${warningColor} and neutral color ${neutralColor} following the steps mentioned. 1. Convert each color into an hsl value. 2. Create shades for all of the colors keeping the same original 'h' value for each shade of the color, but manipulating 's' and 'l' value, including supporting colors and neutral colors in an array of length 9. The original corresponding color will be placed at the 5th position and the 1st position should be the lightest with low saturation and high brightness and the 9th position should be the darkest with high saturation and low brightness. Likewise the array should go from lighest to darkest by just manipulating the saturation and brightness. Don't change the hue in this step. 4. The format of the json string should be like this: I just need the json for this palette nothing else. The keys for each of these colors in the json should be 'brand', 'success', 'error', 'warning', 'neutral' with there corresponing arrays of shades in the format the brand color was input. 5. Just give me a JSON string which I can directly parse using JSON parse. Remove the '```json\\n' or '```' from the front and the end if there are any. All of the colors should be in hex form.",
          },
        ],
      },
    ],
  },
  paletteKeys: ["brand", "success", "error", "warning", "neutral"],
  supportingColorKeys: [
    {
      key: "success",
      label: "Success",
      h: 102,
    },
    {
      key: "error",
      label: "Error",
      h: 9,
    },
    {
      key: "warning",
      label: "Warning",
      h: 52,
    },
  ],
};
