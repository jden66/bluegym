// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { request } from "../../db";

export default async function handler(req, res) {
  const { method, body, ...rest } = req;
  if (method === "GET") {
    const d = await request("select * from trainer");
    return res.status(200).json(d);
  }
  if (method === "POST") {
    const { loginuser } = body;
    const d = await request(
      "select id, name, group_id as `group`, data from trainer where id=?",
      [loginuser]
    );
    return res.status(200).json(d);
  }
}
