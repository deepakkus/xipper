import { View } from "react-native";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const Swimming = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
    >
      <Path
        d="M15.125 25.3327C15.3985 25.3327 15.6608 25.224 15.8542 25.0306C16.0476 24.8372 16.1562 24.5749 16.1562 24.3014V21.6562H27.8438V24.628C27.8438 24.9015 27.9524 25.1638 28.1458 25.3572C28.3392 25.5506 28.6015 25.6592 28.875 25.6592C29.1485 25.6592 29.4108 25.5506 29.6042 25.3572C29.7976 25.1638 29.9062 24.9015 29.9062 24.628V5.5C29.9062 5.2265 29.7976 4.96419 29.6042 4.7708C29.4108 4.5774 29.1485 4.46875 28.875 4.46875C28.6015 4.46875 28.3392 4.5774 28.1458 4.7708C27.9524 4.96419 27.8438 5.2265 27.8438 5.5V8.59375H16.1562V5.5C16.1562 5.2265 16.0476 4.96419 15.8542 4.7708C15.6608 4.5774 15.3985 4.46875 15.125 4.46875C14.8515 4.46875 14.5892 4.5774 14.3958 4.7708C14.2024 4.96419 14.0938 5.2265 14.0938 5.5V24.3014C14.0938 24.5749 14.2024 24.8372 14.3958 25.0306C14.5892 25.224 14.8515 25.3327 15.125 25.3327ZM16.1562 19.5938V16.1562H27.8438V19.5938H16.1562ZM27.8438 10.6562V14.0938H16.1562V10.6562H27.8438ZM4.46875 28.875C4.46875 28.6015 4.5774 28.3392 4.7708 28.1458C4.96419 27.9524 5.2265 27.8438 5.5 27.8438C7.87531 27.8438 9.10938 28.667 10.1973 29.3906C11.165 30.0352 11.9986 30.5938 13.75 30.5938C15.5014 30.5938 16.3281 30.0369 17.3027 29.3906C18.3906 28.6653 19.6247 27.8438 21.9983 27.8438C24.3719 27.8438 25.6077 28.667 26.6956 29.3906C27.6633 30.0352 28.4986 30.5938 30.25 30.5938C32.0014 30.5938 32.8281 30.0369 33.8027 29.3906C34.8906 28.6653 36.1247 27.8438 38.5 27.8438C38.7735 27.8438 39.0358 27.9524 39.2292 28.1458C39.4226 28.3392 39.5312 28.6015 39.5312 28.875C39.5312 29.1485 39.4226 29.4108 39.2292 29.6042C39.0358 29.7976 38.7735 29.9062 38.5 29.9062C36.7503 29.9062 35.9219 30.4631 34.9473 31.1094C33.8577 31.8347 32.6236 32.6562 30.25 32.6562C27.8764 32.6562 26.6406 31.833 25.5527 31.1094C24.585 30.4648 23.7497 29.9062 21.9983 29.9062C20.2469 29.9062 19.4202 30.4631 18.4456 31.1094C17.3577 31.8347 16.1236 32.6562 13.75 32.6562C11.3764 32.6562 10.1406 31.833 9.05266 31.1094C8.07812 30.4631 7.24969 29.9062 5.5 29.9062C5.2265 29.9062 4.96419 29.7976 4.7708 29.6042C4.5774 29.4108 4.46875 29.1485 4.46875 28.875ZM39.5312 35.75C39.5312 36.0235 39.4226 36.2858 39.2292 36.4792C39.0358 36.6726 38.7735 36.7812 38.5 36.7812C36.7503 36.7812 35.9219 37.3381 34.9473 37.9844C33.8577 38.7097 32.6236 39.5312 30.25 39.5312C27.8764 39.5312 26.6406 38.708 25.5527 37.9844C24.585 37.3398 23.7497 36.7812 21.9983 36.7812C20.2469 36.7812 19.4202 37.3381 18.4456 37.9844C17.3577 38.7097 16.1236 39.5312 13.75 39.5312C11.3764 39.5312 10.1406 38.708 9.05266 37.9844C8.07812 37.3381 7.24969 36.7812 5.5 36.7812C5.2265 36.7812 4.96419 36.6726 4.7708 36.4792C4.5774 36.2858 4.46875 36.0235 4.46875 35.75C4.46875 35.4765 4.5774 35.2142 4.7708 35.0208C4.96419 34.8274 5.2265 34.7188 5.5 34.7188C7.87531 34.7188 9.10938 35.542 10.1973 36.2656C11.165 36.9102 11.9986 37.4688 13.75 37.4688C15.5014 37.4688 16.3281 36.9119 17.3027 36.2656C18.3906 35.5403 19.6247 34.7188 21.9983 34.7188C24.3719 34.7188 25.6077 35.542 26.6956 36.2656C27.6633 36.9102 28.4986 37.4688 30.25 37.4688C32.0014 37.4688 32.8281 36.9119 33.8027 36.2656C34.8906 35.5403 36.1247 34.7188 38.5 34.7188C38.7735 34.7188 39.0358 34.8274 39.2292 35.0208C39.4226 35.2142 39.5312 35.4765 39.5312 35.75Z"
        fill="#7F8387"
      />
    </Svg>
  );
};
export const Jacuzzi = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
    >
      <Path
        d="M13.046 18.4397C12.2723 18.4397 11.6203 18.1738 11.0898 17.6422C10.5594 17.1105 10.2948 16.4713 10.296 15.7245C10.296 14.9582 10.5606 14.3025 11.0898 13.7573C11.6203 13.2122 12.2723 12.9397 13.046 12.9397C13.8184 12.9397 14.4699 13.2104 15.0003 13.7518C15.5308 14.2933 15.796 14.9447 15.796 15.7062C15.796 16.4676 15.5308 17.1136 15.0003 17.644C14.4699 18.1745 13.8184 18.4397 13.046 18.4397ZM10.296 38.5C9.77656 38.5 9.34083 38.3124 8.98883 37.9372C8.63683 37.562 8.46144 37.1146 8.46267 36.5952C7.61811 36.5952 6.9135 36.2988 6.34883 35.706C5.78417 35.1132 5.50122 34.3995 5.5 33.5647V25.3843H10.296V23.9745C10.296 23.0248 10.6284 22.206 11.2933 21.5178C11.9582 20.8297 12.7649 20.4851 13.7133 20.4838C14.278 20.4838 14.8084 20.6122 15.3047 20.8688C15.8009 21.1255 16.2397 21.4677 16.621 21.8955L18.4818 24.0662C18.7263 24.318 18.9628 24.5532 19.1913 24.772C19.4199 24.9908 19.6723 25.1949 19.9485 25.3843H33V9.88168C33 9.19479 32.7708 8.59895 32.3125 8.09418C31.8542 7.5894 31.2938 7.33579 30.6313 7.33334C30.3148 7.33334 30.0117 7.40057 29.722 7.53501C29.4323 7.67068 29.1757 7.85034 28.952 8.07401L26.6603 10.4188C26.8131 10.9505 26.8437 11.4742 26.752 11.99C26.6603 12.5058 26.477 12.9886 26.202 13.4383L22.429 9.57551C22.8568 9.29318 23.3151 9.1129 23.804 9.03468C24.2929 8.95645 24.7818 9.01145 25.2707 9.19968L27.5623 6.84568C27.9718 6.42401 28.4387 6.09401 28.963 5.85568C29.4873 5.61734 30.0434 5.49879 30.6313 5.50001C31.8108 5.50001 32.8063 5.92779 33.6178 6.78334C34.4294 7.6389 34.8346 8.67106 34.8333 9.87984V25.3843H38.5V33.5647C38.5 34.3982 38.2177 35.112 37.653 35.706C37.0883 36.3 36.3837 36.597 35.5392 36.597C35.5392 37.1165 35.3632 37.5632 35.0112 37.9372C34.6592 38.3112 34.2234 38.4988 33.704 38.5H10.296ZM8.46267 34.7618H35.5392C35.8679 34.7618 36.1381 34.6445 36.3495 34.4098C36.5609 34.1752 36.6667 33.8935 36.6667 33.5647V27.2177H7.33333V33.5647C7.33333 33.8935 7.43906 34.1752 7.6505 34.4098C7.86194 34.6457 8.13267 34.7618 8.46267 34.7618ZM8.46267 34.7618L7.33333 34.7637H36.6667L8.46267 34.7618Z"
        fill="#7F8387"
      />
    </Svg>
  );
};
export const Spa = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
    >
      <Path
        d="M22.6346 38.4304C20.7279 38.203 18.8347 37.7056 16.9549 36.938C15.0751 36.1693 13.3719 35.0497 11.8454 33.5794C10.3176 32.1078 9.04894 30.2427 8.03939 27.984C7.02983 25.7254 6.44194 23.0023 6.27572 19.8147L6.20605 18.3334L7.61589 18.4049C8.89189 18.4745 10.4074 18.7966 12.1626 19.371C13.9189 19.943 15.4094 20.6733 16.6341 21.5619C16.7893 19.2641 17.3576 16.8441 18.3391 14.3019C19.3205 11.7596 20.5409 9.6012 22.0002 7.82654C23.4596 9.6012 24.6799 11.7713 25.6614 14.3367C26.6428 16.9021 27.2112 19.3344 27.3664 21.6334C28.5202 20.8145 29.9514 20.0897 31.6601 19.459C33.3687 18.8284 34.9203 18.4764 36.3149 18.403L37.7944 18.3334L37.7247 19.8844C37.6306 22.4144 37.2371 24.6853 36.5441 26.697C35.8511 28.7088 34.8702 30.4737 33.6016 31.9917C32.3329 33.5097 30.7886 34.7991 28.9687 35.86C27.1488 36.9209 25.0374 37.7777 22.6346 38.4304ZM22.6126 36.575C22.2764 31.5028 20.7719 27.6681 18.0989 25.0709C15.4259 22.4736 12.1027 20.8695 8.12922 20.2584C8.46533 25.4834 10.0163 29.3792 12.7822 31.9459C15.5481 34.5125 18.8249 36.0556 22.6126 36.575ZM22.0002 27.3314C22.4121 26.565 22.9407 25.7639 23.5861 24.9279C24.2302 24.0919 24.8932 23.3909 25.5752 22.825C25.5618 20.9428 25.2416 18.9781 24.6146 16.9309C23.9876 14.8836 23.1161 12.9232 22.0002 11.0495C20.8843 12.9232 20.0129 14.8836 19.3859 16.9309C18.7589 18.9781 18.4387 20.9428 18.4252 22.825C19.1072 23.3921 19.7666 24.0931 20.4034 24.9279C21.0402 25.7639 21.5724 26.5644 22.0002 27.3295M24.4477 35.9627C25.8826 35.4775 27.2582 34.8364 28.5746 34.0395C29.8921 33.2439 31.0716 32.2245 32.1129 30.9815C33.1554 29.7398 34.0104 28.2407 34.6777 26.4844C35.3438 24.7293 35.7411 22.6539 35.8694 20.2584C32.9031 20.6861 30.2649 21.7293 27.9549 23.3879C25.6449 25.0464 23.9796 27.0802 22.9591 29.4892C23.3257 30.467 23.627 31.4539 23.8629 32.45C24.0988 33.4461 24.2937 34.617 24.4477 35.9627Z"
        fill="#7F8387"
      />
    </Svg>
  );
};
export const Edit = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C20.8027 6.94749 20.8762 6.8376 20.9264 6.71663C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8762 5.83241 20.8027 5.72252 20.71 5.63L18.37 3.29C18.2775 3.1973 18.1676 3.12375 18.0466 3.07357C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07357C17.1624 3.12375 17.0525 3.1973 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
        fill="#6D38C3"
      />
    </Svg>
  );
};
export const Reverse = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <Path
        d="M17.128 6.78748C17.6824 7.34226 17.3264 8.27437 16.5746 8.34686L16.4788 8.35175L3.3463 8.33705C3.1339 8.33658 2.9297 8.25502 2.77542 8.10904C2.62113 7.96306 2.52841 7.76368 2.5162 7.55163C2.50399 7.33958 2.57321 7.13087 2.70972 6.96815C2.84623 6.80542 3.03972 6.70096 3.25066 6.67611L3.34817 6.67039L14.6698 6.68306L12.7611 4.77009C12.6118 4.61996 12.5253 4.41863 12.5191 4.207C12.5128 3.99536 12.5874 3.7893 12.7276 3.63065C12.8678 3.472 13.0632 3.37267 13.2739 3.35283C13.4847 3.33299 13.6952 3.39412 13.8625 3.52382L13.9408 3.59307L17.1289 6.78831L17.128 6.78748ZM17.5083 12.5196C17.508 12.7237 17.4329 12.9206 17.2971 13.073C17.1613 13.2254 16.9743 13.3226 16.7715 13.3462L16.674 13.352L5.35237 13.3393L7.26107 15.2523C7.41035 15.4024 7.4969 15.6037 7.50313 15.8154C7.50935 16.027 7.43479 16.2331 7.29458 16.3917C7.15438 16.5504 6.95904 16.6497 6.74825 16.6695C6.53746 16.6894 6.32702 16.6282 6.15967 16.4985L6.08141 16.4293L2.89332 13.234C2.33977 12.6801 2.69582 11.748 3.44757 11.6755L3.5434 11.6706L16.6759 11.6853C16.8969 11.6856 17.1088 11.7736 17.2649 11.93C17.421 12.0865 17.5085 12.2986 17.5083 12.5196Z"
        fill="#6D38C3"
      />
    </Svg>
  );
};
export const Seats = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <Path
        d="M10.1023 8.47387L11.4875 1.77881C11.4875 1.77881 9.0634 2.24054 9.0634 3.16399C9.0634 3.74115 9.98686 4.08745 9.64056 4.43375C9.29426 4.78004 8.02451 5.12634 8.02451 6.0498C8.02451 6.62696 8.40313 7.05636 8.02451 7.43498C7.67821 7.78128 7.33192 7.59982 6.75476 7.43498C6.10834 7.25029 4.79241 7.08869 4.33068 7.20412C3.86895 7.31955 3.40723 7.55041 3.40723 8.24301C3.40723 8.62393 3.63809 9.05103 4.21525 9.16646C4.79241 9.28189 5.485 8.70473 6.40846 8.70473C7.33192 8.70473 8.48624 9.39733 9.17883 9.39733C9.87142 9.39733 10.1023 8.47387 10.1023 8.47387Z"
        stroke="gray"
        stroke-opacity="0.4"
        stroke-linejoin="round"
      />
      <Path
        d="M4.33078 9.16577L3.63818 11.0127H11.2567L9.87152 9.16577"
        stroke="gray"
        stroke-opacity="0.4"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export const Bags = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <Path
        d="M3.5 11V10.5C3.225 10.5 2.98967 10.4022 2.794 10.2065C2.59833 10.0108 2.50033 9.77533 2.5 9.5V4C2.5 3.725 2.598 3.48967 2.794 3.294C2.99 3.09833 3.22533 3.00033 3.5 3H4.5V1.5C4.5 1.35833 4.548 1.23967 4.644 1.144C4.74 1.04833 4.85867 1.00033 5 1H7C7.14167 1 7.2605 1.048 7.3565 1.144C7.4525 1.24 7.50033 1.35867 7.5 1.5V3H8.5C8.775 3 9.0105 3.098 9.2065 3.294C9.4025 3.49 9.50033 3.72533 9.5 4V9.5C9.5 9.775 9.40217 10.0105 9.2065 10.2065C9.01083 10.4025 8.77533 10.5003 8.5 10.5V11H7.5V10.5H4.5V11H3.5ZM5.5 3H6.5V2H5.5V3ZM6 6C6.44167 6 6.873 5.94383 7.294 5.8315C7.715 5.71917 8.117 5.55033 8.5 5.325V4H3.5V5.325C3.88333 5.55 4.2855 5.71883 4.7065 5.8315C5.1275 5.94417 5.55867 6.00033 6 6ZM5.5 7.5V6.975C5.15 6.93333 4.80833 6.87083 4.475 6.7875C4.14167 6.70417 3.81667 6.59167 3.5 6.45V9.5H8.5V6.45C8.18333 6.59167 7.85833 6.70417 7.525 6.7875C7.19167 6.87083 6.85 6.93333 6.5 6.975V7.5H5.5Z"
        fill="gray"
        fill-opacity="0.4"
      />
    </Svg>
  );
};
export const AC = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <Path
        d="M3.08333 4.75H7.25M7.66667 2.66667H7.67042M3 7.25C3 7.25 3.33333 8.03125 2.66667 8.5M7.33333 7.25C7.33333 7.25 7 8.03125 7.66667 8.5M5.16667 7.25V8.5M6.83333 1C7.80792 1 8.295 1 8.65083 1.22333C8.83645 1.33993 8.9934 1.49688 9.11 1.6825C9.33333 2.03833 9.33333 2.525 9.33333 3.5C9.33333 4.475 9.33333 4.96167 9.10958 5.3175C8.99317 5.50288 8.83652 5.65967 8.65125 5.77625C8.29458 6 7.8075 6 6.83333 6H3.5C2.52542 6 2.03833 6 1.6825 5.77625C1.49697 5.65989 1.34003 5.50323 1.22333 5.31792C1 4.96125 1 4.47417 1 3.5C1 2.52583 1 2.03833 1.22333 1.6825C1.33993 1.49688 1.49688 1.33993 1.6825 1.22333C2.03833 1 2.525 1 3.5 1H6.83333Z"
        stroke="gray"
        stroke-opacity="0.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export const CorrectIcon = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
    >
      <G clip-Path="url(#clip0_2069_4743)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 8C0 6.01088 0.790176 4.10322 2.1967 2.6967C3.60322 1.29018 5.51088 0.5 7.5 0.5C9.48912 0.5 11.3968 1.29018 12.8033 2.6967C14.2098 4.10322 15 6.01088 15 8C15 9.98912 14.2098 11.8968 12.8033 13.3033C11.3968 14.7098 9.48912 15.5 7.5 15.5C5.51088 15.5 3.60322 14.7098 2.1967 13.3033C0.790176 11.8968 0 9.98912 0 8ZM7.072 11.21L11.39 5.812L10.61 5.188L6.928 9.789L4.32 7.616L3.68 8.384L7.072 11.21Z"
          fill="#6D38C3"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2069_4743">
          <Rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export const DiscountIcon = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
    >
      <Path
        d="M30.989 23.4991C32.9566 23.5242 34.8354 24.3223 36.2196 25.7209C37.6038 27.1196 38.3822 29.0066 38.3868 30.9744C38.3914 32.9422 37.6218 34.8329 36.2442 36.238C34.8666 37.6431 32.9915 38.45 31.024 38.4843H30.989C30.0048 38.4848 29.0302 38.2912 28.1208 37.9148C27.2115 37.5384 26.3852 36.9865 25.6893 36.2905C24.9934 35.5946 24.4414 34.7683 24.065 33.859C23.6886 32.9496 23.495 31.975 23.4955 30.9908C23.4955 30.7913 23.4955 30.6058 23.52 30.4168C23.5323 30.0668 23.5568 29.7308 23.52 29.3668C23.162 26.5932 21.8872 24.0188 19.8981 22.0529C17.909 20.0869 15.3199 18.8423 12.5423 18.5168C12.1678 18.4783 11.83 18.4905 11.4678 18.4905L11.0058 18.5028C10.0217 18.5044 9.04696 18.3122 8.13719 17.9371C7.22742 17.562 6.40044 17.0114 5.70347 16.3167C5.00649 15.622 4.45318 14.7968 4.07511 13.8883C3.69704 12.9797 3.50162 12.0056 3.50001 11.0215C3.4984 10.0375 3.69063 9.06275 4.06573 8.15298C4.44083 7.24321 4.99145 6.41623 5.68614 5.71926C6.38084 5.02228 7.20602 4.46897 8.11455 4.0909C9.02309 3.71283 9.9972 3.51741 10.9813 3.5158H11.0058C12.0416 3.5152 13.0664 3.72947 14.0152 4.14509C14.9641 4.5607 15.8164 5.16862 16.5184 5.93042C17.2203 6.69222 17.7566 7.59135 18.0933 8.57097C18.4301 9.5506 18.56 10.5894 18.4748 11.6218C18.4608 12.0085 18.4485 12.3953 18.4993 12.8083C18.9148 15.5875 20.2462 18.1484 22.2824 20.0851C24.3186 22.0217 26.943 23.2232 29.7395 23.4991C30.0265 23.5236 30.2995 23.5113 30.576 23.4991H30.989ZM31.1115 18.5028C32.0956 18.4865 33.0668 18.2765 33.9697 17.8848C34.8726 17.4932 35.6895 16.9275 36.3738 16.2201C37.0581 15.5128 37.5964 14.6775 37.9579 13.7621C38.3194 12.8467 38.4971 11.8691 38.4808 10.885C38.4644 9.90099 38.2545 8.92978 37.8628 8.02687C37.4711 7.12396 36.9055 6.30704 36.1981 5.62274C35.4907 4.93844 34.6555 4.40017 33.7401 4.03866C32.8247 3.67715 31.8471 3.49948 30.863 3.5158C28.8756 3.54899 26.9828 4.3703 25.601 5.79907C24.2191 7.22784 23.4615 9.14703 23.4946 11.1344C23.5278 13.1218 24.3491 15.0146 25.7779 16.3965C27.2067 17.7783 29.1241 18.536 31.1115 18.5028ZM11.0075 23.4991C12.0011 23.4839 12.9878 23.6664 13.9101 24.0362C14.8325 24.4059 15.6721 24.9554 16.3801 25.6526C17.0881 26.3499 17.6503 27.181 18.0341 28.0976C18.4179 29.0142 18.6155 29.998 18.6155 30.9917C18.6155 31.9854 18.4179 32.9691 18.0341 33.8857C17.6503 34.8023 17.0881 35.6334 16.3801 36.3307C15.6721 37.028 14.8325 37.5774 13.9101 37.9472C12.9878 38.3169 12.0011 38.4995 11.0075 38.4843C9.04017 38.4542 7.16359 37.6516 5.78298 36.2497C4.40238 34.8479 3.62852 32.9592 3.62852 30.9917C3.62852 29.0241 4.40238 27.1355 5.78298 25.7336C7.16359 24.3317 9.04017 23.5291 11.0075 23.4991Z"
        fill="#6D38C3"
      />
    </Svg>
  );
};
export const Measurement = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M18.5 1.58606L22.914 6.00006L21.5 7.41406L19.5 5.41406V18.5861L21.5 16.5861L22.914 18.0001L18.5 22.4141L14.086 18.0001L15.5 16.5861L17.5 18.5861V5.41406L15.5 7.41406L14.086 6.00006L18.5 1.58606ZM2 2.00006H12V22.0001H2V2.00006ZM4 4.00006V20.0001H10V4.00006H4Z"
        fill="black"
        fill-opacity="0.6"
      />
    </Svg>
  );
};
export const Bed = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M21 10.78V8C21 6.35 19.65 5 18 5H14C13.23 5 12.53 5.3 12 5.78C11.47 5.3 10.77 5 10 5H6C4.35 5 3 6.35 3 8V10.78C2.39 11.33 2 12.12 2 13V18C2 18.55 2.45 19 3 19C3.55 19 4 18.55 4 18V17H20V18C20 18.55 20.45 19 21 19C21.55 19 22 18.55 22 18V13C22 12.12 21.61 11.33 21 10.78ZM14 7H18C18.55 7 19 7.45 19 8V10H13V8C13 7.45 13.45 7 14 7ZM5 8C5 7.45 5.45 7 6 7H10C10.55 7 11 7.45 11 8V10H5V8ZM4 15V13C4 12.45 4.45 12 5 12H19C19.55 12 20 12.45 20 13V15H4Z"
        fill="black"
        fill-opacity="0.6"
      />
    </Svg>
  );
};
export const BreakFast = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M1.338 1.96105C1.495 1.36205 2.041 1.00005 2.615 1.00005C2.969 1.00005 3.291 1.13305 3.536 1.35005C3.80612 1.12346 4.14743 0.999268 4.5 0.999268C4.85257 0.999268 5.19388 1.12346 5.464 1.35005C5.71748 1.12403 6.04539 0.999415 6.385 1.00005C6.959 1.00005 7.505 1.36205 7.662 1.96105C7.812 2.53305 8 3.45505 8 4.50005C7.99998 5.0836 7.85404 5.65789 7.57547 6.17067C7.2969 6.68344 6.89455 7.11843 6.405 7.43605C6.134 7.61305 6 7.84105 6 8.03605V8.43205C6 8.45472 6.00133 8.47672 6.004 8.49805C6.038 8.74605 6.161 9.66705 6.276 10.622C6.389 11.559 6.5 12.581 6.5 13C6.5 13.5305 6.28929 14.0392 5.91421 14.4143C5.53914 14.7893 5.03043 15 4.5 15C3.96957 15 3.46086 14.7893 3.08579 14.4143C2.71071 14.0392 2.5 13.5305 2.5 13C2.5 12.58 2.611 11.56 2.724 10.622C2.839 9.66705 2.962 8.74605 2.996 8.49805L3 8.43205V8.03605C3 7.84105 2.866 7.61305 2.595 7.43605C2.10545 7.11843 1.7031 6.68344 1.42453 6.17067C1.14596 5.65789 1.00002 5.0836 1 4.50005C1 3.45505 1.188 2.53305 1.338 1.96105ZM6 5.00005C6 5.13266 5.94732 5.25983 5.85355 5.3536C5.75979 5.44737 5.63261 5.50005 5.5 5.50005C5.36739 5.50005 5.24021 5.44737 5.14645 5.3536C5.05268 5.25983 5 5.13266 5 5.00005V2.50005C5 2.36744 4.94732 2.24026 4.85355 2.1465C4.75979 2.05273 4.63261 2.00005 4.5 2.00005C4.36739 2.00005 4.24021 2.05273 4.14645 2.1465C4.05268 2.24026 4 2.36744 4 2.50005V5.00005C4 5.13266 3.94732 5.25983 3.85355 5.3536C3.75979 5.44737 3.63261 5.50005 3.5 5.50005C3.36739 5.50005 3.24021 5.44737 3.14645 5.3536C3.05268 5.25983 3 5.13266 3 5.00005V2.38505C3 2.28294 2.95944 2.18501 2.88724 2.11281C2.81503 2.04061 2.71711 2.00005 2.615 2.00005C2.449 2.00005 2.335 2.09905 2.305 2.21505C2.10793 2.96091 2.00546 3.72861 2 4.50005C1.99995 4.91709 2.10423 5.32751 2.30334 5.69394C2.50245 6.06038 2.79007 6.37118 3.14 6.59805C3.579 6.88305 4 7.38405 4 8.03605V8.43205C4 8.49872 3.99567 8.56538 3.987 8.63205C3.953 8.87805 3.831 9.79305 3.717 10.742C3.601 11.707 3.5 12.656 3.5 13C3.5 13.2653 3.60536 13.5196 3.79289 13.7072C3.98043 13.8947 4.23478 14 4.5 14C4.76522 14 5.01957 13.8947 5.20711 13.7072C5.39464 13.5196 5.5 13.2653 5.5 13C5.5 12.656 5.4 11.707 5.283 10.741C5.169 9.79305 5.047 8.87805 5.013 8.63105C5.00539 8.5653 5.00105 8.49922 5 8.43305V8.03705C5 7.38505 5.421 6.88405 5.86 6.59905C6.21007 6.37209 6.49778 6.06113 6.6969 5.6945C6.89601 5.32788 7.00021 4.91725 7 4.50005C7 3.56805 6.832 2.73605 6.695 2.21505C6.665 2.10005 6.55 2.00005 6.385 2.00005C6.28289 2.00005 6.18497 2.04061 6.11276 2.11281C6.04056 2.18501 6 2.28294 6 2.38505V5.00005ZM9 5.50005C9 4.30657 9.47411 3.16198 10.318 2.31807C11.1619 1.47415 12.3065 1.00005 13.5 1.00005C13.6326 1.00005 13.7598 1.05273 13.8536 1.1465C13.9473 1.24026 14 1.36744 14 1.50005V7.47305L14.019 7.65005C14.0986 8.39638 14.1749 9.14306 14.248 9.89005C14.371 11.146 14.5 12.554 14.5 13C14.5 13.5305 14.2893 14.0392 13.9142 14.4143C13.5391 14.7893 13.0304 15 12.5 15C11.9696 15 11.4609 14.7893 11.0858 14.4143C10.7107 14.0392 10.5 13.5305 10.5 13C10.5 12.554 10.629 11.146 10.752 9.89005C10.815 9.25305 10.878 8.64305 10.925 8.19105L10.945 8.00005H10C9.73478 8.00005 9.48043 7.89469 9.29289 7.70716C9.10536 7.51962 9 7.26526 9 7.00005V5.50005ZM11.997 7.55305L11.976 7.75505C11.8978 8.49916 11.8218 9.2435 11.748 9.98805C11.621 11.275 11.5 12.618 11.5 13C11.5 13.2653 11.6054 13.5196 11.7929 13.7072C11.9804 13.8947 12.2348 14 12.5 14C12.7652 14 13.0196 13.8947 13.2071 13.7072C13.3946 13.5196 13.5 13.2653 13.5 13C13.5 12.617 13.379 11.275 13.252 9.98805C13.1787 9.24345 13.1027 8.49911 13.024 7.75505L13.003 7.55405L13 7.50005V2.03505C12.1669 2.1553 11.4049 2.5718 10.854 3.2082C10.303 3.8446 9.99978 4.65826 10 5.50005V7.00005H11.5C11.5701 7.00007 11.6394 7.01485 11.7035 7.04341C11.7675 7.07197 11.8248 7.11368 11.8717 7.16583C11.9186 7.21798 11.9539 7.2794 11.9755 7.34611C11.9971 7.41282 12.0044 7.48333 11.997 7.55305Z"
        fill="black"
        fill-opacity="0.7"
      />
    </Svg>
  );
};
export const Buildings = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M8.25 19.5V22.5M3.75 1.5H12.75C13.1478 1.5 13.5294 1.65804 13.8107 1.93934C14.092 2.22064 14.25 2.60218 14.25 3V22.3125C14.25 22.3622 14.2302 22.4099 14.1951 22.4451C14.1599 22.4802 14.1122 22.5 14.0625 22.5H2.25V3C2.25 2.60218 2.40804 2.22064 2.68934 1.93934C2.97064 1.65804 3.35218 1.5 3.75 1.5ZM15 9H20.25C20.6478 9 21.0294 9.15804 21.3107 9.43934C21.592 9.72064 21.75 10.1022 21.75 10.5V22.5H14.25V9.75C14.25 9.55109 14.329 9.36032 14.4697 9.21967C14.6103 9.07902 14.8011 9 15 9Z"
        stroke="#7F8387"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.59726 20.2437C4.44193 20.264 4.28414 20.2351 4.14603 20.1612C4.00792 20.0873 3.89643 19.972 3.8272 19.8314C3.75798 19.6909 3.73449 19.5322 3.76004 19.3777C3.7856 19.2231 3.8589 19.0804 3.96967 18.9697C4.08044 18.8589 4.22312 18.7856 4.37767 18.76C4.53223 18.7345 4.6909 18.758 4.83143 18.8272C4.97196 18.8964 5.08728 19.0079 5.16122 19.146C5.23515 19.2841 5.26398 19.4419 5.24367 19.5973C5.22223 19.7612 5.14723 19.9134 5.03033 20.0303C4.91343 20.1472 4.76119 20.2222 4.59726 20.2437ZM4.59726 16.4937C4.44193 16.514 4.28414 16.4851 4.14603 16.4112C4.00792 16.3373 3.89643 16.222 3.8272 16.0814C3.75798 15.9409 3.73449 15.7822 3.76004 15.6277C3.7856 15.4731 3.8589 15.3304 3.96967 15.2197C4.08044 15.1089 4.22312 15.0356 4.37767 15.01C4.53223 14.9845 4.6909 15.008 4.83143 15.0772C4.97196 15.1464 5.08728 15.2579 5.16122 15.396C5.23515 15.5341 5.26398 15.6919 5.24367 15.8473C5.22223 16.0112 5.14723 16.1634 5.03033 16.2803C4.91343 16.3972 4.76119 16.4722 4.59726 16.4937ZM4.59726 12.7437C4.44193 12.764 4.28414 12.7351 4.14603 12.6612C4.00792 12.5873 3.89643 12.472 3.8272 12.3314C3.75798 12.1909 3.73449 12.0322 3.76004 11.8777C3.7856 11.7231 3.8589 11.5804 3.96967 11.4697C4.08044 11.3589 4.22312 11.2856 4.37767 11.26C4.53223 11.2345 4.6909 11.258 4.83143 11.3272C4.97196 11.3964 5.08728 11.5079 5.16122 11.646C5.23515 11.7841 5.26398 11.9419 5.24367 12.0973C5.22223 12.2612 5.14723 12.4134 5.03033 12.5303C4.91343 12.6472 4.76119 12.7222 4.59726 12.7437ZM4.59726 8.99367C4.44193 9.01398 4.28414 8.98515 4.14603 8.91122C4.00792 8.83728 3.89643 8.72196 3.8272 8.58143C3.75798 8.4409 3.73449 8.28223 3.76004 8.12767C3.7856 7.97312 3.8589 7.83044 3.96967 7.71967C4.08044 7.6089 4.22312 7.5356 4.37767 7.51004C4.53223 7.48449 4.6909 7.50798 4.83143 7.57721C4.97196 7.64643 5.08728 7.75792 5.16122 7.89603C5.23515 8.03414 5.26398 8.19193 5.24367 8.34726C5.22223 8.51119 5.14723 8.66343 5.03033 8.78033C4.91343 8.89723 4.76119 8.97223 4.59726 8.99367ZM4.59726 5.24367C4.44193 5.26398 4.28414 5.23515 4.14603 5.16122C4.00792 5.08728 3.89643 4.97196 3.8272 4.83143C3.75798 4.6909 3.73449 4.53223 3.76004 4.37767C3.7856 4.22312 3.8589 4.08044 3.96967 3.96967C4.08044 3.8589 4.22312 3.7856 4.37767 3.76004C4.53223 3.73449 4.6909 3.75798 4.83143 3.8272C4.97196 3.89643 5.08728 4.00792 5.16122 4.14603C5.23515 4.28414 5.26398 4.44193 5.24367 4.59726C5.22223 4.76119 5.14723 4.91343 5.03033 5.03033C4.91343 5.14723 4.76119 5.22223 4.59726 5.24367ZM8.34726 16.4937C8.19193 16.514 8.03414 16.4851 7.89603 16.4112C7.75792 16.3373 7.64643 16.222 7.57721 16.0814C7.50798 15.9409 7.48449 15.7822 7.51005 15.6277C7.5356 15.4731 7.6089 15.3304 7.71967 15.2197C7.83044 15.1089 7.97312 15.0356 8.12767 15.01C8.28223 14.9845 8.4409 15.008 8.58143 15.0772C8.72196 15.1464 8.83728 15.2579 8.91122 15.396C8.98515 15.5341 9.01398 15.6919 8.99367 15.8473C8.97223 16.0112 8.89723 16.1634 8.78033 16.2803C8.66343 16.3972 8.51119 16.4722 8.34726 16.4937ZM8.34726 12.7437C8.19193 12.764 8.03414 12.7351 7.89603 12.6612C7.75792 12.5873 7.64643 12.472 7.57721 12.3314C7.50798 12.1909 7.48449 12.0322 7.51005 11.8777C7.5356 11.7231 7.6089 11.5804 7.71967 11.4697C7.83044 11.3589 7.97312 11.2856 8.12767 11.26C8.28223 11.2345 8.4409 11.258 8.58143 11.3272C8.72196 11.3964 8.83728 11.5079 8.91122 11.646C8.98515 11.7841 9.01398 11.9419 8.99367 12.0973C8.97223 12.2612 8.89723 12.4134 8.78033 12.5303C8.66343 12.6472 8.51119 12.7222 8.34726 12.7437ZM8.34726 8.99367C8.19193 9.01398 8.03414 8.98515 7.89603 8.91122C7.75792 8.83728 7.64643 8.72196 7.57721 8.58143C7.50798 8.4409 7.48449 8.28223 7.51005 8.12767C7.5356 7.97312 7.6089 7.83044 7.71967 7.71967C7.83044 7.6089 7.97312 7.5356 8.12767 7.51004C8.28223 7.48449 8.4409 7.50798 8.58143 7.57721C8.72196 7.64643 8.83728 7.75792 8.91122 7.89603C8.98515 8.03414 9.01398 8.19193 8.99367 8.34726C8.97223 8.51119 8.89723 8.66343 8.78033 8.78033C8.66343 8.89723 8.51119 8.97223 8.34726 8.99367ZM8.34726 5.24367C8.19193 5.26398 8.03414 5.23515 7.89603 5.16122C7.75792 5.08728 7.64643 4.97196 7.57721 4.83143C7.50798 4.6909 7.48449 4.53223 7.51005 4.37767C7.5356 4.22312 7.6089 4.08044 7.71967 3.96967C7.83044 3.8589 7.97312 3.7856 8.12767 3.76004C8.28223 3.73449 8.4409 3.75798 8.58143 3.8272C8.72196 3.89643 8.83728 4.00792 8.91122 4.14603C8.98515 4.28414 9.01398 4.44193 8.99367 4.59726C8.97223 4.76119 8.89723 4.91343 8.78033 5.03033C8.66343 5.14723 8.51119 5.22223 8.34726 5.24367ZM12.0973 20.2437C11.9419 20.264 11.7841 20.2351 11.646 20.1612C11.5079 20.0873 11.3964 19.972 11.3272 19.8314C11.258 19.6909 11.2345 19.5322 11.26 19.3777C11.2856 19.2231 11.3589 19.0804 11.4697 18.9697C11.5804 18.8589 11.7231 18.7856 11.8777 18.76C12.0322 18.7345 12.1909 18.758 12.3314 18.8272C12.472 18.8964 12.5873 19.0079 12.6612 19.146C12.7352 19.2841 12.764 19.4419 12.7437 19.5973C12.7222 19.7612 12.6472 19.9134 12.5303 20.0303C12.4134 20.1472 12.2612 20.2222 12.0973 20.2437ZM12.0973 16.4937C11.9419 16.514 11.7841 16.4851 11.646 16.4112C11.5079 16.3373 11.3964 16.222 11.3272 16.0814C11.258 15.9409 11.2345 15.7822 11.26 15.6277C11.2856 15.4731 11.3589 15.3304 11.4697 15.2197C11.5804 15.1089 11.7231 15.0356 11.8777 15.01C12.0322 14.9845 12.1909 15.008 12.3314 15.0772C12.472 15.1464 12.5873 15.2579 12.6612 15.396C12.7352 15.5341 12.764 15.6919 12.7437 15.8473C12.7222 16.0112 12.6472 16.1634 12.5303 16.2803C12.4134 16.3972 12.2612 16.4722 12.0973 16.4937ZM12.0973 12.7437C11.9419 12.764 11.7841 12.7351 11.646 12.6612C11.5079 12.5873 11.3964 12.472 11.3272 12.3314C11.258 12.1909 11.2345 12.0322 11.26 11.8777C11.2856 11.7231 11.3589 11.5804 11.4697 11.4697C11.5804 11.3589 11.7231 11.2856 11.8777 11.26C12.0322 11.2345 12.1909 11.258 12.3314 11.3272C12.472 11.3964 12.5873 11.5079 12.6612 11.646C12.7352 11.7841 12.764 11.9419 12.7437 12.0973C12.7222 12.2612 12.6472 12.4134 12.5303 12.5303C12.4134 12.6472 12.2612 12.7222 12.0973 12.7437Z"
        fill="#7F8387"
      />
      <Path
        d="M12.5313 8.78007C12.8232 8.48809 12.8221 8.01351 12.5286 7.72007C12.2352 7.42663 11.7606 7.42544 11.4686 7.71742C11.1766 8.0094 11.1778 8.48398 11.4713 8.77742C11.7647 9.07086 12.2393 9.07205 12.5313 8.78007Z"
        fill="#7F8387"
      />
      <Path
        d="M12.0973 5.24367C11.9419 5.26398 11.7841 5.23515 11.646 5.16122C11.5079 5.08728 11.3964 4.97196 11.3272 4.83143C11.258 4.6909 11.2345 4.53223 11.26 4.37767C11.2856 4.22312 11.3589 4.08044 11.4697 3.96967C11.5804 3.8589 11.7231 3.7856 11.8777 3.76004C12.0322 3.73449 12.1909 3.75798 12.3314 3.8272C12.472 3.89643 12.5873 4.00792 12.6612 4.14603C12.7351 4.28414 12.764 4.44193 12.7437 4.59726C12.7222 4.76119 12.6472 4.91343 12.5303 5.03033C12.4134 5.14723 12.2612 5.22223 12.0973 5.24367ZM18.7498 18.7498C18.6014 18.7498 18.4564 18.7937 18.3331 18.8762C18.2097 18.9586 18.1136 19.0757 18.0569 19.2127C18.0001 19.3498 17.9852 19.5006 18.0142 19.6461C18.0431 19.7916 18.1145 19.9252 18.2194 20.0301C18.3243 20.135 18.458 20.2064 18.6034 20.2353C18.7489 20.2643 18.8997 20.2494 19.0368 20.1927C19.1738 20.1359 19.291 20.0398 19.3734 19.9164C19.4558 19.7931 19.4998 19.6481 19.4998 19.4998C19.4998 19.3008 19.4207 19.1101 19.2801 18.9694C19.1394 18.8288 18.9487 18.7498 18.7498 18.7498ZM18.7498 14.9998C18.6014 14.9998 18.4564 15.0437 18.3331 15.1262C18.2097 15.2086 18.1136 15.3257 18.0569 15.4627C18.0001 15.5998 17.9852 15.7506 18.0142 15.8961C18.0431 16.0416 18.1145 16.1752 18.2194 16.2801C18.3243 16.385 18.458 16.4564 18.6034 16.4853C18.7489 16.5143 18.8997 16.4994 19.0368 16.4427C19.1738 16.3859 19.291 16.2898 19.3734 16.1664C19.4558 16.0431 19.4998 15.8981 19.4998 15.7498C19.4998 15.5508 19.4207 15.3601 19.2801 15.2194C19.1394 15.0788 18.9487 14.9998 18.7498 14.9998ZM18.7498 11.2498C18.6014 11.2498 18.4564 11.2937 18.3331 11.3762C18.2097 11.4586 18.1136 11.5757 18.0569 11.7127C18.0001 11.8498 17.9852 12.0006 18.0142 12.1461C18.0431 12.2916 18.1145 12.4252 18.2194 12.5301C18.3243 12.635 18.458 12.7064 18.6034 12.7353C18.7489 12.7643 18.8997 12.7494 19.0368 12.6927C19.1738 12.6359 19.291 12.5398 19.3734 12.4164C19.4558 12.2931 19.4998 12.1481 19.4998 11.9998C19.4998 11.8008 19.4207 11.6101 19.2801 11.4694C19.1394 11.3288 18.9487 11.2498 18.7498 11.2498ZM15.7498 18.7498C15.6014 18.7498 15.4564 18.7937 15.3331 18.8762C15.2097 18.9586 15.1136 19.0757 15.0569 19.2127C15.0001 19.3498 14.9852 19.5006 15.0142 19.6461C15.0431 19.7916 15.1145 19.9252 15.2194 20.0301C15.3243 20.135 15.458 20.2064 15.6034 20.2353C15.7489 20.2643 15.8997 20.2494 16.0368 20.1927C16.1738 20.1359 16.291 20.0398 16.3734 19.9164C16.4558 19.7931 16.4998 19.6481 16.4998 19.4998C16.4998 19.3008 16.4207 19.1101 16.2801 18.9694C16.1394 18.8288 15.9487 18.7498 15.7498 18.7498ZM15.7498 14.9998C15.6014 14.9998 15.4564 15.0437 15.3331 15.1262C15.2097 15.2086 15.1136 15.3257 15.0569 15.4627C15.0001 15.5998 14.9852 15.7506 15.0142 15.8961C15.0431 16.0416 15.1145 16.1752 15.2194 16.2801C15.3243 16.385 15.458 16.4564 15.6034 16.4853C15.7489 16.5143 15.8997 16.4994 16.0368 16.4427C16.1738 16.3859 16.291 16.2898 16.3734 16.1664C16.4558 16.0431 16.4998 15.8981 16.4998 15.7498C16.4998 15.5508 16.4207 15.3601 16.2801 15.2194C16.1394 15.0788 15.9487 14.9998 15.7498 14.9998ZM15.7498 11.2498C15.6014 11.2498 15.4564 11.2937 15.3331 11.3762C15.2097 11.4586 15.1136 11.5757 15.0569 11.7127C15.0001 11.8498 14.9852 12.0006 15.0142 12.1461C15.0431 12.2916 15.1145 12.4252 15.2194 12.5301C15.3243 12.635 15.458 12.7064 15.6034 12.7353C15.7489 12.7643 15.8997 12.7494 16.0368 12.6927C16.1738 12.6359 16.291 12.5398 16.3734 12.4164C16.4558 12.2931 16.4998 12.1481 16.4998 11.9998C16.4998 11.8008 16.4207 11.6101 16.2801 11.4694C16.1394 11.3288 15.9487 11.2498 15.7498 11.2498Z"
        fill="#7F8387"
      />
    </Svg>
  );
};
export const Clock = ({ fill }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M11.9996 21.9996C10.7496 21.9996 9.57894 21.7623 8.48761 21.2876C7.39628 20.8129 6.44628 20.1713 5.63761 19.3626C4.82894 18.5539 4.18728 17.6039 3.71261 16.5126C3.23794 15.4213 3.00028 14.2503 2.99961 12.9996C2.99894 11.7489 3.23661 10.5783 3.71261 9.48761C4.18861 8.39694 4.82994 7.44694 5.63661 6.63761C6.44328 5.82828 7.39328 5.18661 8.48661 4.71261C9.57994 4.23861 10.7509 4.00094 11.9996 3.99961C13.2483 3.99828 14.4193 4.23594 15.5126 4.71261C16.6059 5.18928 17.5559 5.83094 18.3626 6.63761C19.1693 7.44428 19.8109 8.39428 20.2876 9.48761C20.7643 10.5809 21.0016 11.7516 20.9996 12.9996C20.9976 14.2476 20.7603 15.4186 20.2876 16.5126C19.8149 17.6066 19.1733 18.5566 18.3626 19.3626C17.5519 20.1686 16.6019 20.8103 15.5126 21.2876C14.4233 21.7649 13.2523 22.0023 11.9996 21.9996ZM14.7996 17.1996L16.1996 15.7996L12.9996 12.5996V7.99961H10.9996V13.3996L14.7996 17.1996ZM5.59961 2.34961L6.99961 3.74961L2.74961 7.99961L1.34961 6.59961L5.59961 2.34961ZM18.3996 2.34961L22.6496 6.59961L21.2496 7.99961L16.9996 3.74961L18.3996 2.34961ZM11.9996 19.9996C13.9496 19.9996 15.6039 19.3206 16.9626 17.9626C18.3213 16.6046 19.0003 14.9503 18.9996 12.9996C18.9989 11.0489 18.3199 9.39494 16.9626 8.03761C15.6053 6.68028 13.9509 6.00094 11.9996 5.99961C10.0483 5.99828 8.39428 6.67761 7.03761 8.03761C5.68094 9.39761 5.00161 11.0516 4.99961 12.9996C4.99761 14.9476 5.67694 16.6019 7.03761 17.9626C8.39828 19.3233 10.0523 20.0023 11.9996 19.9996Z"
        fill={fill}
      />
    </Svg>
  );
};