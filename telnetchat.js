var net = require('net'); // Carrega o módulo TCP.
var carrier = require('carrier'); // Carrega o módulo Carrier.
var connections = []; // Cria um array de conexões.  

sqliteS = require('./sqliteSelect.js');
email = require('./mail3.js');

// Inicia o servidor.  
var server = net.createServer(function(conn){ 

 //address = net.address();
 //Exibe dados do cliente, como endereço e porta utilizada
 console.log("Stream on %j", conn.address());
 //console.log("opened server on %j", address);
 
 
  // Adiciona no array uma conexão de um usuário.
  connections.push(conn);  
  
  
  /*
	O Nodejs trabalha com eventos do lado do servidor, que são diferente de eventos do lado cliente(mouse clicked, mouse over, keypress)
	Um evento do lado do servidor por ser alteração no status de uma conexão, ou recebimento de dados por exemplo.
  */
  // Evento que remove o usuário do array quando ele é desconectado.
  conn.on('close', function(){ 
  
	//Captura a posição do array em que a conexão fechada está
    var pos = connections.indexOf(conn);		
	
	//Se houver mais de uma conexão
    if(connections.length > 0){	
		//Então essa conexão será fechada, removendo "1" conexão do array	
		connections.splice(pos, 1);
	  
	  //Se após fechar a conexão, não houverem mais conexões
	  if(connections.length == 0){				
		//Faz o select no banco buscando as mensagens
		sqliteS.select();				
		
		//Envia o email com retardo de 3 segundos
		setTimeout(function(){
		email.enviar(sqliteS.msg, sqliteS.emails);},
		3000);
	  }	  
    }
  });

  //Imprime no cliente a mensagem de início no mini-chat.  
  conn.write('Node ChatName(email): ');
  // Variável para identificar o nome do usuário conectado.  
  var username;

  // No evento carry é que o mini-chat acontece.  
  // A variável line é responsável por carregar as mensagens do chat.  
  carrier.carry(conn, function(line){
    // Se a variável username estiver nula, é definido o um nome para ela.  
    if(!username){
      username = line;
      conn.write("Ola! "+ username +"\r\n");
      return;
    }
    // Aqui comparo o valor de line com as palavras-chaves "end","quit" e "exit" que irão finalizar uma conexão.  
    if(line == 'end' || line == 'quit' || line == 'exit'){
      conn.end();
      return;
    }

    // Se nenhuma das condições acontecer, então preparamos uma  mensagem de feedback.  
    var feedback = "<<" + username +">>: "+ line +"\r\n";
	sqliteI = require('./sqliteInsert.js');
	sqliteI.insert(username, line);
	

    //Aqui ocorre o loop de distribuição de mensageria.  
    connections.forEach(function(one_connection){
      one_connection.write(feedback);		
    });
  });
});
// Inicia o servidor na porta 4000.  
server.listen(4000); 
// Mensagem de servidor ligado.
console.log("Servidor mini-chat em execucao.");