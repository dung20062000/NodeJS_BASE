import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM users");

    return res.status(200).json({
        message: "ok",
        data: rows,
    });
};
//tạo mới người dung API
let createNewUser = async (req, res) => {
    //tương tự như là : let firstName = req.body.firstName
    let { firstName, lastName, email, address } = req.body;

    //kiểm tra dữ liệu khi truyền lên server
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: "missing required fields",
        });
    }
    await pool.execute(
        "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ? )",
        [firstName, lastName, email, address]
    );

    return res.status(200).json({
        message: "ok",
    });
};

//update người dung API
let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    //kiểm tra dữ liệu khi truyền lên server
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "missing required fields",
        });
    }
    await pool.execute(
        "UPDATE users set firstName =?, lastName=?, email=?, address=? WHERE id = ?",
        [firstName, lastName, email, address, id]
    );

    return res.status(200).json({
        message: "ok",
    });
};

//xóa người dung API
let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: "missing required fields",
        });
    }
    await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

    return res.status(200).json({
        message: "ok",
    });
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};
