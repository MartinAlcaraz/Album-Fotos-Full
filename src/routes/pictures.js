import { Router } from "express";
import picturesCtrl from "../controllers/pictures.controller.js";
const { getPictures, postPicture, deletePictures, getOnePicture } = picturesCtrl;
const router = Router();

router.route('/')
    .post(postPicture);
router.route('/:id')
    .get(getPictures)
    .delete(deletePictures)

export default router;