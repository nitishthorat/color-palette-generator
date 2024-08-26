export const config = {
  queryReqBody: {
    contents: [
      {
        parts: [
          {
            text: "Generate a json color palette for a website based on the brand color ${brandColor} with supporting colors, like green for success, red for error, yellow/orange for warning and neutral colors for background. Each of these colors should be in an array of 9 shades where the actual color is at the center at the 4th position and the shades go from lightest at 0th position to the darkest at 9th position. And the format of the json string should be like this. I just need the json for this palette nothing else. The keys for each of these colors in the json should be 'brand', 'success', 'error', 'warning', 'neutral'. Just give me a JSON string which I can directly parse using JSON parse. Remove the '```json\\n' or '```' from the front and the end if there are any.",
          },
        ],
      },
    ],
  },
};
