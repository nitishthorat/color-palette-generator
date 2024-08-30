export const config = {
  queryReqBody: {
    contents: [
      {
        parts: [
          {
            text: "Generate a json color palette for a website based on the brand color ${brandColor} following the steps mentioned. 1. Convert the brand color into an hsb value. 2. Decide supporting colors, like green for success, red for error, yellow/orange for warning, and gray for neutrals for background using the following logic such that the saturation and brightness stay close to the brand color(a range of within 5-10). Change the hue according to the required color 3. Create shades for the brand color, supporting colors and neutral colors in an array of length 9. The actual color will be placed at the 5th position and the 1st position should be lights with low saturation and brightness and the 9th position should be the darkest with high saturation and brightness. Likewise the array should go from lighest to darkest by just manipulating the saturation and brightness. Don't change the hue in this step. 4. The format of the json string should be like this: I just need the json for this palette nothing else. The keys for each of these colors in the json should be 'brand', 'success', 'error', 'warning', 'neutral' with there corresponing arrays of shades in the format the brand color was input. 5. Just give me a JSON string which I can directly parse using JSON parse. Remove the '```json\\n' or '```' from the front and the end if there are any.",
          },
        ],
      },
    ],
  },
  paletteKeys: ["brand", "success", "error", "warning", "neutral"],
};
