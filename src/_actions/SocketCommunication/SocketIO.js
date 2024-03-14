import { io } from "socket.io-client";
import { localUrl } from "../../util/hostUrl";
const socket = io.connect(localUrl);
export default socket;
