import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontFamily: "monospace",
    fontSize: 32,
  },
  description: {
    fontSize: 24,
  },
  colorContainer: {
    position: "absolute",
    justifyContent: "space-between",
    opacity: 0.1,
    display: "flex",
    flexDirection: "column",
  },
  color: {
    fontSize: 20,
  },
});
