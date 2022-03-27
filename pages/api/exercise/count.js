import { request } from "../../../db";

export default async function handler(req, res) {
  const { method, query } = req;
  if (method === "GET") {
    const { trainer: trainerId } = query;

    const d = await getExerciseCounts(trainerId);
    return res.status(200).json(d);
  }
}

async function getExerciseCounts(trainerId) {
  const d = await request(
    "select count(*) as count from exercise where trainer_id=?",
    [trainerId]
  );
  return d[0];
}
