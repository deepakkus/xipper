export const BASE_URL = "http://10.0.2.2:8000/api";

//export const BASE_URL = "http://dev.xipper.in/api/v1.0.0";

// socketConfig.js
import io from "socket.io-client";

const socket = io(`http://10.0.2.2:3001`);

export default socket;