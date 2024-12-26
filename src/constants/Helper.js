export const BASE_URL = "http://10.0.2.2:8000/api";



// socketConfig.js
import io from "socket.io-client";

const socket = io(`http://10.0.2.2:3001`);

export default socket;