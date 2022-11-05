import { Schema, model } from "mongoose";

const userSchema= new Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    img: {
        type: String,
        data: Buffer
    },
    active: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true    // guarda la fecha de cracion y actualizacion del objeto.
});

const User = model('User', userSchema);

export default User;