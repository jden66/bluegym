/**
 * 1. user login data 조회
 * 2.
 */

import axios from "axios";
import { request } from "../../../db";
import { config } from "../../config";

import crypto from "crypto";

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
export async function getGoogleUserInfo({ access_token }) {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const authorization = `Bearer ${access_token}`;
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: authorization,
      },
    });
    // console.log("[SUCCESS]:[getGoogleUserInfo]::", data);
    return data;
  } catch (error) {
    console.error("[ERROR]:[getGoogleUserInfo]::", error);
    return false;
  }
}

export async function initialGetAccessToken(code) {
  const googleTokenHost = `https://oauth2.googleapis.com/token`;
  const { client_id, client_secret, redirect_uri } = config.google;
  try {
    const { data } = await axios.post(googleTokenHost, {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: "authorization_code",
    });
    // console.log("[SUCCESS]:[initialGetAccessToken]::", data);
    return data;
  } catch (error) {
    console.error("[ERROR]:[initialGetAccessToken]::", error);
    return false;
  }
}

async function getAccessTokenFromRefreshToken({ refresh_token }) {
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

// trainer에게 google email이 있는지 확인
export async function checkUserInfo({ email }) {
  const q1 = `select id, group_id from trainer where google_id=?`;
  try {
    const user = await request(q1, [email]);
    return user.length;
  } catch (error) {
    return false;
  }
}

export async function insertGoogleIdOfTrainer({ name, email }) {
  const q = `insert into trainer(google_id, name, id, data) values(?,?,?,?)`;
  try {
    const dataStr = JSON.stringify('{"exercise":{"type":1}}');
    const result = await request(q, [email, name, email, dataStr]);
    return result;
  } catch (error) {
    return false;
  }
}
export async function insertGoogleTokenOfTrainer({
  email,
  access_token,
  refresh_token,
}) {
  const q =
    "insert into trainer_auth(trainer_id, platform_name, access_token, refresh_token, platform_id, auth_id) values(?,?,?,?,?,?)";
  try {
    const randomBytes = crypto.randomBytes(2);
    const randomId = parseInt(randomBytes.toString("hex"), 16);

    await request(q, [
      email,
      "google",
      access_token,
      refresh_token,
      email,
      randomId,
    ]);
    return randomId;
  } catch (error) {
    console.error("[ERROR]:[insertGoogleTokenOfTrainer]::", error);
    return false;
  }
}

// trainer가 기존에 로그인 했던 기록 확인 및 token 유효성 체크
export async function checkUserToken({ email }) {
  const q1 = `select access_token, refresh_token from trainer_auth where platform_id=?`;
  try {
    // 기록된 토큰 얻기
    const token = await request(q1, [email]);
    // 토큰 유효성 검사
    const validityToken = await getGoogleUserInfo(token[0]);
    console.log(validityToken)
    if (validityToken) {
      // 토큰 아직 유효
      console.log("token valid");
    } else {
      console.log("token invalid");
      // 토큰 만료됨
      const newToken = await getAccessTokenFromRefreshToken(token);
      console.log("get new token -- ", newToken);
    }
    return true;
  } catch (error) {
    console.error("[ERROR]:[checkUserToken]::", error);
    return false;
  }
}
