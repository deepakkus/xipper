import Svg, { G, Path, Defs, ClipPath, Rect, Circle } from "react-native-svg";

export const ThreeDotIcon = () => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    
  >
    <Path
      d="M8 3.25C8.41421 3.25 8.75 2.91421 8.75 2.5C8.75 2.08579 8.41421 1.75 8 1.75C7.58579 1.75 7.25 2.08579 7.25 2.5C7.25 2.91421 7.58579 3.25 8 3.25Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 14.25C8.41421 14.25 8.75 13.9142 8.75 13.5C8.75 13.0858 8.41421 12.75 8 12.75C7.58579 12.75 7.25 13.0858 7.25 13.5C7.25 13.9142 7.58579 14.25 8 14.25Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  );
};
export const VerticalThreeDotIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={5}
      height={20}
      viewBox="0 0 5 20"
      fill="none"
      {...props}
    >
      <Circle cx={2.5} cy={3} r={2.5} fill="#fff" />
      <Circle cx={2.5} cy={10} r={2.5} fill="#fff" />
      <Circle cx={2.5} cy={17} r={2.5} fill="#fff" />
    </Svg>
  )
};