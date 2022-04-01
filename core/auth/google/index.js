/**
 * 1. user login data 조회
 * 2.
 */

import axios from "axios";
import { request } from "../../../db";
import { config } from "../../config";

export async function checkAuthId(host, auth_id) {
  const { data } = await axios.get(`${host}/api/auth/google/checkid`);
  if (!data) {
    /**
     * access_token expired,
     * 1. request access_token from refresh_token
     * 1-1. expired refresh_token? login status fail
     **/
    return;
  }
  // login 유지
}
/**
 * access_token을 이용해 userinfo를 불러온다.
 * 실패하거나 401이 뜨면 false를 리턴한다.
 * @param {string} token
 * @returns
 */
async function checkAccessToken({ access_token, refresh_token }) {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const authorization = `Bearer ${access_token}`;
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: authorization,
      },
    });
    console.log("[SUCCESS]:[checkAccessToken]::", data);
    return true;
  } catch (error) {
    console.error("[ERROR]:[checkAccessToken]::", error);
    /**
     * 401일 경우, getAccessToken을 통해 access_token을 재발급받는다.
     */
    try {
      await getAccessToken(refresh_token);
      return;
    } catch (error) {
      //...
    }
  }
}

async function initialGetAccessToken() {
  const googleTokenHost = `https://oauth2.googleapis.com/token`;
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
    console.log("[SUCCESS]:[initialGetAccessToken]::", data);
    return true;
  } catch (error) {
    console.error("[ERROR]:[initialGetAccessToken]::", error);
    return false;
  }
}

async function getAccessToken({ refresh_token }) {
  const { client_id, client_secret } = config.google;
  const url = "https://oauth2.googleapis.com/token";
  const body = {
    client_id,
    client_secret,
    refresh_token,
    grant_type: "refresh_token",
  };
  try {
    const { data } = await axios.post(url, body);
    /**
     * login process(generate sid, set cookie, db insert)
     */
    console.log("[SUCCESS]:[getAccessToken]::", data);
    return true;
  } catch (error) {
    console.error("[ERROR]:[getAccessToken]::", error);
    return false;
  }
}
/**
 * cookie에 저장된 session id를 가져와 access_token을 얻는다.
 * (이후 checkAccessToken을 이용하여 google 로그인 상태 확인)
 */
async function checkSession(id) {
  const q = `select auth_id,trainer_id, platform_id, access_token from trainer_auth where auth_id=?`;
  const item = await request(q, [id]);
  console.log(item);
}

async function checkUser(id) {
  const q = `select `;
  const user = await request();
}
