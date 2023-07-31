import mysql, { RowDataPacket } from 'mysql2'

const MYSQL_DB_HOST='localhost'
const MYSQL_DB_USER='root'
const MYSQL_DB_PASSWORD='712412'
const MYSQL_DB_DATABASE='d108team'

const SSAFY_DB_HOST='stg-yswa-kr-practice-db-master.mariadb.database.azure.com'
const SSAFY_DB_USER='S09P11D108'
const SSAFY_DB_PASSWORD='Is1NYFYVfM'
const SSAFY_DB_DATABASE='S09P11D108'

const pool = mysql.createPool({
  host     : MYSQL_DB_HOST,
  user     : MYSQL_DB_USER,
  password : MYSQL_DB_PASSWORD,
  database : MYSQL_DB_DATABASE,
  dateStrings : true,
})

const dbQuery = function(query:string, input:any) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(query, input, (error, result) => {
        connection.release();
        if (error) {
          return reject(error);
        }
        resolve(result);
        console.log('Query Executed!')
      });
    });
  });
};

export default dbQuery;