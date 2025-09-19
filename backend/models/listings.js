import mongoose from 'mongoose'



const listingSchema = mongoose.Schema( {
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        fileName : String,
    },
    price : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    }
} , {timestamps : true} )

const Listing = mongoose.model('Listing' , listingSchema);

export default Listing;