export default function handler(req, res) {
  const { method, query } = req;

  if (method === "GET") {
    console.log(req)
    res.send("ok");
  }
}
