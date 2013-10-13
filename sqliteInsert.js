var sqlite = require('sqlite3');

function insert(nick, msg){
	var db = new sqlite.Database('E:\\nodejs\\historico.s3db');
	db.serialize(function() {		
		var stmt = db.prepare("INSERT INTO chat(nickname, mensagem) VALUES (?,?)");
		stmt.run(nick, msg);
		stmt.finalize();
	});
	db.close();
}
module.exports.insert = insert;