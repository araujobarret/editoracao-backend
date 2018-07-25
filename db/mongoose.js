let mongoose = require('mongoose');

let options = {
	server: { socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
	replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};

// mLab connection
let mLabUri = "mongodb://editoracaoadmin:benjamin@ds255265.mlab.com:55265/editoracao";

mongoose.set('debug', true)
mongoose.Promise = global.Promise;
mongoose.connect(mLabUri, options);
let conn = mongoose.connection;

conn.on("error", console.error.bind(console, "conection error:"));

module.exports = {
	mongoose
};
