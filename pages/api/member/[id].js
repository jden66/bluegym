import { request } from "../../../db";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  if (method === "GET") {
    const d = await getMember(id);
    return res.status(200).json(d);
  }

  if (method === "PATCH") {
    const d = await updateMember({ id, ...body });
    return res.status(201).json(d);
  }

  if (method === "DELETE") {
    const d = await deleteMember(id);
    return res.status(201).json(d);
  }

  res.status(500).json({ message: "wrong request" });
}

const getMember = async (id) => {
  const d = await request(
    "select id, name, trainer_id as trainer, group_id as \`group\` from member where id=?",
    [id]
  );
  return d[0];
};

const updateMember = async ({ id, name }) => {
  const d = await request(`update member set name=? where id=?`, [name, id]);
  return d;
};

const deleteMember = async (id) => {
  const d = await request(`delete from member where id=?`, [id]);
  return d;
};
