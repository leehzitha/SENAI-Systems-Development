import mongoose, { Schema, Document} from "mongoose";

interface IUser extends Document {
    id : number;
    name: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: Date;
}

const userSchema: Schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: false },
    active: { type: Boolean, required: true },
    createdAt: { type: Date, required: true }
});

const Userr = mongoose.model<IUser>('User', userSchema);

export default Userr;