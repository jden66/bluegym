import axios from "axios";
import { config } from "../../../../core/config";

const googleTokenHost = `https://oauth2.googleapis.com/token`;

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET") {
    const { client_id, client_secret, redirect_uri } = config.google;
    const { code } = query;
    try {
      const { data } = await axios.post(googleTokenHost, {
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: "authorization_code",
      });
      /**
       * 토큰을 얻고 해야할 일
       * 1. 구글 이메일 조회하여 회원정보에 있는지 확인
       * 2.
       */
      const { access_token } = data;
      const { data: userInfo } = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(userInfo);
      // res.setHeader("Set-cookie", `token=${access_token}; path=/;`);
      return res.redirect("/", 304);
    } catch (error) {
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

async function getGoogleUserInfo(token) {
  /**
   * expired 확인 필요
   */
}
