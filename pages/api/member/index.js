import { request } from "../../../db";
import { util } from "../../../utils/util";

export default async function handler(req, res) {
  const { method, query, body } = req;

  if (method === "GET") {
    const { trainer } = query;
    const data = await getMembers(trainer);

    return res.status(200).json(data);
  }

  if (method === "POST") {
    const { name, trainer, group } = body;
    const data = await createMember({ name, trainer, group });

    return res.status(201).json(data);
  }

  return res.status(500).json({ message: "잘못된 요청입니다." });
}

const getMembers = async (trainer) => {
  const d = await request(
    `select seq, id, name, created_at, group_id as \`group\` from member where trainer_id=?`,
    [trainer]
  );
  return d;
};

const createMember = async ({ name, trainer, group }) => {
  const userId = util.randomID(16, 3);
  const d = await request(
    `insert INTO bluegym.member (id, name, trainer_id, group_id) values (?,?,?,?)`,
    [userId, name, trainer, group]
  );
  return d;
};
