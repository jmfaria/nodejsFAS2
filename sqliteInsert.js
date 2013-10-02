var sys    = require('sys'),
 sqlite = require('sqlite3');

var db = new sqlite.Database('E:\\nodejs\\historico.s3db');
db.serialize(function() {
	
	var stmt = db.prepare("INSERT INTO chat(nickname, mensagem) VALUES (?,?)");
	stmt.run("nick","mensagem");
	stmt.finalize();
});
db.close();