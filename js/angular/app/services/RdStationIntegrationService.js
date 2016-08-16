//Serviço com as requisições ao RdStation
app.service('RdStationIntegrationService', ["$http", "$q", function ($http, $q) {
    this.DiagnosticoMktVendasIniciado = function (email, name, position, company, numberOfEmployees, occupationArea, website) {
        var deferred = $q.defer();

        var req = {
	        method: 'POST',
	        url: 'https://www.rdstation.com.br/api/1.3/conversions',
	        headers: {
	            'Content-type': 'application/json'
	        },
	        data: {
				"token_rdstation": "40745848f471b10fc6fe7e699831fceb",
				"identificador": "diagnostico-mkt-vendas-iniciado",
				"email": email,
				"nome": name, 
				"cargo": position,
				"empresa": company,
				"numero-de-funcionarios": numberOfEmployees,
				"website": website,
				"area-de-atuacao-da-empresa": occupationArea
			}
	    }

        $http(req).then(function (response) {
            deferred.resolve(response);
        }, function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };

    this.DiagnosticoMktVendasFinalizado = function (email, answers, url, score) {
        var deferred = $q.defer();

        var data = this.AnswerToData(answers);

        data.token_rdstation = "40745848f471b10fc6fe7e699831fceb";
		data.identificador = "diagnostico-mkt-vendas-finalizado";
		data.email = email;
		data.pagina_respostas = url;
		data.nota = score;

        var req = {
	        method: 'POST',
	        url: 'https://www.rdstation.com.br/api/1.3/conversions',
	        headers: {
	            'Content-type': 'application/json'
	        },
	        data: data
	    }

        $http(req).then(function (response) {
            deferred.resolve(response);
        }, function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };
    //Transforma cada resposta do usuário em um objeto, onde a chave é a pergunta e o valor a resposta
    this.AnswerToData = function(answers){
    	var data = {};

        var stringData = '{';

        for (var i = 0; i < answers.length; i++) {
        	if (i == answers.length - 1){
        		stringData += '"' + answers[i].Question + '":"' + answers[i].Answer + '"';
        	}
        	else{
	        	stringData += '"' + answers[i].Question + '":"' + answers[i].Answer + '", ';
	        }
        };

		stringData += '}';

        data = JSON.parse(stringData);

        return data;
    };
}]);