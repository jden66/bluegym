import mysql from "mysql2";
import { config } from "./core/config";

const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
}

export async function request(q, params) {
  return new Promise((resolve, reject) => {
    getConnection((conn) => {
      conn.query(q, params, function (err, results) {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      });
      conn.release();
    });
  });
}
