import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required : true  },
    age: { type: Number, required: true },
    photo: {type: Buffer, required: false},
    score: { type: Number, default: 0, required: false}
    });

 
export default mongoose.models.User || model("User", UserSchema);;