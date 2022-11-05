import UserPictures from '../models/UserPictures.js';

const picturesCtrl = {};

picturesCtrl.getPictures = async (req, res) => {  // busca todas las imagenes de un usuario

    const userId = await req.params.id;
    try {
        UserPictures.findOne({ userId: userId })
            .exec(function (err, result) {
                if (err) {
                    res.json({ message: "Error in findOne()." })
                } else {

                    if (result == null) {
                        res.json({ images: [] }) // devuelve un array vacio porque el usuario no existe en esta collection.(porque todavia no se agrego ninguna imagen)
                    } else {
                        res.json({ images: result.images }) // devuelve un array con las imagenes
                    }
                    
                }
            })
    } catch (error) {
        res.json({ messaje: error })
    }
}


picturesCtrl.postPicture = async (req, res) => {
    const { userId, img } = req.body;

    if (userId && img) {
        UserPictures.findOne({ userId: userId }).exec(function (error, data) {
            if (error) {
                res.status(500).send({ message: "Error al buscar si existe una img del usuario." })
            } else {

                if (data == null) { // se crea un nuevo registro
                    const newUserPicture = new UserPictures({ userId: userId, images: [img] });

                    newUserPicture.save(function (err, data) {
                        if (err) {
                            res.status(500).send({ updated: false, message: "Error al guardar la imagen" })
                        } else {
                            res.json({ updated: true });
                        }
                    })

                } else {

                    UserPictures.findOneAndUpdate(  // se actualiza el registro existente con la  imagen nueva
                        { userId: userId },
                        { '$push': { images: img } }    // agreaga una imagen al array images []
                    ).exec(function (err, result) {
                        if (err) {
                            res.status(500).send({ message: "", updated: false })
                        } else {
                            res.json({ updated: true })
                        }
                    });
                }
            }
        });

    } else {
        res.json({ message: "UserId and image are required" });
    }
}

picturesCtrl.deletePictures = async (req, res) => {
    try {
        const exist = await UserPictures.findById(req.params.id);
        // si existe el registro del usuario se eliminan todas las fotos del usuario
        if (exist) {
            const deleted = await UserPictures.findOneAndDelete(req.params.id)
            if (deleted) {
                res.json({ message: "Deleted user pictures", ok: true });
            }
        } else {
            res.json({ message: "The user pictures doesnt exist", ok: false });
        }
    } catch (error) {
        res.json({ message: "Could not delete user pictures",  ok: false });
    }
}

// picturesCtrl.getOnePicture = async (req, res) => {   // busca una sola imagen
//     try {
//         const note = await UserPictures.findById(req.params.id);
//         if (note) {
//             res.json({ note })
//         } else {
//             res.json({ message: "The note does not exist." })
//         }

//     } catch (err) {
//         res.json({ message: "Could not get note" });
//     }
// }


export default picturesCtrl;