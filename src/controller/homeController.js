import pool from "../configs/connectDB";

//render data user
let getHomePage = async(req, res) => {
  const[rows, fields] = await pool.execute('SELECT * FROM users');
  return res.render('index.ejs', {dataUser: rows});
}

//get detail user
let getDetailPage = async (req, res) => {
  let userId= req.params.id;
  let [user]= await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId])
  return res.send(JSON.stringify(user));
};

//post user
let createNewUser = async (req, res) => {
  console.log('check request:', req.body);
  let {firstName, lastName, email, address} = req.body;
  //tương tự như là : let firstName = req.body.firstName
  await pool.execute('INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ? )', 
  [firstName, lastName, email, address])
  
  return res.redirect('/')
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
}