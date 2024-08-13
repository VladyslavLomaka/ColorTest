import { TouchableOpacity, Text, TextStyle, ViewStyle } from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ColorService } from "@/utils/ColorService";
import { getResponsiveTextStyles } from "@/utils/getResponsiveTextStyles";
import { styles } from "./styles";
import { animateText } from "@/utils/animateText";

export default function Colors() {
  const colorService = new ColorService();

  const [colorTextStyle, setColorTextStyle] = useState<TextStyle>({});
  const [colorContainerStyle, setColorContainerStyle] = useState<ViewStyle>({});

  const progress = useSharedValue(0);
  const bgColorFrom = useSharedValue(colorService.generateColor());
  const bgColorTo = useSharedValue(colorService.generateColor());

  const [displayedColor, setDisplayedColor] = useState(bgColorTo.value);

  const txtColorFrom = useSharedValue("#000");
  const txtColorTo = useSharedValue("#fff");

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [bgColorFrom.value, bgColorTo.value]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        progress.value,
        [0, 1],
        [txtColorFrom.value, txtColorTo.value]
      ),
    };
  });
  const runAnimation = async () => {
    progress.value = 0;
    bgColorFrom.value = bgColorTo.value;
    bgColorTo.value = colorService.generateColor();

    const iterator = animateText(bgColorFrom.value, bgColorTo.value);

    for (let result = iterator.next(); !result.done; result = iterator.next()) {
      if (result.value instanceof Promise) {
        await result.value; // Wait for the delay
      } else if (typeof result.value === "string") {
        setDisplayedColor(result.value); // Update the displayed color
      }
    }

    txtColorFrom.value = txtColorTo.value;
    txtColorTo.value = colorService.isColorDark(bgColorTo.value)
      ? "#fff"
      : "#000";

    progress.value = withTiming(1, { duration: 200 });
  };
  return (
    <Animated.View
      style={[styles.container, animatedBackgroundStyle]}
      onLayout={() => {
        const { container, text } = getResponsiveTextStyles();
        setColorTextStyle(text);
        setColorContainerStyle(container);
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={runAnimation}
        style={styles.touchable}
      >
        <Animated.View style={[styles.colorContainer, colorContainerStyle]}>
          {displayedColor.split("").map((char, i) => (
            <Animated.Text
              key={i}
              style={[styles.color, animatedTextStyle, colorTextStyle]}
            >
              {char}
            </Animated.Text>
          ))}
        </Animated.View>
        <Animated.Text style={[styles.title, animatedTextStyle]}>
          Hello there
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
