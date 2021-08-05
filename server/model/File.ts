import mongoose,{Document}  from "mongoose";

const Schema = mongoose.Schema;


//We've included the filename secure url, format, size, sender, receiver
const fileSchema = new Schema({
        filename: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        },
        format: {
            type: String,
            required: true
        },
        sizeInByte: {
            type: String,
            required: true
        },
        sender: {
            type: String,
        },
        receiver: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


// Interface  "IFile" has all the properties of mongoose document
interface IFile extends Document{
    filename: string,
    secure_url: string,
    sizeInByte: string,
    format: string,
    sender?: string,
    receiver?: string,
}

//typescript  IFILE interface
export default mongoose.model<IFile>("File", fileSchema)