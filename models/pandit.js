let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let panditSchema=new Schema({
    name:{
    	type:String,
    	useCreatedIndex:true,
    	requiured:true
    },
    image_path:{
    	type:String,
    	useCreatedIndex:true,
    	requiured:true
    },
    status:{
    	type:String,
    	useCreatedIndex:true,
    	requiured:true
    },
     created_at:{
        type:Date,
        default: Date.now
     },
     updated_at:{
        type:Date,
        default: Date.now
     }
     },{
    timestamp:true
});

module.exports=panditSchema;