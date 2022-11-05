import User from "../models/User.js";
const usersCtrl = {};

usersCtrl.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            res.json({ users })
        }
    } catch (err) {
        res.json({ message: "Could not get users." })
    }
};

usersCtrl.getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json({ user })
        }
    } catch (err) {
        res.json({ message: "Could not get users." })
    }
};

usersCtrl.postUser = async (req, res) => {
    try {
        const { userName, img } = await req.body;

        if (userName && img) {
            const newUser = new User({
                userName,
                img
            })
            const saved = await newUser.save();

            if (saved != undefined || saved != null) {
                res.json({ message: "User Saved.", saved: true })
            } else {
                res.json({ message: "User Not Saved.", saved: false })
            }
        } else {
            res.json({ message: "userName and image are required.", saved: false })
        }
    } catch (err) {
        res.json({ message: "Could not save the user.", ok: false })
        console.log('could not save')
    }
}

usersCtrl.deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);

        if (deleted) {
            res.json({ message: "User deleted", ok: true })
        } else {
            res.json({ message: "Could not delete user because does'nt exist", ok: false })
        }
    } catch (err) {
        res.json({ message: "Error. Could not delete user", ok: false })
    }
}

usersCtrl.setActiveUser = async (req, res) => {
    try {
        // se desactiva el unico usuario activo
        await User.findOneAndUpdate({ active: true }, { active: false });

        // se activa un usuario con el id especificado
        console.log('req.params.id ', req.params.id);
        
        const updated = await User.findByIdAndUpdate(req.params.id, { active: true });
        if (updated) {
            res.json({ message: "User updated" })
        }
    } catch (err) {
        res.json({ message: "Could not update user." })
    }
}

export default usersCtrl;

