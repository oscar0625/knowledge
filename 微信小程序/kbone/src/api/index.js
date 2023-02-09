import complex from "@/api/complex";
import homepage from "@/api/homepage";
import achievement from "@/api/achievement";
import demand from "@/api/demand";
import information from "@/api/information";
import policy from "@/api/policy";
import project from "@/api/project";
import login from "@/api/login";
import user from "@/api/user";
import notification from "@/api/notification";
import match from "@/api/match";
import storeUp from "./store_up";
import certification from "@/api/certification";

const request = {
  complex,
  homepage,
  achievement,
  demand,
  information,
  policy,
  project,
  login,
  user,
  notification,
  match,
  storeUp,
  certification
};
const api = (module, method, params) => {
  return request[module][method](params);
};
export default api;
