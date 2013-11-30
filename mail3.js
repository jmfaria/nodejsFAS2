var nodemailer = require("nodemailer");

//Fun��o que recebe o resumo do chat "msg", e os emails utilizados por seus usu�rios
exports.enviar = function(msg, emails){

	var mailOptions = {
	   from: "", // Remetente
	   to: emails.toString(),	   
	   subject: "Chat NodeJS - FAS2", // Assunto
	   text: msg // Mensagem
	}
	
	//Configura��es do email, como provedor, endere�o e senha
	var smtpTransport = nodemailer.createTransport("SMTP",{
	   service: "Gmail",
	   auth: {
		   user: "email@gmail.com",
		   pass: "senha"
	   }
	});	
		
	//Func�o que executa o envio das mensagens
	smtpTransport.sendMail(mailOptions, function(error, response){
	
		console.log(emails.toString());
		
	   if(error){
		   console.log(error);
	   }else{
		   console.log("Mensagem enviada: " + response.message);
	   }
	});		
}

