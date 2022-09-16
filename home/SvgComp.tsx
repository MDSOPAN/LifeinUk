import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const SvgComponent = (props: any) => (
  <Svg height={100} width={100} {...props}>
    <Circle cx={50} cy={50} r={40} stroke="#000" strokeWidth={3} fill="red" />
  </Svg>
);

export default SvgComponent;
