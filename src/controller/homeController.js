import pool from "../configs/connectDB";

let getHomePage = async(req, res) => {

  const[rows, fields] = await pool.execute('SELECT * FROM users');

  return res.render('index.ejs', {dataUser: rows});
}
let getDetailPage = async (req, res) => {
  
  let userId= req.params.id;
  // console.log(userId);
  let [user]= await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId])
  return res.send(JSON.stringify(user));
};
module.exports = {
    getHomePage,
    getDetailPage,
}