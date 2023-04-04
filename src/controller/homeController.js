import pool from "../configs/connectDB";
import multer from "multer";

//render data user
let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM users");
    return res.render("index.ejs", { dataUser: rows });
};

//get detail user
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [
        userId,
    ]);
    return res.send(JSON.stringify(user));
};

//post user
let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    //tương tự như là : let firstName = req.body.firstName
    await pool.execute(
        "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ? )",
        [firstName, lastName, email, address]
    );

    return res.redirect("/");
};
//delete user
let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
    return res.redirect("/");
};

//edit user
let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]); // [user] is detructuring user
    // console.log(user)
    return res.render("update.ejs", { dataUser: user[0] }); // x <- y
};

//update user
let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(
        "UPDATE users set firstName =?, lastName=?, email=?, address=? WHERE id = ?",
        [firstName, lastName, email, address, id]
    );
    return res.redirect("/");
};

//upload file
let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs');
};
const upload = multer().single('profile_pic');
const uploadMultiple = multer().array('multiple_images')


let handleUploadFile = async (req, res) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let uploadMultipleFiles = async(req, res, error) => {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        console.log('check file:',files);
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
}


module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    getUploadFilePage,
    handleUploadFile,
    uploadMultipleFiles,
};
