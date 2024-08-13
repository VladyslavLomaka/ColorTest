import { Dimensions, TextStyle, ViewStyle } from "react-native";

export const getResponsiveTextStyles = (): {
  text: TextStyle;
  container: ViewStyle;
} => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  const text: TextStyle = {};
  const container: ViewStyle = {};
  const vertical = SCREEN_HEIGHT > SCREEN_WIDTH;

  if (vertical) {
    text.transform = [{ rotateZ: "90deg" }];
    text.fontSize = SCREEN_HEIGHT / 8;
    container.flexDirection = "column";
    container.width = "auto";
  } else {
    text.fontSize = SCREEN_WIDTH / 5;
    container.flexDirection = "row";
    container.width = "100%";
  }

  return { text, container };
};
