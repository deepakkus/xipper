import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const PhoneIcon = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      width="24"
      height="24"
      viewBox="0 0 24 20"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.77769 1.70258C5.79185 0.694251 7.46185 0.873418 8.31102 2.00842L9.36269 3.41175C10.0544 4.33508 9.99269 5.62508 9.17185 6.44092L8.97352 6.63925C8.95112 6.72252 8.94884 6.80992 8.96685 6.89425C9.01935 7.23425 9.30352 7.95425 10.4935 9.13758C11.6835 10.3209 12.4085 10.6043 12.7535 10.6576C12.8404 10.6761 12.9304 10.6735 13.016 10.6501L13.356 10.3118C14.086 9.58675 15.206 9.45092 16.1094 9.94175L17.701 10.8084C19.0652 11.5484 19.4094 13.4018 18.2927 14.5126L17.1085 15.6893C16.7352 16.0601 16.2335 16.3693 15.6219 16.4268C14.1135 16.5676 10.5994 16.3876 6.90519 12.7151C3.45769 9.28675 2.79602 6.29675 2.71185 4.82342C2.67019 4.07842 3.02185 3.44842 3.47019 3.00342L4.77769 1.70258ZM7.31102 2.75758C6.88852 2.19342 6.10185 2.14842 5.65852 2.58925L4.35019 3.88925C4.07519 4.16258 3.94352 4.46425 3.96019 4.75258C4.02685 5.92342 4.56019 8.62092 7.78685 11.8293C11.1719 15.1943 14.2977 15.2951 15.506 15.1818C15.7527 15.1593 15.9977 15.0309 16.2269 14.8034L17.4102 13.6259C17.8919 13.1476 17.786 12.2759 17.1044 11.9059L15.5127 11.0401C15.0727 10.8018 14.5577 10.8801 14.2377 11.1984L13.8585 11.5759L13.4169 11.1326C13.8585 11.5759 13.8577 11.5768 13.8569 11.5768L13.856 11.5784L13.8535 11.5809L13.8477 11.5859L13.8352 11.5976C13.7998 11.6299 13.7619 11.6595 13.7219 11.6859C13.6552 11.7301 13.5669 11.7793 13.456 11.8201C13.231 11.9043 12.9327 11.9493 12.5644 11.8926C11.8419 11.7818 10.8844 11.2893 9.61185 10.0243C8.34019 8.75925 7.84352 7.80758 7.73185 7.08592C7.67435 6.71759 7.72019 6.41925 7.80519 6.19425C7.85232 6.06781 7.91927 5.94966 8.00352 5.84425L8.03019 5.81508L8.04185 5.80258L8.04685 5.79758L8.04935 5.79508L8.05102 5.79342L8.29102 5.55508C8.64769 5.19925 8.69769 4.61008 8.36185 4.16092L7.31102 2.75758Z"
        fill={color || "black"}
      />
    </Svg>
  );
};
export const LocationIcon = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M11.875 8.75C11.875 8.25272 11.6775 7.7758 11.3258 7.42417C10.9742 7.07254 10.4973 6.875 10 6.875C9.50272 6.875 9.02581 7.07254 8.67417 7.42417C8.32254 7.7758 8.125 8.25272 8.125 8.75C8.125 9.24728 8.32254 9.72419 8.67417 10.0758C9.02581 10.4275 9.50272 10.625 10 10.625C10.4973 10.625 10.9742 10.4275 11.3258 10.0758C11.6775 9.72419 11.875 9.24728 11.875 8.75ZM17.5 8.75C17.5 12.3425 13.6288 16.27 11.4488 18.1975C11.0501 18.5535 10.5344 18.7502 10 18.7502C9.46558 18.7502 8.94986 18.5535 8.55125 18.1975C6.37125 16.27 2.5 12.3425 2.5 8.75C2.5 7.76509 2.69399 6.78982 3.0709 5.87987C3.44781 4.96993 4.00026 4.14314 4.6967 3.4467C5.39314 2.75026 6.21993 2.19781 7.12987 1.8209C8.03982 1.44399 9.01509 1.25 10 1.25C10.9849 1.25 11.9602 1.44399 12.8701 1.8209C13.7801 2.19781 14.6069 2.75026 15.3033 3.4467C15.9997 4.14314 16.5522 4.96993 16.9291 5.87987C17.306 6.78982 17.5 7.76509 17.5 8.75ZM16.25 8.75C16.25 7.0924 15.5915 5.50268 14.4194 4.33058C13.2473 3.15848 11.6576 2.5 10 2.5C8.3424 2.5 6.75269 3.15848 5.58058 4.33058C4.40848 5.50268 3.75 7.0924 3.75 8.75C3.75 10.135 4.51875 11.7437 5.7125 13.3537C6.88 14.9262 8.32125 16.325 9.37875 17.2612C9.5489 17.4155 9.77034 17.5009 10 17.5009C10.2297 17.5009 10.4511 17.4155 10.6213 17.2612C11.6788 16.325 13.1213 14.9275 14.2875 13.3537C15.4813 11.7437 16.25 10.135 16.25 8.75Z"
        fill={color || "black"}
      />
    </Svg>
  );
};
export const EmailIcon = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M17.5 3.75H2.5C2.16848 3.75 1.85054 3.8817 1.61612 4.11612C1.3817 4.35054 1.25 4.66848 1.25 5V15C1.25 15.3315 1.3817 15.6495 1.61612 15.8839C1.85054 16.1183 2.16848 16.25 2.5 16.25H17.5C17.8315 16.25 18.1495 16.1183 18.3839 15.8839C18.6183 15.6495 18.75 15.3315 18.75 15V5C18.75 4.66848 18.6183 4.35054 18.3839 4.11612C18.1495 3.8817 17.8315 3.75 17.5 3.75ZM16.125 5L10 9.2375L3.875 5H16.125ZM2.5 15V5.56875L9.64375 10.5125C9.74837 10.5851 9.87267 10.624 10 10.624C10.1273 10.624 10.2516 10.5851 10.3562 10.5125L17.5 5.56875V15H2.5Z"
        fill={color || "black"}
      />
    </Svg>
  );
};
export const BirthdayIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M3.33333 13.7498V16.6665C3.33333 17.1085 3.50893 17.5325 3.82149 17.845C4.13405 18.1576 4.55797 18.3332 5 18.3332H15C15.442 18.3332 15.866 18.1576 16.1785 17.845C16.4911 17.5325 16.6667 17.1085 16.6667 16.6665V13.7498M2.5 11.6665V10.8332C2.5 10.3911 2.67559 9.96722 2.98816 9.65466C3.30072 9.3421 3.72464 9.1665 4.16667 9.1665H15.8333C16.2754 9.1665 16.6993 9.3421 17.0118 9.65466C17.3244 9.96722 17.5 10.3911 17.5 10.8332V11.6665M10 6.6665V9.1665M10 6.6665C11.0517 6.6665 11.6667 5.85984 11.6667 4.479C11.6667 3.09817 10 1.6665 10 1.6665C10 1.6665 8.33333 3.09817 8.33333 4.479C8.33333 5.85984 8.94833 6.6665 10 6.6665Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.5 11.6665C2.5 12.3295 2.76339 12.9654 3.23223 13.4343C3.70107 13.9031 4.33696 14.1665 5 14.1665C5.66304 14.1665 6.29893 13.9031 6.76777 13.4343C7.23661 12.9654 7.5 12.3295 7.5 11.6665C7.5 12.3295 7.76339 12.9654 8.23223 13.4343C8.70107 13.9031 9.33696 14.1665 10 14.1665C10.663 14.1665 11.2989 13.9031 11.7678 13.4343C12.2366 12.9654 12.5 12.3295 12.5 11.6665C12.5 12.3295 12.7634 12.9654 13.2322 13.4343C13.7011 13.9031 14.337 14.1665 15 14.1665C15.663 14.1665 16.2989 13.9031 16.7678 13.4343C17.2366 12.9654 17.5 12.3295 17.5 11.6665"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export const GovernmentIdIcon = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M17.75 3C18.612 3 19.4386 3.34241 20.0481 3.9519C20.6576 4.5614 21 5.38805 21 6.25V17.75C21 18.612 20.6576 19.4386 20.0481 20.0481C19.4386 20.6576 18.612 21 17.75 21H6.25C5.38805 21 4.5614 20.6576 3.9519 20.0481C3.34241 19.4386 3 18.612 3 17.75V6.25C3 5.38805 3.34241 4.5614 3.9519 3.9519C4.5614 3.34241 5.38805 3 6.25 3H17.75ZM17.75 4.5H6.25C5.78587 4.5 5.34075 4.68437 5.01256 5.01256C4.68437 5.34075 4.5 5.78587 4.5 6.25V17.75C4.5 18.716 5.284 19.5 6.25 19.5H17.75C18.2141 19.5 18.6592 19.3156 18.9874 18.9874C19.3156 18.6592 19.5 18.2141 19.5 17.75V6.25C19.5 5.78587 19.3156 5.34075 18.9874 5.01256C18.6592 4.68437 18.2141 4.5 17.75 4.5ZM7.75 7C7.93124 7.00001 8.10634 7.06564 8.24293 7.18477C8.37952 7.30389 8.46835 7.46845 8.493 7.648L8.5 7.75V8.75C8.49994 8.94002 8.42776 9.12294 8.29803 9.26179C8.1683 9.40064 7.9907 9.48507 7.80112 9.49803C7.61154 9.51098 7.42411 9.45149 7.2767 9.33157C7.12929 9.21165 7.0329 9.04025 7.007 8.852L7 8.75V7.75C7 7.55109 7.07902 7.36032 7.21967 7.21967C7.36032 7.07902 7.55109 7 7.75 7ZM8.493 15.148C8.4671 14.9598 8.37071 14.7883 8.2233 14.6684C8.07589 14.5485 7.88846 14.489 7.69888 14.502C7.5093 14.5149 7.3317 14.5994 7.20197 14.7382C7.07224 14.8771 7.00006 15.06 7 15.25V16.25L7.007 16.352C7.0329 16.5402 7.12929 16.7117 7.2767 16.8316C7.42411 16.9515 7.61154 17.011 7.80112 16.998C7.9907 16.9851 8.1683 16.9006 8.29803 16.7618C8.42776 16.6229 8.49994 16.44 8.5 16.25V15.25L8.493 15.148ZM8.5 11.321C8.4741 11.1328 8.37771 10.9613 8.2303 10.8414C8.08289 10.7215 7.89546 10.662 7.70588 10.675C7.5163 10.6879 7.3387 10.7724 7.20897 10.9112C7.07924 11.0501 7.00706 11.233 7.007 11.423L7 12.57L7.007 12.672C7.0329 12.8602 7.12929 13.0317 7.2767 13.1516C7.42411 13.2715 7.61154 13.331 7.80112 13.318C7.9907 13.3051 8.1683 13.2206 8.29803 13.0818C8.42776 12.9429 8.49994 12.76 8.5 12.57L8.507 11.422L8.5 11.321Z"
        fill={color || "black"}
      />
    </Svg>
  );
};

export const FamilyIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_173_845)">
        <Path
          d="M11.9332 11.5336C13.7332 11.5336 15.1332 10.0669 15.1332 8.26689C15.1332 6.46689 13.6665 5.06689 11.8665 5.06689C10.0665 5.06689 8.6665 6.53356 8.6665 8.26689C8.6665 10.0669 10.1332 11.5336 11.9332 11.5336ZM11.8665 6.40023C11.9332 6.40023 11.9332 6.40023 11.8665 6.40023C12.9332 6.40023 13.7998 7.26689 13.7998 8.33356C13.7998 9.40023 12.9332 10.2002 11.8665 10.2002C10.7998 10.2002 9.99984 9.33356 9.99984 8.33356C9.99984 7.26689 10.8665 6.40023 11.8665 6.40023Z"
          fill="black"
        />
        <Path
          d="M21.8 11.1331C20.5333 9.99978 18.8667 9.39978 17.1333 9.46644H16.6C16.4667 9.99978 16.2667 10.4664 16 10.8664C16.4 10.7998 16.7333 10.7998 17.1333 10.7998C18.4 10.7331 19.6667 11.1331 20.6667 11.8664V16.6664H22V11.3331L21.8 11.1331Z"
          fill="black"
        />
        <Path
          d="M15.5998 5.20003C15.9332 4.40003 16.8665 4.00003 17.7332 4.33337C18.5332 4.6667 18.9332 5.60003 18.5998 6.4667C18.3332 7.0667 17.7332 7.4667 17.1332 7.4667C16.9998 7.4667 16.7998 7.4667 16.6665 7.40003C16.7332 7.73337 16.7332 8.0667 16.7332 8.33337V8.73337C16.8665 8.73337 16.9998 8.80003 17.1332 8.80003C18.7998 8.80003 20.1332 7.4667 20.1332 5.8667C20.1332 4.20003 18.7998 2.8667 17.1998 2.8667C16.1332 2.8667 15.1998 3.40003 14.6665 4.33337C14.9998 4.53337 15.3332 4.80003 15.5998 5.20003Z"
          fill="black"
        />
        <Path
          d="M8 10.9333C7.73333 10.5333 7.53333 10.0667 7.4 9.53335H6.86667C5.13333 9.46668 3.46667 10.0667 2.2 11.1333L2 11.3333V16.6667H3.33333V11.8667C4.4 11.1333 5.6 10.7333 6.86667 10.8C7.26667 10.8 7.66667 10.8667 8 10.9333Z"
          fill="black"
        />
        <Path
          d="M6.86668 8.73311C7.00001 8.73311 7.13334 8.73311 7.26667 8.66645V8.26645C7.26667 7.93311 7.26668 7.59978 7.33334 7.33311C7.20001 7.39978 7.00001 7.39978 6.86668 7.39978C6.00001 7.39978 5.26668 6.66645 5.26668 5.79978C5.26668 4.93311 6.00001 4.19978 6.86668 4.19978C7.53334 4.19978 8.13334 4.59978 8.40001 5.19978C8.66668 4.86645 9.06668 4.53311 9.40001 4.26645C8.53334 2.86645 6.73334 2.39978 5.33334 3.26645C3.93334 4.13311 3.46668 5.93311 4.33334 7.33311C4.86668 8.19978 5.80001 8.73311 6.86668 8.73311Z"
          fill="black"
        />
        <Path
          d="M17.3998 15.1333L17.2665 14.9333C15.9332 13.4667 14.0665 12.6 12.0665 12.6667C10.0665 12.6 8.13317 13.4667 6.79984 14.9333L6.6665 15.1333V20.2C6.6665 20.8 7.13317 21.3333 7.79984 21.3333H16.3332C16.9332 21.3333 17.4665 20.8 17.4665 20.2V15.1333H17.3998ZM16.0665 20H7.99984V15.6C9.0665 14.5333 10.5332 14 12.0665 14C13.5332 13.9333 14.9998 14.5333 16.0665 15.6V20Z"
          fill="black"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_173_845">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};