import mongoose from "mongoose"
const privSchema = new mongoose.Schema({
    permission: {
        type: Number,
        default : 0,
    }
},{timestamps:true})
export default mongoose.model("private",privSchema)