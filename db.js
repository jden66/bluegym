import mysql from "mysql2";
import { config } from "./core/config";

// create the connection to database
const connection = mysql.createConnection({
  ...config.db,
});

export const request = async (q, params) => {
  return new Promise((resolve, reject) => {
    connection.query(q, params, function (err, results) {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
