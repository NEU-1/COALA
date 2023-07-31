const mysql = require('mysql')

const MYSQL_DB_HOST='localhost'
const MYSQL_DB_USER='root'
const MYSQL_DB_PASSWORD='712412'
const MYSQL_DB_DATABASE='d108team'

const SSAFY_DB_HOST='kshv02.ipdisk.co.kr'
const SSAFY_DB_USER='D108'
const SSAFY_DB_PASSWORD='ssafy'
const SSAFY_DB_DATABASE='S09P11D108'

const pool = mysql.createPool({
  host     : SSAFY_DB_HOST,
  user     : SSAFY_DB_USER,
  password : SSAFY_DB_PASSWORD,
  database : SSAFY_DB_DATABASE,
})

const pool1 = mysql.createPool({
  host     : MYSQL_DB_HOST,
  user     : MYSQL_DB_USER,
  password : MYSQL_DB_PASSWORD,
  database : MYSQL_DB_DATABASE,
})

console.log('SSAFY :',pool)

console.log("local :",pool1)