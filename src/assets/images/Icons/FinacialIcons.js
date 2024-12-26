import Svg, { G, Path, Defs, ClipPath, Rect, Circle } from "react-native-svg";

export const CardIcon = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
    >
      <Rect
        x="1"
        y="4"
        width="20"
        height="16"
        rx="5"
        stroke={color || "#373737"}
        stroke-width="1.5"
      />
      <Path
        d="M18 4.5V4.5C18 2.17692 15.8678 0.438981 13.5924 0.907438L4.99174 2.67817C2.66769 3.15665 1 5.20267 1 7.57546L1 11"
        stroke={color || "#373737"}
        stroke-width="1.5"
      />
      <Path
        d="M5 15.5H11"
        stroke={color || "#373737"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14 12C14 10.6193 15.1193 9.5 16.5 9.5H21V14.5H16.5C15.1193 14.5 14 13.3807 14 12V12Z"
        stroke={color || "#373737"}
        stroke-width="1.5"
      />
      <Path
        d="M16.5 12H16.7"
        stroke={color || "#373737"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const UPI = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.0002 6.25C8.63906 6.25 8.28146 6.32113 7.94782 6.45933C7.61417 6.59753 7.31102 6.8001 7.05565 7.05546C6.80029 7.31082 6.59773 7.61398 6.45953 7.94762C6.32133 8.28127 6.2502 8.63886 6.2502 9C6.2502 9.36114 6.32133 9.71873 6.45953 10.0524C6.59773 10.386 6.80029 10.6892 7.05565 10.9445C7.31102 11.1999 7.61417 11.4025 7.94782 11.5407C8.28146 11.6789 8.63906 11.75 9.0002 11.75C9.72954 11.75 10.429 11.4603 10.9447 10.9445C11.4605 10.4288 11.7502 9.72935 11.7502 9C11.7502 8.27065 11.4605 7.57118 10.9447 7.05546C10.429 6.53973 9.72954 6.25 9.0002 6.25ZM7.7502 9C7.7502 8.66848 7.88189 8.35054 8.11631 8.11612C8.35074 7.8817 8.66868 7.75 9.0002 7.75C9.33172 7.75 9.64966 7.8817 9.88408 8.11612C10.1185 8.35054 10.2502 8.66848 10.2502 9C10.2502 9.33152 10.1185 9.64946 9.88408 9.88388C9.64966 10.1183 9.33172 10.25 9.0002 10.25C8.66868 10.25 8.35074 10.1183 8.11631 9.88388C7.88189 9.64946 7.7502 9.33152 7.7502 9ZM9.0002 12.25C7.8042 12.25 6.6852 12.49 5.8362 12.915C5.0332 13.317 4.2502 14.011 4.2502 15V15.063C4.2482 15.573 4.2462 16.433 5.0602 17.022C5.4382 17.295 5.9372 17.47 6.5552 17.581C7.1782 17.693 7.9772 17.75 9.0002 17.75C10.0232 17.75 10.8222 17.693 11.4452 17.581C12.0632 17.47 12.5622 17.295 12.9402 17.021C13.7542 16.432 13.7522 15.573 13.7502 15.062V15C13.7502 14.01 12.9672 13.317 12.1642 12.915C11.3152 12.491 10.1962 12.25 9.0002 12.25ZM5.7502 15C5.7502 14.885 5.8632 14.579 6.5072 14.257C7.1072 13.957 7.9872 13.75 9.0002 13.75C10.0132 13.75 10.8942 13.957 11.4932 14.257C12.1372 14.579 12.2502 14.885 12.2502 15C12.2502 15.604 12.2112 15.697 12.0602 15.807C11.9382 15.895 11.6872 16.013 11.1802 16.105C10.6782 16.195 9.9772 16.25 9.0002 16.25C8.0232 16.25 7.3222 16.195 6.8202 16.105C6.3132 16.013 6.0622 15.895 5.9402 15.807C5.7882 15.697 5.7502 15.604 5.7502 15Z"
        fill={color || "black"}
      />
      <Path
        d="M19 12.75C19.1989 12.75 19.3897 12.671 19.5303 12.5303C19.671 12.3897 19.75 12.1989 19.75 12C19.75 11.8011 19.671 11.6103 19.5303 11.4697C19.3897 11.329 19.1989 11.25 19 11.25H15C14.8011 11.25 14.6103 11.329 14.4697 11.4697C14.329 11.6103 14.25 11.8011 14.25 12C14.25 12.1989 14.329 12.3897 14.4697 12.5303C14.6103 12.671 14.8011 12.75 15 12.75H19ZM19.75 9C19.75 9.19891 19.671 9.38968 19.5303 9.53033C19.3897 9.67098 19.1989 9.75 19 9.75H14C13.8011 9.75 13.6103 9.67098 13.4697 9.53033C13.329 9.38968 13.25 9.19891 13.25 9C13.25 8.80109 13.329 8.61032 13.4697 8.46967C13.6103 8.32902 13.8011 8.25 14 8.25H19C19.1989 8.25 19.3897 8.32902 19.5303 8.46967C19.671 8.61032 19.75 8.80109 19.75 9ZM19 15.75C19.1989 15.75 19.3897 15.671 19.5303 15.5303C19.671 15.3897 19.75 15.1989 19.75 15C19.75 14.8011 19.671 14.6103 19.5303 14.4697C19.3897 14.329 19.1989 14.25 19 14.25H16C15.8011 14.25 15.6103 14.329 15.4697 14.4697C15.329 14.6103 15.25 14.8011 15.25 15C15.25 15.1989 15.329 15.3897 15.4697 15.5303C15.6103 15.671 15.8011 15.75 16 15.75H19Z"
        fill={color || "black"}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.94398 3.25H14.056C15.894 3.25 17.35 3.25 18.489 3.403C19.661 3.561 20.61 3.893 21.359 4.641C22.107 5.39 22.439 6.339 22.597 7.511C22.75 8.651 22.75 10.106 22.75 11.944V12.056C22.75 13.894 22.75 15.35 22.597 16.489C22.439 17.661 22.107 18.61 21.359 19.359C20.61 20.107 19.661 20.439 18.489 20.597C17.349 20.75 15.894 20.75 14.056 20.75H9.94498C8.10698 20.75 6.65098 20.75 5.51198 20.597C4.33998 20.439 3.39098 20.107 2.64198 19.359C1.89398 18.61 1.56198 17.661 1.40398 16.489C1.25098 15.349 1.25098 13.894 1.25098 12.056V11.944C1.25098 10.106 1.25098 8.65 1.40398 7.511C1.56198 6.339 1.89398 5.39 2.64198 4.641C3.39098 3.893 4.33998 3.561 5.51198 3.403C6.65198 3.25 8.10598 3.25 9.94398 3.25ZM5.70998 4.89C4.70398 5.025 4.12398 5.279 3.69998 5.702C3.27798 6.125 3.02398 6.705 2.88898 7.711C2.75098 8.739 2.74898 10.093 2.74898 12C2.74898 13.907 2.75098 15.262 2.88898 16.29C3.02398 17.295 3.27798 17.875 3.70098 18.298C4.12398 18.721 4.70398 18.975 5.70998 19.11C6.73798 19.248 8.09198 19.25 9.99898 19.25H13.999C15.906 19.25 17.261 19.248 18.289 19.11C19.294 18.975 19.874 18.721 20.297 18.298C20.72 17.875 20.974 17.295 21.109 16.289C21.247 15.261 21.249 13.907 21.249 12C21.249 10.093 21.247 8.739 21.109 7.71C20.974 6.705 20.72 6.125 20.297 5.702C19.874 5.279 19.294 5.025 18.288 4.89C17.261 4.752 15.906 4.75 13.999 4.75H9.99898C8.09198 4.75 6.73898 4.752 5.70998 4.89Z"
        fill={color || "black"}
      />
    </Svg>
  );
};
export const BankAccount = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M5 18.235C5.9 17.3517 6.946 16.6557 8.138 16.147C9.33 15.6383 10.6173 15.3843 12 15.385C13.3827 15.3857 14.6703 15.6397 15.863 16.147C17.0557 16.6543 18.1013 17.3503 19 18.235V5.615C19 5.46167 18.936 5.32067 18.808 5.192C18.68 5.06333 18.5387 4.99933 18.384 5H5.616C5.462 5 5.32067 5.064 5.192 5.192C5.06333 5.32 4.99933 5.46133 5 5.616V18.235ZM12 13.077C12.8387 13.077 13.5483 12.7867 14.129 12.206C14.7097 11.6253 15 10.9157 15 10.077C15 9.23833 14.7097 8.52867 14.129 7.948C13.5483 7.36733 12.8387 7.077 12 7.077C11.1613 7.077 10.4517 7.36733 9.871 7.948C9.29033 8.52867 9 9.23833 9 10.077C9 10.9157 9.29033 11.6253 9.871 12.206C10.4517 12.7867 11.1613 13.077 12 13.077ZM5.616 20C5.15533 20 4.771 19.846 4.463 19.538C4.155 19.23 4.00067 18.8453 4 18.384V5.616C4 5.15533 4.15433 4.771 4.463 4.463C4.77167 4.155 5.156 4.00067 5.616 4H18.385C18.845 4 19.2293 4.15433 19.538 4.463C19.8467 4.77167 20.0007 5.156 20 5.616V18.385C20 18.845 19.846 19.2293 19.538 19.538C19.23 19.8467 18.8453 20.0007 18.384 20H5.616ZM5.885 19H18.115V18.827C17.2357 18.0003 16.278 17.3867 15.242 16.986C14.2067 16.5853 13.126 16.385 12 16.385C10.9 16.385 9.829 16.582 8.787 16.976C7.745 17.37 6.77767 17.9743 5.885 18.789V19ZM12 12.077C11.4553 12.077 10.9857 11.88 10.591 11.486C10.197 11.0913 10 10.6217 10 10.077C10 9.53233 10.197 9.06267 10.591 8.668C10.9857 8.274 11.4553 8.077 12 8.077C12.5447 8.077 13.0143 8.274 13.409 8.668C13.803 9.06267 14 9.53233 14 10.077C14 10.6217 13.803 11.0913 13.409 11.486C13.015 11.8807 12.5453 12.0777 12 12.077Z"
        fill={color || "black"}
      />
    </Svg>
  );
};
export const UPIScan = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M6 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V6M6 19H2C1.73478 19 1.48043 18.8946 1.29289 18.7071C1.10536 18.5196 1 18.2652 1 18V14M14 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V14M14 1H18C18.2652 1 18.5196 1.10536 18.7071 1.29289C18.8946 1.48043 19 1.73478 19 2V6M10 6V14M14 6V14M6 6V14"
        stroke="#6D38C3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export const AxisAccount = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="49"
      height="30"
      viewBox="0 0 49 30"
      fill="none"
    >
      <Circle cx="34" cy="15" r="15" fill="#F7A221" />
      <Circle cx="15" cy="15" r="15" fill="#D94850" opacity={0.82} />
    </Svg>
  );
};
export const VisaAccount = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="16"
      viewBox="0 0 48 16"
      fill="none"
    >
      <G clip-Path="url(#clip0_1348_4769)">
        <Path
          d="M24.8244 5.09459C24.7971 7.31454 26.7488 8.55329 28.2189 9.28987C29.7294 10.0455 30.2368 10.5302 30.2308 11.206C30.2196 12.2402 29.0259 12.6967 27.909 12.7144C25.9603 12.7455 24.8272 12.1735 23.9265 11.741L23.2245 15.1181C24.1283 15.5463 25.8017 15.9196 27.537 15.936C31.6104 15.936 34.2754 13.8688 34.2898 10.6636C34.3057 6.5957 28.8171 6.37054 28.8546 4.55232C28.8675 4.001 29.3792 3.41266 30.5004 3.26307C31.0554 3.18751 32.5875 3.12967 34.3245 3.95204L35.0062 0.684566C34.0721 0.33488 32.8716 3.62396e-05 31.3768 3.62396e-05C27.5428 3.62396e-05 24.8462 2.09546 24.8244 5.09459ZM41.5571 0.281482C40.8133 0.281482 40.1865 0.727553 39.9067 1.41208L34.0881 15.696H38.1585L38.9685 13.3945H43.9425L44.4124 15.696H48L44.8693 0.281482H41.5571ZM42.1266 4.44553L43.3013 10.2339H40.0841L42.1266 4.44553ZM19.8892 0.281674L16.6807 15.6958H20.5596L23.7666 0.281289L19.8892 0.281674ZM14.1512 0.281674L10.1139 10.7732L8.48081 1.85237C8.28919 0.856518 7.53244 0.281482 6.69206 0.281482H0.0924375L0 0.729095C1.35487 1.03136 2.89425 1.51888 3.82687 2.04052C4.39762 2.35917 4.56038 2.63772 4.74788 3.39493L7.84106 15.696H11.94L18.2243 0.281482L14.1512 0.281674Z"
          fill={color || "white"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1348_4769">
          <Rect width="48" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export const Wallet = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M7 9.33325H11.6667"
        stroke="black"
        stroke-opacity="0.6"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M24.3052 10.5H21.2695C19.187 10.5 17.5 12.0668 17.5 14C17.5 15.9332 19.1882 17.5 21.2683 17.5H24.3052C24.4032 17.5 24.451 17.5 24.4918 17.4977C25.1218 17.4592 25.6235 16.9937 25.6643 16.4092C25.6667 16.3718 25.6667 16.3263 25.6667 16.2365V11.7635C25.6667 11.6737 25.6667 11.6282 25.6643 11.5908C25.6223 11.0063 25.1218 10.5408 24.4918 10.5023C24.4522 10.5 24.4032 10.5 24.3052 10.5Z"
        stroke="black"
        stroke-opacity="0.6"
        stroke-width="1.5"
      />
      <Path
        d="M24.4593 10.5C24.3683 8.31596 24.0767 6.97663 23.1328 6.03396C21.7667 4.66663 19.5663 4.66663 15.1668 4.66663H11.6668C7.26733 4.66663 5.067 4.66663 3.70083 6.03396C2.3335 7.40013 2.3335 9.60046 2.3335 14C2.3335 18.3995 2.3335 20.5998 3.70083 21.966C5.067 23.3333 7.26733 23.3333 11.6668 23.3333H15.1668C19.5663 23.3333 21.7667 23.3333 23.1328 21.966C24.0767 21.0233 24.3695 19.684 24.4593 17.5"
        stroke="black"
        stroke-opacity="0.6"
        stroke-width="1.5"
      />
      <Path
        d="M20.9897 14H21.0014"
        stroke="black"
        stroke-opacity="0.6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export const NetBanking = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <G clip-Path="url(#clip0_688_3182)">
        <Path
          d="M24.4546 8.56461L24.4647 8.57029L24.4752 8.57549C24.6831 8.67929 24.858 8.83901 24.9802 9.03671C25.1023 9.2344 25.167 9.46225 25.1668 9.69465V9.69497V11.375C25.1668 11.9038 24.7374 12.3333 24.2085 12.3333H23.3335H22.8335V12.8333V22.1666V22.6666H23.3335H24.5002C24.677 22.6666 24.8465 22.7369 24.9716 22.8619C25.0966 22.9869 25.1668 23.1565 25.1668 23.3333C25.1668 23.5101 25.0966 23.6797 24.9716 23.8047C24.8465 23.9297 24.677 24 24.5002 24H3.50016C3.32335 24 3.15378 23.9297 3.02876 23.8047L2.6752 24.1583L3.02876 23.8047C2.90373 23.6797 2.8335 23.5101 2.8335 23.3333C2.8335 23.1565 2.90373 22.9869 3.02876 22.8619C3.15378 22.7369 3.32335 22.6666 3.50016 22.6666H4.66683H5.16683V22.1666V12.8333V12.3333H4.66683H3.79183C3.26297 12.3333 2.8335 11.9038 2.8335 11.375V9.69497C2.8335 9.26322 3.05486 8.86625 3.41248 8.63873L13.4504 3.02899C13.6215 2.9452 13.8096 2.90161 14.0002 2.90161C14.1904 2.90161 14.3774 2.94506 14.5488 3.02899L24.4546 8.56461ZM21.5002 12.8333V12.3333H21.0002H7.00016H6.50016V12.8333V22.1666V22.6666H7.00016H10.5002H11.0002V22.1666V15.6666H12.3335V22.1666V22.6666H12.8335H15.1668H15.6668V22.1666V15.6666H17.0002V22.1666V22.6666H17.5002H21.0002H21.5002V22.1666V12.8333ZM14.2453 4.36851L14.0002 4.23063L13.755 4.36851L4.4217 9.61851L4.16683 9.76188V10.0543V10.5V11H4.66683H23.3335H23.8335V10.5V10.0543V9.76188L23.5786 9.61851L14.2453 4.36851ZM14.0002 7.49997C14.177 7.49997 14.3465 7.57021 14.4716 7.69523C14.5966 7.82026 14.6668 7.98982 14.6668 8.16664C14.6668 8.34345 14.5966 8.51302 14.4716 8.63804C14.3465 8.76306 14.177 8.8333 14.0002 8.8333C13.8234 8.8333 13.6538 8.76306 13.5288 8.63804C13.4037 8.51302 13.3335 8.34345 13.3335 8.16664C13.3335 7.98982 13.4037 7.82026 13.5288 7.69523C13.6538 7.57021 13.8234 7.49997 14.0002 7.49997Z"
          stroke="black"
          stroke-opacity="0.6"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_688_3182">
          <Rect width="28" height="28" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export const Cash = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M24 11.5628C23.6284 11.4138 23.2814 11.3214 22.9939 11.2639C22.7544 11.216 22.5534 11.1917 22.4099 11.1794C22.338 11.1733 22.2803 11.1701 22.2391 11.1684C22.2184 11.1676 22.2019 11.1672 22.1897 11.1669L22.1748 11.1667L22.1699 11.1667L22.1681 11.1667L22.1673 11.1667L22.167 11.1667C22.1668 11.1667 22.1667 11.1667 22.1667 11.6667V11.1667C21.6804 11.1667 21.2141 10.9735 20.8703 10.6297C20.5265 10.2859 20.3333 9.81956 20.3333 9.33333V8.83333H19.8333H8.16667H7.66667V9.33333C7.66667 9.81956 7.47351 10.2859 7.1297 10.6297C6.78588 10.9735 6.31956 11.1667 5.83333 11.1667H5.33333V11.6667V16.3333V16.8333H5.83333C6.31956 16.8333 6.78588 17.0265 7.1297 17.3703C7.47351 17.7141 7.66667 18.1804 7.66667 18.6667V19.1667H8.16667H14.7444C14.8346 19.6289 14.9562 20.0643 15.0833 20.5H4V7.5H24V11.5628ZM19.6833 18.2C19.6833 19.1488 20.464 20.1 21.5833 20.1C22.1329 20.1 22.6369 19.866 22.9869 19.5161C23.3264 19.1766 23.5556 18.6884 23.4828 18.159C23.4699 17.6623 23.2232 17.2077 22.8994 16.8839C22.5667 16.5513 22.0959 16.3 21.5833 16.3C20.6345 16.3 19.6833 17.0806 19.6833 18.2ZM21.5833 24.8979C21.5089 24.8086 21.4253 24.7069 21.3343 24.5942C20.9578 24.128 20.4566 23.4764 19.9565 22.7333C19.4553 21.9888 18.9614 21.1614 18.5942 20.3432C18.224 19.5181 18 18.7399 18 18.0833C18 16.1428 19.6428 14.5 21.5833 14.5C23.5239 14.5 25.1667 16.1428 25.1667 18.0833C25.1667 18.7399 24.9427 19.5181 24.5725 20.3432C24.2053 21.1614 23.7113 21.9888 23.2102 22.7333C22.71 23.4764 22.2089 24.128 21.8324 24.5942C21.7414 24.7069 21.6577 24.8086 21.5833 24.8979ZM14 11C15.2972 11 16.4268 11.8649 16.8196 13.0263C15.7672 14.0519 15.009 15.3662 14.7233 16.884C14.4912 16.9533 14.2703 17 14 17C12.2928 17 11 15.7072 11 14C11 12.2928 12.2928 11 14 11Z"
        stroke="black"
        stroke-opacity="0.6"
      />
    </Svg>
  );
};
export const Cred = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M23.9242 19.5726L14.0157 25.375L4.07568 19.5726V2.625H23.9242V19.5726Z"
        stroke="black"
        stroke-opacity="0.6"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.3796 12.7587V18.1441L14.0115 22.4584L6.62012 18.1441V8.45841H13.9999M9.12612 5.54175H21.3796V10.0422"
        stroke="black"
        stroke-opacity="0.6"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.7827 17.3308L14.0074 19.5416L9.16455 16.7148V13.1821"
        stroke="black"
        stroke-opacity="0.6"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};