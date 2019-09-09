let mongoose=require('mongoose');
let panditSchema=require('./pandit');

panditSchema.statics={
	create:function(data,cb){
     let pandit=new this(data);
         pandit.save(cb);
	},
	get:function(query,cb){
		this.find(query,cb);
	},
	update:function(query,updateData,cb){
           this.findOneAndUpdate(query,{$set:updateData},{new:true},cb);
	},
	delete:function(query,cb){
		this.findOneAndDelete(query,cb);
	}
}

let panditModel=mongoose.model('pandits',panditSchema);
module.exports=panditModel;