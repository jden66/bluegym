import { stringify } from "qs";
import { config } from "../../../../core/config";

export default function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    const { host, client_secret, ...rest } = config.google;
    const fullUrl = `${host}?${stringify(rest)}`;
    return res.redirect(fullUrl);
  }
}
