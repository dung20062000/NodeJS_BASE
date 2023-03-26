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
  let {firstName, lastName, email, address} = req.body;
  //tương tự như là : let firstName = req.body.firstName
  await pool.execute('INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ? )', 
  [firstName, lastName, email, address])
  
  return res.redirect('/')
}
//delete user
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute('DELETE FROM users WHERE id = ?', [userId] )
  return res.redirect('/')
}

//edit user
let editUser =  async (req, res) => {

  let id = req.params.id;
  let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]) // [user] is detructuring user
  // console.log(user)
  return res.render('update.ejs', {dataUser: user[0]}) // x <- y 
}

//update user
  let updateUser = async  (req, res) => {
    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute('UPDATE users set firstName =?, lastName=?, email=?, address=? WHERE id = ?', [firstName, lastName, email, address, id] )
    return res.redirect('/')
  }


module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,

}