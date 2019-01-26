var mongoose = require('mongoose');
require('dotenv').config()
var uname = process.env.DB_UNAME;
var passwd= process.env.DB_PASS;
mongoose.connect(`mongodb://${uname}:${passwd}@ds121382.mlab.com:21382/tonidb`);