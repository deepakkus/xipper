import Svg, {Circle, ClipPath, Defs, G, Mask, Path} from 'react-native-svg';

export const HomeIcon = ({fill}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none">
      <Path
        d="M15.5737 2.07562C15.4074 1.94592 15.2025 1.87549 14.9916 1.87549C14.7806 1.87549 14.5757 1.94592 14.4094 2.07562L0.9375 12.5803L2.10281 14.0541L3.75 12.7697V24.375C3.75099 24.872 3.94885 25.3483 4.30027 25.6997C4.65169 26.0511 5.12802 26.249 5.625 26.25H24.375C24.872 26.249 25.3483 26.0511 25.6997 25.6997C26.0511 25.3483 26.249 24.872 26.25 24.375V12.7781L27.8972 14.0625L29.0625 12.5887L15.5737 2.07562ZM16.875 24.375H13.125V16.875H16.875V24.375ZM18.75 24.375V16.875C18.75 16.3777 18.5525 15.9008 18.2008 15.5492C17.8492 15.1975 17.3723 15 16.875 15H13.125C12.6277 15 12.1508 15.1975 11.7992 15.5492C11.4475 15.9008 11.25 16.3777 11.25 16.875V24.375H5.625V11.3081L15 4.00499L24.375 11.3175V24.375H18.75Z"
        fill={fill || '#7F8387'}
      />
    </Svg>
  );
};
export const OrdersIcon = ({fill}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1517 9.11625C11.3861 9.0334 11.6438 9.04705 11.8681 9.15417C12.0925 9.2613 12.2651 9.45314 12.348 9.6875C12.5418 10.2363 12.9011 10.7115 13.3762 11.0476C13.8514 11.3837 14.4191 11.5642 15.0011 11.5642C15.5831 11.5642 16.1508 11.3837 16.626 11.0476C17.1011 10.7115 17.4604 10.2363 17.6542 9.6875C17.6938 9.56955 17.7564 9.46064 17.8385 9.36714C17.9205 9.27363 18.0204 9.19739 18.1322 9.14287C18.244 9.08834 18.3656 9.05661 18.4898 9.04954C18.614 9.04246 18.7383 9.06017 18.8556 9.10165C18.9729 9.14312 19.0808 9.20753 19.1729 9.29111C19.2651 9.37469 19.3397 9.47577 19.3924 9.58847C19.4451 9.70117 19.4748 9.82323 19.4798 9.94754C19.4849 10.0718 19.4651 10.1959 19.4217 10.3125C19.0985 11.2267 18.4999 12.0182 17.7082 12.578C16.9165 13.1378 15.9707 13.4384 15.0011 13.4384C14.0315 13.4384 13.0857 13.1378 12.294 12.578C11.5023 12.0182 10.9037 11.2267 10.5805 10.3125C10.4976 10.0781 10.5113 9.82042 10.6184 9.59609C10.7255 9.37176 10.9174 9.19916 11.1517 9.11625ZM15.4517 6.875H14.5492C12.518 6.875 11.1655 6.87875 10.1405 7.005C9.16797 7.125 8.71922 7.33375 8.40422 7.595C8.08922 7.8575 7.80172 8.25875 7.50422 9.1925C7.19172 10.1762 6.93922 11.505 6.56422 13.5025C6.03922 16.3025 5.68672 18.2037 5.62422 19.6362C5.56422 21.0175 5.79547 21.605 6.12047 21.9963C6.44547 22.3875 6.97922 22.7225 8.34797 22.9175C9.76672 23.12 11.7017 23.125 14.5505 23.125H15.4505C18.3005 23.125 20.2342 23.12 21.653 22.9175C23.0217 22.7225 23.5555 22.3875 23.8805 21.9963C24.2055 21.6038 24.4367 21.0175 24.3767 19.6362C24.3142 18.2037 23.9617 16.3025 23.4367 13.5025C23.0617 11.505 22.8105 10.1775 22.4967 9.1925C22.1992 8.25875 21.9117 7.85625 21.5967 7.595C21.2817 7.33375 20.8342 7.125 19.8605 7.005C18.8355 6.87875 17.483 6.875 15.4517 6.875ZM7.20672 6.1525C5.81922 7.305 5.45297 9.25625 4.72172 13.1575C3.69297 18.6438 3.17797 21.3862 4.67797 23.1938C6.17797 25 8.96797 25 14.5505 25H15.4505C21.033 25 23.8242 25 25.3242 23.1938C26.8242 21.3862 26.3092 18.6437 25.2805 13.1562C24.5492 9.25625 24.183 7.305 22.7942 6.1525C21.4067 5 19.4205 5 15.4517 5H14.5492C10.5805 5 8.59547 5 7.20672 6.1525Z"
        fill={fill || '#7F8387'}
      />
    </Svg>
  );
};
export const InboxIcon = ({fill}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 32 30"
      fill="none">
      <Path
        d="M7.07 25.5988C6.89053 25.7548 6.67025 25.8564 6.43504 25.8917C6.19983 25.9269 5.95945 25.8943 5.74211 25.7978C5.52477 25.7012 5.3395 25.5446 5.20805 25.3464C5.0766 25.1481 5.00443 24.9165 5 24.6787V21.875C4.33696 21.875 3.70107 21.6116 3.23223 21.1428C2.76339 20.6739 2.5 20.038 2.5 19.375V10.625C2.5 9.96196 2.76339 9.32607 3.23223 8.85723C3.70107 8.38839 4.33696 8.125 5 8.125H18.75C19.413 8.125 20.0489 8.38839 20.5178 8.85723C20.9866 9.32607 21.25 9.96196 21.25 10.625V19.375C21.25 20.038 20.9866 20.6739 20.5178 21.1428C20.0489 21.6116 19.413 21.875 18.75 21.875H12.5037L7.07 25.5988ZM8.125 21.7325C8.2389 21.7318 8.35076 21.7022 8.45 21.6462L11.3937 19.5987C11.6033 19.4531 11.8523 19.375 12.1075 19.375H17.5C17.8315 19.375 18.1495 19.2433 18.3839 19.0089C18.6183 18.7745 18.75 18.4565 18.75 18.125V11.875C18.75 11.5435 18.6183 11.2255 18.3839 10.9911C18.1495 10.7567 17.8315 10.625 17.5 10.625H6.25C5.91848 10.625 5.60054 10.7567 5.36612 10.9911C5.1317 11.2255 5 11.5435 5 11.875V18.125C5 18.8 5.53625 19.3525 6.25 19.375C6.7625 19.395 7.13375 19.4788 7.305 19.6575C7.465 19.825 7.47375 20.1075 7.5 20.645C7.50375 20.7237 7.50375 20.8662 7.5 21.1075C7.5 21.2733 7.56585 21.4322 7.68306 21.5494C7.80027 21.6667 7.95924 21.7325 8.125 21.7325ZM22.5 15.645C22.496 15.7991 22.496 15.9534 22.5 16.1075V15.645ZM22.5 15.645C22.525 15.1075 22.535 14.825 22.695 14.6575C22.8663 14.4788 23.2375 14.395 23.75 14.375C24.4638 14.3525 25 13.8 25 13.125V6.875C25 6.54348 24.8683 6.22554 24.6339 5.99112C24.3995 5.7567 24.0815 5.625 23.75 5.625H12.5C12.1685 5.625 11.8505 5.7567 11.6161 5.99112C11.3817 6.22554 11.25 6.54348 11.25 6.875H8.75V5.625C8.75 4.96196 9.01339 4.32607 9.48223 3.85723C9.95107 3.38839 10.587 3.125 11.25 3.125H25C25.663 3.125 26.2989 3.38839 26.7678 3.85723C27.2366 4.32607 27.5 4.96196 27.5 5.625V14.375C27.5 15.038 27.2366 15.6739 26.7678 16.1428C26.2989 16.6116 25.663 16.875 25 16.875V19.6787C24.9956 19.9165 24.9234 20.1481 24.7919 20.3464C24.6605 20.5446 24.4752 20.7012 24.2579 20.7978C24.0406 20.8943 23.8002 20.9269 23.565 20.8917C23.3297 20.8564 23.1095 20.7548 22.93 20.5988L22.5 20.3037V15.645Z"
        fill={fill || '#7F8387'}
      />
    </Svg>
  );
};

export const AnalyticsIcon = ({fill}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 25 25"
      fill="none">
      <Path
        d="M9.75 8.25h1.5v4.5h-1.5v-4.5zM6 9.75h1.5v3H6v-3zm-3.75-4.5h1.5v7.5h-1.5v-7.5z"
        fill={fill||"#7F8387"}
      />
      <Path
        d="M23.25 21.44l-5.664-5.665A8.212 8.212 0 0019.5 10.5c0-4.549-3.7-8.25-8.25-8.25-1.802 0-3.513.57-4.95 1.65l.9 1.2a6.69 6.69 0 014.05-1.35A6.757 6.757 0 0118 10.5a6.757 6.757 0 01-6.75 6.75 6.699 6.699 0 01-5.4-2.7l-1.2.901a8.19 8.19 0 006.6 3.299 8.21 8.21 0 005.276-1.914L22.19 22.5l1.06-1.06z"
        fill={fill||"#7F8387"}
      />
    </Svg>
  );
};

export const OffersIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={29}
      height={31}
      viewBox="0 0 25 26"
      fill="none">
      <Path
        d="M22.16 11.58l-9-9C12.8 2.22 12.3 2 11.75 2h-7c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zm-8.41 8.43l-9-9.01V4h7v-.01l9 9-7 7.02z"
        fill="#7F8387"
      />
      <Path d="M7.25 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#7F8387" />
    </Svg>
  );
};

export const MenuIcon = ({fill}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="27"
      viewBox="0 0 30 29"
      fill="none">
      <Path
        d="M17.2893 5.39517C17.2893 8.20897 15.0098 10.4891 12.1968 10.4891C9.38375 10.4891 7.10425 8.20897 7.10425 5.39517C7.10425 2.58138 9.38375 0.30127 12.1968 0.30127C15.0098 0.30127 17.2893 2.58138 17.2893 5.39517ZM25.4075 0.30127C22.5944 0.30127 20.3149 2.58138 20.3149 5.39517C20.3149 8.20897 22.5944 10.4891 25.4075 10.4891C28.2205 10.4891 30.5 8.20897 30.5 5.39517C30.5 2.58138 28.2183 0.30127 25.4075 0.30127ZM5.59254 13.5111C2.7795 13.5111 0.5 15.7913 0.5 18.605C0.5 21.4188 2.7795 23.699 5.59254 23.699C8.40558 23.699 10.6851 21.4188 10.6851 18.605C10.6851 15.7913 8.40558 13.5111 5.59254 13.5111ZM18.801 13.5111C15.988 13.5111 13.7085 15.7913 13.7085 18.605C13.7085 21.4188 15.988 23.699 18.801 23.699C21.6141 23.699 23.8936 21.4188 23.8936 18.605C23.8936 15.7913 21.6141 13.5111 18.801 13.5111Z"
        fill={fill || '#7F8387'}
      />
    </Svg>
  );
};

export const StatsIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={207}
      height={225}
      viewBox="0 0 207 225"
      fill="none">
      <Mask id="a" fill="#fff">
        <Path d="M177.714 71.994c1.583-.976 2.081-3.054 1.04-4.595a80.554 80.554 0 00-49.921-33.682 80.56 80.56 0 00-59.326 10.34c-1.58.98-1.975 3.081-.929 4.618 1.046 1.538 3.136 1.93 4.72.954a73.828 73.828 0 0199.718 21.307c1.047 1.537 3.115 2.034 4.698 1.058z" />
      </Mask>
      <Path
        d="M177.714 71.994c1.583-.976 2.081-3.054 1.04-4.595a80.554 80.554 0 00-49.921-33.682 80.56 80.56 0 00-59.326 10.34c-1.58.98-1.975 3.081-.929 4.618 1.046 1.538 3.136 1.93 4.72.954a73.828 73.828 0 0199.718 21.307c1.047 1.537 3.115 2.034 4.698 1.058z"
        fill="#6D38C3"
        stroke="#6D38C3"
        strokeWidth={6}
        mask="url(#a)"
      />
      <Mask id="b" fill="#fff">
        <Path d="M187.873 120.891c1.837.203 3.499-1.122 3.625-2.966a79.689 79.689 0 00-8.897-42.367c-.857-1.638-2.911-2.182-4.511-1.257s-2.14 2.968-1.29 4.61a72.989 72.989 0 018.038 38.278c-.118 1.844 1.198 3.499 3.035 3.702z" />
      </Mask>
      <Path
        d="M187.873 120.891c1.837.203 3.499-1.122 3.625-2.966a79.689 79.689 0 00-8.897-42.367c-.857-1.638-2.911-2.182-4.511-1.257s-2.14 2.968-1.29 4.61a72.989 72.989 0 018.038 38.278c-.118 1.844 1.198 3.499 3.035 3.702z"
        fill="#FE830C"
        stroke="#FE830C"
        strokeWidth={6}
        mask="url(#b)"
      />
      <Path
        d="M107.942 188.729c-.098 1.846 1.319 3.429 3.168 3.449a79.685 79.685 0 0079.025-64.051c.363-1.813-.893-3.527-2.719-3.813-1.826-.286-3.53.965-3.9 2.776a72.986 72.986 0 01-72.051 58.398c-1.848-.013-3.424 1.395-3.523 3.241z"
        fill="#66FF6C"
      />
      <Path
        d="M107.942 188.729c-.098 1.846 1.319 3.429 3.168 3.449a79.685 79.685 0 0079.025-64.051c.363-1.813-.893-3.527-2.719-3.813-1.826-.286-3.53.965-3.9 2.776a72.986 72.986 0 01-72.051 58.398c-1.848-.013-3.424 1.395-3.523 3.241z"
        fill="#000"
        fillOpacity={0.05}
      />
      <Mask id="c" fill="#fff">
        <Path d="M35.737 115.83c-1.846.081-3.285 1.644-3.127 3.486a79.68 79.68 0 0068.183 72.074c1.829.26 3.47-1.09 3.653-2.929.183-1.839-1.161-3.471-2.99-3.738a72.989 72.989 0 01-62.153-65.7c-.165-1.841-1.72-3.274-3.566-3.193z" />
      </Mask>
      <Path
        d="M35.737 115.83c-1.846.081-3.285 1.644-3.127 3.486a79.68 79.68 0 0068.183 72.074c1.829.26 3.47-1.09 3.653-2.929.183-1.839-1.161-3.471-2.99-3.738a72.989 72.989 0 01-62.153-65.7c-.165-1.841-1.72-3.274-3.566-3.193z"
        fill="#777CFF"
        stroke="#777CFF"
        strokeWidth={6}
        mask="url(#c)"
      />
      <Path
        d="M64.379 52.842c-1.153-1.445-3.264-1.687-4.659-.474a79.682 79.682 0 00-27.312 56.349c-.087 1.846 1.41 3.353 3.258 3.363 1.849.011 3.347-1.48 3.442-3.326A72.99 72.99 0 0163.9 57.604c1.39-1.218 1.632-3.318.479-4.762z"
        fill="#F5EB00"
      />
      <Path
        d="M64.379 52.842c-1.153-1.445-3.264-1.687-4.659-.474a79.682 79.682 0 00-27.312 56.349c-.087 1.846 1.41 3.353 3.258 3.363 1.849.011 3.347-1.48 3.442-3.326A72.99 72.99 0 0163.9 57.604c1.39-1.218 1.632-3.318.479-4.762z"
        fill="#000"
        fillOpacity={0.05}
      />
    </Svg>
  );
};

export const DownArrowIcon = ({color, height, width}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={height || '18'}
      height={width || '19'}
      viewBox="-2 0 15 8"
      fill="none">
      <Path
        d="M4.375 5.083L7.5 7.375l3.125-2.292"
        stroke={color || '#000'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const TickCircleIcon = ({fill}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={28}
      viewBox="0 0 27 28"
      fill="none">
      <Circle cx={13.5} cy={14} r={13.5} fill={fill} />
    </Svg>
  );
};

export const BlankCircle = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={28}
      viewBox="0 0 27 28"
      fill="none">
      <Circle cx={13.5} cy={14} r={13.5} fill="#D9D9D9" />
    </Svg>
  );
};

export const DeliveryIcon = ({fill}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={33}
      viewBox="0 0 32 33"
      fill="none">
      <Path d="M4 16.5h12v2H4v-2zm-2-5h10v2H2v-2z" fill={fill} />
      <Path
        d="M29.92 17.106l-3-7A1 1 0 0026 9.5h-3v-2a1 1 0 00-1-1H6v2h15v12.556a3.999 3.999 0 00-1.858 2.444h-6.284a4 4 0 100 2h6.284a3.98 3.98 0 007.716 0H29a1 1 0 001-1v-7a1 1 0 00-.08-.394zM9 26.5a2 2 0 110-4 2 2 0 010 4zm14-15h2.34l2.144 5H23v-5zm0 15a2 2 0 110-3.999 2 2 0 010 3.999zm5-3h-1.142a3.995 3.995 0 00-3.858-3v-2h5v5z"
        fill={fill}
      />
    </Svg>
  );
};
export const TickIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={12}
      viewBox="0 0 16 12"
      fill="none">
      <Path
        d="M.758 6.89a1 1 0 010-1.447l.552-.526a1 1 0 011.38 0l2.62 2.5a1 1 0 001.38 0l6.62-6.318a1 1 0 011.38 0l.552.526a1 1 0 010 1.447L6.69 11.235a1 1 0 01-1.38 0L.758 6.89z"
        fill="#fff"
      />
    </Svg>
  );
};

export const RuppeeIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      viewBox="0 0 15 16"
      fill="none">
      <G clipPath="url(#clip0_1029_3060)">
        <Path
          d="M3.53 2.91h7.5m-7.5 3.125h7.5M8.841 14.16l-5.313-5h1.875c4.167 0 4.167-6.25 0-6.25"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1029_3060">
          <Path fill="#fff" transform="translate(0 .263)" d="M0 0H15V15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const ProfileIcon = ({fill}) => {
  return (
    <Svg
      width={29}
      height={32}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3337 10.8753C19.3337 12.1572 18.8244 13.3866 17.918 14.293C17.0116 15.1994 15.7822 15.7087 14.5003 15.7087C13.2184 15.7087 11.9891 15.1994 11.0826 14.293C10.1762 13.3866 9.66699 12.1572 9.66699 10.8753C9.66699 9.59345 10.1762 8.36407 11.0826 7.45764C11.9891 6.55122 13.2184 6.04199 14.5003 6.04199C15.7822 6.04199 17.0116 6.55122 17.918 7.45764C18.8244 8.36407 19.3337 9.59345 19.3337 10.8753ZM16.917 10.8753C16.917 11.5163 16.6624 12.131 16.2092 12.5842C15.756 13.0374 15.1413 13.292 14.5003 13.292C13.8594 13.292 13.2447 13.0374 12.7915 12.5842C12.3383 12.131 12.0837 11.5163 12.0837 10.8753C12.0837 10.2344 12.3383 9.6197 12.7915 9.16648C13.2447 8.71327 13.8594 8.45866 14.5003 8.45866C15.1413 8.45866 15.756 8.71327 16.2092 9.16648C16.6624 9.6197 16.917 10.2344 16.917 10.8753Z"
        fill={fill || '#7F8387'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5002 1.2085C7.15954 1.2085 1.2085 7.15954 1.2085 14.5002C1.2085 21.8408 7.15954 27.7918 14.5002 27.7918C21.8408 27.7918 27.7918 21.8408 27.7918 14.5002C27.7918 7.15954 21.8408 1.2085 14.5002 1.2085ZM3.62516 14.5002C3.62516 17.0256 4.4867 19.3504 5.93066 21.1967C6.94473 19.865 8.25296 18.7858 9.75314 18.0434C11.2533 17.3009 12.9049 16.9154 14.5787 16.9168C16.2309 16.9153 17.8616 17.2908 19.3467 18.0149C20.8318 18.739 22.132 19.7926 23.1482 21.0952C24.1952 19.7221 24.9001 18.1194 25.2047 16.4197C25.5092 14.72 25.4047 12.9723 24.8997 11.321C24.3947 9.66977 23.5037 8.16251 22.3005 6.92396C21.0974 5.6854 19.6166 4.75116 17.9806 4.19853C16.3447 3.6459 14.6007 3.49076 12.8929 3.74596C11.1851 4.00117 9.56266 4.65937 8.15976 5.6661C6.75686 6.67284 5.61385 7.99917 4.82531 9.53536C4.03678 11.0715 3.62538 12.7734 3.62516 14.5002ZM14.5002 25.3752C12.0037 25.3789 9.58257 24.5201 7.6465 22.944C8.42579 21.8284 9.46303 20.9175 10.67 20.2889C11.8769 19.6603 13.2179 19.3325 14.5787 19.3335C15.9226 19.3324 17.2473 19.652 18.4429 20.2656C19.6384 20.8793 20.6704 21.7693 21.4529 22.8618C19.5018 24.4891 17.0408 25.3787 14.5002 25.3752Z"
        fill={fill || '#7F8387'}
      />
    </Svg>
  );
};