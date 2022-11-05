import { Schema, model } from "mongoose";

const userPicturesSchema= new Schema({
    userId: Object,    
    images: [{
        type: String,
        data: Buffer
    }]
},{
    timestamps: true    // guarda la fecha de cracion y actualizacion del objeto.
});

const UserPictures = model('UserPictures', userPicturesSchema);

export default UserPictures;