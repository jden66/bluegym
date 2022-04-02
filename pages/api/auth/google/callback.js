import axios from "axios";
import { add } from "date-fns";
import {
  checkUserInfo,
  checkUserToken,
  getGoogleUserInfo,
  initialGetAccessToken,
  insertGoogleIdOfTrainer,
  insertGoogleTokenOfTrainer,
} from "../../../../core/auth/google";
import { config } from "../../../../core/config";

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET") {
    const { code } = query;
    try {
      /**
       * 1. callback func임
       * 2. access_token을 요청하는 function을 진행한 후, 회원가입여부 판단 등을 진행
       */
      // get access token
      const token = await initialGetAccessToken(code);
      // get google user info
      const userInfo = await getGoogleUserInfo(token);
      const isUser = await checkUserInfo(userInfo);
      if (isUser) {
        // 등록된 유저가 있음
        // 토큰 체크
        await checkUserToken(userInfo);
      } else {
        // 등록된 유저가 없음
        // 등록 절차 진행
        await insertGoogleIdOfTrainer(userInfo);
        const randomId = await insertGoogleTokenOfTrainer({
          ...token,
          ...userInfo,
        });

        const expiredDate = add(new Date(), { days: 1 }).toUTCString();
        res.setHeader(
          "Set-cookie",
          `SID=${randomId}; path=/; Expires=${expiredDate};`
        );
        // 해당 로직 실패시 제거 로직 필요
      }

      return res.redirect("/", { location: "/" });
    } catch (error) {
      console.error("[ERROR]:[google oauth2 callback]::", error);
      return res.redirect("/", 500);
    }
  }
}

async function getUserInfo(userId) {
  return userId;
}

async function refreshToken(userId) {
  /**
   * user id를 토대로 google refresh token 정보를 받는다.
   */
  const host = "https://oauth2.googleapis.com/token";
  const { client_id, client_secret } = config.google;
  try {
    const { refresh_token } = getUserInfo(userId);
    const data = await axios.post(host, {
      client_id,
      client_secret,
      refresh_token,
      grant_type: "refresh_token",
    });
    console.log("refreshToken----", data);
    return true;
  } catch (error) {
    return false;
  }
}

async function logout(userId) {
  const host = "https://oauth2.googleapis.com/revoke";
  try {
    const { token } = getUserInfo(userId);
    const result = await axios.post(`${host}?token=${token}`);
    console.log("logout----", result);
    return true;
  } catch (error) {
    console.error("[logout]:[error]", error);
    return false;
  }
}
