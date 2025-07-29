import mongoose, { model } from "mongoose";

const dataSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type: String,
        required: true,
        enum:["jwt", "md5", "sha1"]
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
},{timestamps:true})

dataSchema.pre("save", async function(next){
    const count = model("data").countDocuments({name: this.name})
    if(count> 0 )
        throw next(new Error("name already exist"))
    next()
})

const finalData = mongoose.model("Data", dataSchema)
export default finalData