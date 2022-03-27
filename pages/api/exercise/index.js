// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { request } from "../../../db";

export default async function handler(req, res) {
  const { method, query, body } = req;
  if (method === "GET") {
    const { trainer } = query;
    const d = await getExercises(trainer);
    return res.status(200).json(d);
  }

  if (method === "POST") {
    const d = await createExercise(body);
    return res.status(200).json(d);
  }

  if (method === "PATCH") {
    const d = await updateExercise(body);
    return res.status(200).json(d);
  }

  if (method === "DELETE") {
    const { id } = query;
    const d = await deleteExercise(id);
    return res.status(200).json(d);
  }
}

async function getExercises(trainer) {
  const d = await request(
    "select seq, name, `desc`, category from exercise where trainer_id=?",
    [trainer]
  );
  return d;
}

async function createExercise({ name, desc, trainerId, groupId, category }) {
  const d = await request(
    `INSERT INTO bluegym.exercise (name,\`desc\`,trainer_id,group_id,category) VALUES (?,?,?,?,?)`,
    [name, desc, trainerId, groupId, category]
  );
  return d;
}

async function updateExercise({
  seq,
  name,
  desc,
  category,
  groupId,
  trainerId,
}) {
  const d = await request(
    `update exercise set name=?, \`desc\`=?, category=? where seq = ? and trainer_id=? and group_id =?;`,
    [name, desc, category, seq, trainerId, groupId]
  );
  return d;
}

async function deleteExercise(id) {
  const d = await request(`delete from exercise where seq=${id}`, [id]);
  return d;
}
