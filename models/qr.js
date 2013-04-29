//QR Schema
var mongoose = require('mongoose'),  
    Schema = mongoose.Schema;  

var Target = new Schema({  
    country: String, 
    platform: {
        type: String,
        enum: ['android', 'iphone', 'ipad', 'ios', 'blackberry', 'windowsphone', 'desktop', 'any']
    },
    url: String
});  

var QRSchema = new Schema({  
    folder: String,  
    url: String,  
    targets: [Target]
});  
  
//Export the schema  
module.exports = mongoose.model('QR', QRSchema);  