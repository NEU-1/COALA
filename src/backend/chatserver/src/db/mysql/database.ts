import mysql, { RowDataPacket } from 'mysql2'

const pool = mysql.createPool({
  host     : process.env.MYSQL_DB_HOST,
  user     : process.env.MYSQL_DB_USER,
  port     : Number(process.env.MYSQL_DB_PORT),
  password : process.env.MYSQL_DB_PASSWORD,
  database : process.env.MYSQL_DB_DATABASE,
  dateStrings : true,
})

const dbQuery = function(query:string, input:any) {
  return new Promise<any>((resolve, reject) => {
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