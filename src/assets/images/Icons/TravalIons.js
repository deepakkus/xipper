import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const Flight = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
        fill={color || "#999"}
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
        d="M20.25 10.8141C19.7772 10.6065 19.2664 10.4995 18.75 10.5H5.25C4.73367 10.4995 4.22288 10.6063 3.75 10.8136C3.08166 11.1059 2.51294 11.5865 2.11336 12.1968C1.71377 12.8071 1.50064 13.5205 1.5 14.25V19.5C1.5 19.6989 1.57902 19.8897 1.71967 20.0303C1.86032 20.171 2.05109 20.25 2.25 20.25C2.44891 20.25 2.63968 20.171 2.78033 20.0303C2.92098 19.8897 3 19.6989 3 19.5V19.125C3.00122 19.0259 3.04112 18.9312 3.11118 18.8612C3.18124 18.7911 3.27592 18.7512 3.375 18.75H20.625C20.7241 18.7512 20.8188 18.7911 20.8888 18.8612C20.9589 18.9312 20.9988 19.0259 21 19.125V19.5C21 19.6989 21.079 19.8897 21.2197 20.0303C21.3603 20.171 21.5511 20.25 21.75 20.25C21.9489 20.25 22.1397 20.171 22.2803 20.0303C22.421 19.8897 22.5 19.6989 22.5 19.5V14.25C22.4993 13.5206 22.2861 12.8073 21.8865 12.1971C21.4869 11.5869 20.9183 11.1063 20.25 10.8141ZM17.625 3.75H6.375C5.67881 3.75 5.01113 4.02656 4.51884 4.51884C4.02656 5.01113 3.75 5.67881 3.75 6.375V9.75C3.75002 9.77906 3.75679 9.80771 3.76979 9.8337C3.78278 9.85969 3.80163 9.8823 3.82486 9.89976C3.84809 9.91721 3.87505 9.92903 3.90363 9.93428C3.93221 9.93953 3.96162 9.93806 3.98953 9.93C4.39896 9.81025 4.82341 9.74964 5.25 9.75H5.44828C5.49456 9.75029 5.53932 9.73346 5.57393 9.70274C5.60855 9.67202 5.63058 9.62958 5.63578 9.58359C5.67669 9.21712 5.85115 8.87856 6.12586 8.63256C6.40056 8.38656 6.75625 8.25037 7.125 8.25H9.75C10.119 8.25003 10.475 8.38606 10.75 8.63209C11.025 8.87812 11.1997 9.21688 11.2406 9.58359C11.2458 9.62958 11.2679 9.67202 11.3025 9.70274C11.3371 9.73346 11.3818 9.75029 11.4281 9.75H12.5747C12.621 9.75029 12.6657 9.73346 12.7003 9.70274C12.735 9.67202 12.757 9.62958 12.7622 9.58359C12.8031 9.21736 12.9773 8.87899 13.2517 8.63303C13.5261 8.38706 13.8815 8.25072 14.25 8.25H16.875C17.244 8.25003 17.6 8.38606 17.875 8.63209C18.15 8.87812 18.3247 9.21688 18.3656 9.58359C18.3708 9.62958 18.3929 9.67202 18.4275 9.70274C18.4621 9.73346 18.5068 9.75029 18.5531 9.75H18.75C19.1766 9.74979 19.6011 9.81056 20.0105 9.93047C20.0384 9.93854 20.0679 9.94 20.0965 9.93473C20.1251 9.92945 20.1521 9.91759 20.1753 9.90009C20.1986 9.88258 20.2174 9.8599 20.2304 9.83385C20.2433 9.8078 20.2501 9.7791 20.25 9.75V6.375C20.25 5.67881 19.9734 5.01113 19.4812 4.51884C18.9889 4.02656 18.3212 3.75 17.625 3.75Z"
        fill={color || "#999"}
        fill-opacity="0.4"
      />
    </Svg>
  );
};
export const CarRent = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M8.76923 0C7.01538 0 5.53846 1.47692 5.53846 3.23077C5.53846 4.98462 7.01538 6.46154 8.76923 6.46154C10.0246 6.46154 11.1231 5.68985 11.6538 4.61538H17.5385L18.4615 3.69231V2.76923L17.5385 1.84615H16.6154L15.8649 2.59662L15.2308 1.84615H14.4803L13.9329 2.39446L13.2978 1.84615H11.6538C11.1221 0.771692 10.0255 0 8.76923 0ZM7.84615 2.30769C8.4 2.30769 8.76923 2.67692 8.76923 3.23077C8.76923 3.78462 8.4 4.15385 7.84615 4.15385C7.2923 4.15385 6.92307 3.78462 6.92307 3.23077C6.92307 2.67692 7.2923 2.30769 7.84615 2.30769ZM8.39446 8.30769C7.57305 8.31036 6.77527 8.58282 6.12383 9.08316C5.47239 9.5835 5.00337 10.284 4.78892 11.0769L4.1243 13.8462H3.6923C3.13846 13.8462 2.76923 14.2154 2.76923 14.7692V15.6923C2.76923 16.2462 3.13846 16.6154 3.6923 16.6154V23.0769C3.6923 23.6308 4.06153 24 4.61538 24H6.46153C7.01538 24 7.38461 23.6308 7.38461 23.0769V22.1538H16.6154V23.0769C16.6154 23.6308 16.9846 24 17.5385 24H19.3846C19.9385 24 20.3077 23.6308 20.3077 23.0769V16.6154C20.8615 16.6154 21.2308 16.2462 21.2308 15.6923V14.7692C21.2308 14.2154 20.8615 13.8462 20.3077 13.8462H19.8748L19.212 11.0769C18.7505 9.41538 17.2671 8.30769 15.6055 8.30769H8.39446ZM8.39446 10.1538H15.6055C16.4363 10.1538 17.1812 10.7077 17.3658 11.5385L18.144 14.7692H5.856L6.63415 11.5385C6.81876 10.7077 7.56369 10.1538 8.39446 10.1538ZM6.92307 17.5385C7.66153 17.5385 8.30769 18.1846 8.30769 18.9231C8.30769 19.6615 7.66153 20.3077 6.92307 20.3077C6.18461 20.3077 5.53846 19.6615 5.53846 18.9231C5.53846 18.1846 6.18461 17.5385 6.92307 17.5385ZM17.0769 17.5385C17.8154 17.5385 18.4615 18.1846 18.4615 18.9231C18.4615 19.6615 17.8154 20.3077 17.0769 20.3077C16.3385 20.3077 15.6923 19.6615 15.6923 18.9231C15.6923 18.1846 16.3385 17.5385 17.0769 17.5385Z"
        fill={color || "#999"}
        fill-opacity="0.4"
      />
    </Svg>
  );
};
export const Id = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clip-path="url(#clip0_1236_55532)">
        <Path
          d="M22.8 3.59998H1.2C0.88174 3.59998 0.576516 3.7264 0.351472 3.95145C0.126428 4.17649 0 4.48172 0 4.79998L0 19.2C0 19.5182 0.126428 19.8235 0.351472 20.0485C0.576516 20.2735 0.88174 20.4 1.2 20.4H22.8C23.1183 20.4 23.4235 20.2735 23.6485 20.0485C23.8736 19.8235 24 19.5182 24 19.2V4.79998C24 4.48172 23.8736 4.17649 23.6485 3.95145C23.4235 3.7264 23.1183 3.59998 22.8 3.59998ZM15.6 8.39998H20.4V9.59998H15.6V8.39998ZM13.2 17.7636C13.0054 17.6149 12.7919 17.4926 12.5652 17.4C11.1492 16.7904 9.012 15.888 9.012 14.7888C9.012 14.1276 9.4428 14.3436 9.6336 13.134C9.7128 12.6324 10.0956 13.1256 10.1676 11.9808C10.1676 11.5248 9.9588 11.4108 9.9588 11.4108C9.9588 11.4108 10.0644 10.7364 10.1064 10.2156C10.1496 9.67197 9.8412 8.05558 8.574 7.69918C8.3508 7.47358 8.2008 7.56598 8.8836 7.20478C7.3908 7.13398 7.0428 7.91517 6.2484 8.48997C5.5716 8.99398 5.388 9.79198 5.4216 10.2168C5.466 10.7364 5.5716 11.412 5.5716 11.412C5.5716 11.412 5.3616 11.5248 5.3616 11.9808C5.4348 13.1256 5.8176 12.6324 5.8956 13.134C6.0852 14.3436 6.5184 14.1276 6.5184 14.7888C6.5184 15.888 4.3812 16.7904 2.9652 17.4C2.76614 17.4834 2.57664 17.588 2.4 17.712V5.99998H13.2V17.7636ZM21.6 13.2H15.6V12H21.6V13.2Z"
          fill={color || "#999"}
          fill-opacity="0.4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1236_55532">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export const Globle = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M15 15H22.5V16.5H15V15ZM15 18H19.5V19.5H15V18Z"
        fill={color || "#999"}
        fill-opacity="0.4"
      />
      <Path
        d="M22.5 12.75V12C22.498 9.8219 21.818 7.6984 20.5544 5.92423C19.2909 4.15005 17.5063 2.8132 15.4486 2.09918C13.3908 1.38517 11.1618 1.3294 9.07083 1.93962C6.97991 2.54985 5.13079 3.7958 3.78008 5.50457C2.42937 7.21334 1.64406 9.30018 1.53312 11.4755C1.42218 13.6508 1.99113 15.8067 3.161 17.644C4.33086 19.4813 6.04364 20.9089 8.06163 21.7287C10.0796 22.5485 12.3028 22.7198 14.4225 22.2188L14.0775 20.7593C13.3967 20.92 12.6995 21.0008 12 21C11.8575 21 11.7188 20.9858 11.5778 20.9798C9.95018 18.5402 9.06183 15.6824 9.0195 12.75H22.5ZM20.9693 11.25H16.4813C16.3974 8.48667 15.6859 5.77858 14.4008 3.3308C16.1728 3.8231 17.7519 4.84562 18.9261 6.26117C20.1004 7.67671 20.8128 9.41753 20.9693 11.25ZM12.4223 3.0203C14.0498 5.4599 14.9382 8.31766 14.9805 11.25H9.0195C9.06183 8.31766 9.95018 5.4599 11.5778 3.0203C11.7188 3.01505 11.8575 3.00005 12 3.00005C12.1425 3.00005 12.2813 3.0143 12.4223 3.0203ZM9.59925 3.3308C8.31407 5.77858 7.60262 8.48667 7.51875 11.25H3.0315C3.18783 9.41772 3.9008 7.67704 5.07474 6.26152C6.24869 4.846 7.82746 3.82336 9.59925 3.3308ZM9.59925 20.6693C7.82746 20.1767 6.24869 19.1541 5.07474 17.7386C3.9008 16.3231 3.18783 14.5824 3.0315 12.75H7.51875C7.60262 15.5134 8.31407 18.2215 9.59925 20.6693Z"
        fill={color || "#999"}
        fill-opacity="0.4"
      />
    </Svg>
  );
};
export const UnoReverse = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <G clip-path="url(#clip0_1236_55540)">
        <Path
          d="M6.76833 2.88667C7.3225 2.33167 8.255 2.68667 8.32833 3.43833L8.33333 3.53417V16.6667C8.3331 16.8791 8.25177 17.0834 8.10596 17.2378C7.96015 17.3923 7.76087 17.4852 7.54884 17.4976C7.3368 17.5101 7.12802 17.4411 6.96514 17.3048C6.80226 17.1685 6.69759 16.9751 6.6725 16.7642L6.66667 16.6667V5.345L4.75583 7.25583C4.60587 7.40529 4.40464 7.49206 4.19301 7.49852C3.98139 7.50499 3.77524 7.43065 3.61643 7.29063C3.45763 7.1506 3.35808 6.95537 3.338 6.74461C3.31792 6.53384 3.37882 6.32333 3.50833 6.15583L3.5775 6.0775L6.76917 2.88583L6.76833 2.88667ZM12.5 2.5C12.7041 2.50003 12.9011 2.57496 13.0536 2.7106C13.2062 2.84623 13.3036 3.03312 13.3275 3.23583L13.3333 3.33333V14.655L15.2442 12.7442C15.3941 12.5947 15.5954 12.5079 15.807 12.5015C16.0186 12.495 16.2248 12.5693 16.3836 12.7094C16.5424 12.8494 16.6419 13.0446 16.662 13.2554C16.6821 13.4662 16.6212 13.6767 16.4917 13.8442L16.4225 13.9225L13.2308 17.1142C12.6775 17.6683 11.745 17.3133 11.6717 16.5617L11.6667 16.4658V3.33333C11.6667 3.11232 11.7545 2.90036 11.9107 2.74408C12.067 2.5878 12.279 2.5 12.5 2.5Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1236_55540">
          <Rect width="20" height="20" fill="#6d38c3" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export const Calender = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M17 14C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12C16.7348 12 16.4804 12.1054 16.2929 12.2929C16.1054 12.4804 16 12.7348 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17C18 16.7348 17.8946 16.4804 17.7071 16.2929C17.5196 16.1054 17.2652 16 17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM7 14C7.26522 14 7.51957 13.8946 7.70711 13.7071C7.89464 13.5196 8 13.2652 8 13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM7 18C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z"
        fill={color || "#6D38C3"}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.00001 1.75C7.19892 1.75 7.38969 1.82902 7.53034 1.96967C7.67099 2.11032 7.75001 2.30109 7.75001 2.5V3.263C8.41201 3.25 9.14101 3.25 9.94301 3.25H14.056C14.859 3.25 15.588 3.25 16.25 3.263V2.5C16.25 2.30109 16.329 2.11032 16.4697 1.96967C16.6103 1.82902 16.8011 1.75 17 1.75C17.1989 1.75 17.3897 1.82902 17.5303 1.96967C17.671 2.11032 17.75 2.30109 17.75 2.5V3.327C18.01 3.347 18.256 3.372 18.489 3.403C19.661 3.561 20.61 3.893 21.359 4.641C22.107 5.39 22.439 6.339 22.597 7.511C22.75 8.651 22.75 10.106 22.75 11.944V14.056C22.75 15.894 22.75 17.35 22.597 18.489C22.439 19.661 22.107 20.61 21.359 21.359C20.61 22.107 19.661 22.439 18.489 22.597C17.349 22.75 15.894 22.75 14.056 22.75H9.94501C8.10701 22.75 6.65101 22.75 5.51201 22.597C4.34001 22.439 3.39101 22.107 2.64201 21.359C1.89401 20.61 1.56201 19.661 1.40401 18.489C1.25101 17.349 1.25101 15.894 1.25101 14.056V11.944C1.25101 10.106 1.25101 8.65 1.40401 7.511C1.56201 6.339 1.89401 5.39 2.64201 4.641C3.39101 3.893 4.34001 3.561 5.51201 3.403C5.74501 3.372 5.99201 3.347 6.25101 3.327V2.5C6.25101 2.30126 6.32989 2.11065 6.47032 1.97002C6.61076 1.8294 6.80127 1.75026 7.00001 1.75ZM5.71001 4.89C4.70501 5.025 4.12501 5.279 3.70201 5.702C3.27901 6.125 3.02501 6.705 2.89001 7.711C2.86701 7.881 2.84801 8.061 2.83201 8.25H21.168C21.152 8.06 21.133 7.881 21.11 7.71C20.975 6.705 20.721 6.125 20.298 5.702C19.875 5.279 19.295 5.025 18.289 4.89C17.262 4.752 15.907 4.75 14 4.75H10C8.09301 4.75 6.73901 4.752 5.71001 4.89ZM2.75001 12C2.75001 11.146 2.75001 10.403 2.76301 9.75H21.237C21.25 10.403 21.25 11.146 21.25 12V14C21.25 15.907 21.248 17.262 21.11 18.29C20.975 19.295 20.721 19.875 20.298 20.298C19.875 20.721 19.295 20.975 18.289 21.11C17.262 21.248 15.907 21.25 14 21.25H10C8.09301 21.25 6.73901 21.248 5.71001 21.11C4.70501 20.975 4.12501 20.721 3.70201 20.298C3.27901 19.875 3.02501 19.295 2.89001 18.289C2.75201 17.262 2.75001 15.907 2.75001 14V12Z"
        fill={color || "#6D38C3"}
      />
    </Svg>
  );
};
export const People = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="26"
      viewBox="0 0 24 26"
      fill="none"
    >
      <Path
        d="M12 11.2C10.9391 11.2 9.92172 10.7785 9.17157 10.0284C8.42143 9.27823 8 8.26082 8 7.19995C8 6.13909 8.42143 5.12167 9.17157 4.37152C9.92172 3.62138 10.9391 3.19995 12 3.19995C13.0609 3.19995 14.0783 3.62138 14.8284 4.37152C15.5786 5.12167 16 6.13909 16 7.19995C16 8.26082 15.5786 9.27823 14.8284 10.0284C14.0783 10.7785 13.0609 11.2 12 11.2ZM12 4.79995C10.672 4.79995 9.6 5.87195 9.6 7.19995C9.6 8.52795 10.672 9.59995 12 9.59995C13.328 9.59995 14.4 8.52795 14.4 7.19995C14.4 5.87195 13.328 4.79995 12 4.79995Z"
        fill={color || "#6D38C3"}
      />
      <Path
        d="M21.6 17.6C21.152 17.6 20.8 17.248 20.8 16.8C20.8 16.352 21.152 16 21.6 16C22.048 16 22.4 15.648 22.4 15.2C22.4 14.1391 21.9786 13.1217 21.2284 12.3715C20.4783 11.6214 19.4609 11.2 18.4 11.2H16.8C16.352 11.2 16 10.848 16 10.4C16 9.95195 16.352 9.59995 16.8 9.59995C18.128 9.59995 19.2 8.52795 19.2 7.19995C19.2 5.87195 18.128 4.79995 16.8 4.79995C16.352 4.79995 16 4.44795 16 3.99995C16 3.55195 16.352 3.19995 16.8 3.19995C17.8609 3.19995 18.8783 3.62138 19.6284 4.37152C20.3786 5.12167 20.8 6.13909 20.8 7.19995C20.8 8.19195 20.448 9.08795 19.84 9.79195C22.224 10.432 24 12.608 24 15.2C24 16.528 22.928 17.6 21.6 17.6ZM2.4 17.6C1.072 17.6 0 16.528 0 15.2C0 12.608 1.76 10.432 4.16 9.79195C3.568 9.08795 3.2 8.19195 3.2 7.19995C3.2 6.13909 3.62143 5.12167 4.37157 4.37152C5.12172 3.62138 6.13913 3.19995 7.2 3.19995C7.648 3.19995 8 3.55195 8 3.99995C8 4.44795 7.648 4.79995 7.2 4.79995C5.872 4.79995 4.8 5.87195 4.8 7.19995C4.8 8.52795 5.872 9.59995 7.2 9.59995C7.648 9.59995 8 9.95195 8 10.4C8 10.848 7.648 11.2 7.2 11.2H5.6C4.53913 11.2 3.52172 11.6214 2.77157 12.3715C2.02143 13.1217 1.6 14.1391 1.6 15.2C1.6 15.648 1.952 16 2.4 16C2.848 16 3.2 16.352 3.2 16.8C3.2 17.248 2.848 17.6 2.4 17.6ZM16.8 22.4H7.2C5.872 22.4 4.8 21.328 4.8 20V18.4C4.8 15.312 7.312 12.8 10.4 12.8H13.6C16.688 12.8 19.2 15.312 19.2 18.4V20C19.2 21.328 18.128 22.4 16.8 22.4ZM10.4 14.4C9.33913 14.4 8.32172 14.8214 7.57157 15.5715C6.82143 16.3217 6.4 17.3391 6.4 18.4V20C6.4 20.448 6.752 20.8 7.2 20.8H16.8C17.248 20.8 17.6 20.448 17.6 20V18.4C17.6 17.3391 17.1786 16.3217 16.4284 15.5715C15.6783 14.8214 14.6609 14.4 13.6 14.4H10.4Z"
        fill={color || "#6D38C3"}
      />
    </Svg>
  );
};
export const FromFlight = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <Path
        d="M3.125 23.75H26.875V26.25H3.125V23.75ZM27.5875 12.05C27.325 11.05 26.2875 10.45 25.2875 10.725L18.65 12.5L10.025 4.46252L7.6125 5.10002L12.7875 14.0625L6.575 15.725L4.1125 13.8L2.3 14.2875L4.575 18.2375L5.5375 19.9L26.25 14.3625C27.2625 14.075 27.85 13.05 27.5875 12.05Z"
        fill={color || "#999"}
        fill-opacity="0.4"
      />
    </Svg>
  );
};
export const ToFlight = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <Path
        d="M3.125 23.75H26.875V26.25H3.125V23.75ZM27.5875 12.05C27.325 11.05 26.2875 10.45 25.2875 10.725L18.65 12.5L10.025 4.46252L7.6125 5.10002L12.7875 14.0625L6.575 15.725L4.1125 13.8L2.3 14.2875L4.575 18.2375L5.5375 19.9L26.25 14.3625C27.2625 14.075 27.85 13.05 27.5875 12.05Z"
        fill={color || "#999"}
        fill-opacity="0.4"
      />
    </Svg>
  );
};
export const Hut = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="27"
      viewBox="0 0 24 27"
      fill="none"
    >
      <Path
        d="M13.25 2L14.9375 2.5625L13.25 3.125V2ZM14.375 20L15.5 25.625H13.25L14.375 20ZM14.375 18.3125L16.625 25.625H12.125L14.375 18.3125ZM12.125 6.5L22.25 12.125V14.375H2V12.125L12.125 6.5ZM3.6875 14.375H20.5625C20.5625 19.0629 22.25 25.625 22.25 25.625H2C2 25.625 3.6875 19.0629 3.6875 14.375ZM3.6875 14.375H20.5625C20.5625 19.0629 22.25 25.625 22.25 25.625H2C2 25.625 3.6875 19.0629 3.6875 14.375Z"
        stroke="#929194"
        stroke-width="2"
      />
    </Svg>
  );
};
export const Door = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <Path
        d="M3 21.5V19.5H5V3.5H15V4.5H19V19.5H21V21.5H17V6.5H15V21.5H3ZM11 13.5C11.2833 13.5 11.521 13.404 11.713 13.212C11.905 13.02 12.0007 12.7827 12 12.5C11.9993 12.2173 11.9033 11.98 11.712 11.788C11.5207 11.596 11.2833 11.5 11 11.5C10.7167 11.5 10.4793 11.596 10.288 11.788C10.0967 11.98 10.0007 12.2173 10 12.5C9.99933 12.7827 10.0953 13.0203 10.288 13.213C10.4807 13.4057 10.718 13.5013 11 13.5ZM7 19.5H13V5.5H7V19.5Z"
        fill={color || "#7F8387"}
      />
    </Svg>
  );
};
export const Guest = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="27"
      viewBox="0 0 24 27"
      fill="none"
    >
      <Path
        d="M12 11.7002C10.9391 11.7002 9.92172 11.2788 9.17157 10.5286C8.42143 9.77848 8 8.76106 8 7.7002C8 6.63933 8.42143 5.62191 9.17157 4.87177C9.92172 4.12162 10.9391 3.7002 12 3.7002C13.0609 3.7002 14.0783 4.12162 14.8284 4.87177C15.5786 5.62191 16 6.63933 16 7.7002C16 8.76106 15.5786 9.77848 14.8284 10.5286C14.0783 11.2788 13.0609 11.7002 12 11.7002ZM12 5.3002C10.672 5.3002 9.6 6.3722 9.6 7.7002C9.6 9.0282 10.672 10.1002 12 10.1002C13.328 10.1002 14.4 9.0282 14.4 7.7002C14.4 6.3722 13.328 5.3002 12 5.3002Z"
        fill={color || "#7F8387"}
      />
      <Path
        d="M21.6 18.1002C21.152 18.1002 20.8 17.7482 20.8 17.3002C20.8 16.8522 21.152 16.5002 21.6 16.5002C22.048 16.5002 22.4 16.1482 22.4 15.7002C22.4 14.6393 21.9786 13.6219 21.2284 12.8718C20.4783 12.1216 19.4609 11.7002 18.4 11.7002H16.8C16.352 11.7002 16 11.3482 16 10.9002C16 10.4522 16.352 10.1002 16.8 10.1002C18.128 10.1002 19.2 9.0282 19.2 7.7002C19.2 6.3722 18.128 5.3002 16.8 5.3002C16.352 5.3002 16 4.9482 16 4.5002C16 4.0522 16.352 3.7002 16.8 3.7002C17.8609 3.7002 18.8783 4.12162 19.6284 4.87177C20.3786 5.62191 20.8 6.63933 20.8 7.7002C20.8 8.6922 20.448 9.5882 19.84 10.2922C22.224 10.9322 24 13.1082 24 15.7002C24 17.0282 22.928 18.1002 21.6 18.1002ZM2.4 18.1002C1.072 18.1002 0 17.0282 0 15.7002C0 13.1082 1.76 10.9322 4.16 10.2922C3.568 9.5882 3.2 8.6922 3.2 7.7002C3.2 6.63933 3.62143 5.62191 4.37157 4.87177C5.12172 4.12162 6.13913 3.7002 7.2 3.7002C7.648 3.7002 8 4.0522 8 4.5002C8 4.9482 7.648 5.3002 7.2 5.3002C5.872 5.3002 4.8 6.3722 4.8 7.7002C4.8 9.0282 5.872 10.1002 7.2 10.1002C7.648 10.1002 8 10.4522 8 10.9002C8 11.3482 7.648 11.7002 7.2 11.7002H5.6C4.53913 11.7002 3.52172 12.1216 2.77157 12.8718C2.02143 13.6219 1.6 14.6393 1.6 15.7002C1.6 16.1482 1.952 16.5002 2.4 16.5002C2.848 16.5002 3.2 16.8522 3.2 17.3002C3.2 17.7482 2.848 18.1002 2.4 18.1002ZM16.8 22.9002H7.2C5.872 22.9002 4.8 21.8282 4.8 20.5002V18.9002C4.8 15.8122 7.312 13.3002 10.4 13.3002H13.6C16.688 13.3002 19.2 15.8122 19.2 18.9002V20.5002C19.2 21.8282 18.128 22.9002 16.8 22.9002ZM10.4 14.9002C9.33913 14.9002 8.32172 15.3216 7.57157 16.0718C6.82143 16.8219 6.4 17.8393 6.4 18.9002V20.5002C6.4 20.9482 6.752 21.3002 7.2 21.3002H16.8C17.248 21.3002 17.6 20.9482 17.6 20.5002V18.9002C17.6 17.8393 17.1786 16.8219 16.4284 16.0718C15.6783 15.3216 14.6609 14.9002 13.6 14.9002H10.4Z"
        fill={color || "#7F8387"}
      />
    </Svg>
  );
};
