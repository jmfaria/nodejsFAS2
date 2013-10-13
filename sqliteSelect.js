
var sqlite = require('sqlite3');

var msg = [];
var emails = [];
function select(){
	var db = new sqlite.Database('E:\\nodejs\\historico.s3db');
	db.serialize(function() {
		db.each("SELECT count(*) as num FROM chat", function(err, row) {
			//console.log("Quantidade de mensagens no banco: " + row.num);
			msg.push("\nQuantidade de mensagens do Chat: " + row.num + "\n");
			//callback();
		  });
		db.each("SELECT id, nickname, mensagem FROM chat", function(err, row) {
			//console.log("<"+row.id +"> " + row.nickname + ": " + row.mensagem);		
			msg.push("\n<"+row.id +"> " + row.nickname + ": " + row.mensagem + "\n");
			//callback();			
		  });
		  db.each("SELECT distinct nickname FROM chat", function(err, row) {
			//console.log("<"+row.id +"> " + row.nickname + ": " + row.mensagem);		
			emails.push("\"" + row.nickname + "\"");
			//callback();			
		  });
	});
	db.close();		
}

module.exports.select = select;
module.exports.msg = msg;
module.exports.emails = emails;
	
	