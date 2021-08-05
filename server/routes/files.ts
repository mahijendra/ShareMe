//in this upload router we need to handle the file and to fetch the file inside this app we used the mutli package and to store the file we use cloudinary
// string the assets on the cloudinary

import express from 'express'
import multer from 'multer'
import {UploadApiResponse, v2 as cloudinary} from 'cloudinary'
import File from "../model/File"

const router = express.Router();

const storage = multer.diskStorage({})

//using this as temporary storage in our app.local and call this as  a middleware in router.post
let upload = multer({
    storage
})

router.post("/upload", upload.single("myFile"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({message: "Hey there! We need the file"})

        console.log(req.file);

        //storing the file in the variable "uploadedFile" and getting the api response from UploadApiResponse
        let uploadedFile: UploadApiResponse;

        try {
            //it an async call. Here we're uploading the file
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "shareme",
                resource_type: "auto" //It should be auto v=because it only accepts the images and the videos, but here we're going to accept all types of formats
            })
        } catch (error) {
            console.log(error.message)

            return res.status(400).json({message: "Cloudinary Error"})
        }

        const {originalname} = req.file     // grabbing the original name of the file from multer name object
        const {secure_url, bytes, format} = uploadedFile // grabbing the uploaded file from the cloudinary

        // Saving files in the database
        // There are couple of ways to store the data in the mongoose, 1) Using the constructor of the model and 2) Create method

        const file = await File.create({
            filename: originalname,
            sizeInByte: bytes,
            secure_url,
            format,
        });
        res.status(200).json(file);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Server Error :( "})
    }
})


export default router