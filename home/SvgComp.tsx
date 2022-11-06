import * as React from "react";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet, Text } from "react-native";
const SvgComponent = ({ percent }: any) => {
  let radius = 100;
  let dash = 2 * Math.PI * radius;
  return (
    <>
      <Svg height={220} width={220} style={styles.circlecontainer}>
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#f5f5f5"
          strokeWidth={10}
        />
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#318CE7"
          strokeWidth={10}
          strokeDasharray={dash}
          strokeDashoffset={dash - percent * (dash / 100)}
        />
        <Text
          style={[
            styles.text,
            // percent > 99 && styles.text1,
            // percent < 10 && styles.text2,
          ]}
        >{`${percent} %`}</Text>
      </Svg>
    </>
  );
};

const styles = StyleSheet.create({
  circlecontainer: {
    display: "flex",
    position: "relative",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "90deg" }],
  },
  text: {
    fontSize: 24,
    color: "#318CE7",
    position: "absolute",
    fontWeight: "400",
    // transform: [{ rotate: "270deg" }, { translateY: 83 }, { translateX: -90 }],
  },
  // text1: {
  //   transform: [{ rotate: "270deg" }, { translateY: 75 }, { translateX: -90 }],
  // },
  // text2: {
  //   transform: [{ rotate: "270deg" }, { translateY: 90 }, { translateX: -90 }],
  // },
});

export default SvgComponent;
