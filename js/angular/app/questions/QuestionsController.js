app.controller('QuestionsController', ['$scope', '$window', 'QuestionsValue', 'QuestionsService', 'RdStationIntegrationService', 'LeadService', '$location', 'BitlyService', function(ng, $window, QuestionsValue, QuestionsService, RdStationIntegrationService, LeadService, $location, BitlyService){
	//Indice da questão exibida em tela
	ng.CurrentQuestion = 0;
	//Porcentagem de resposta do questionário
	ng.Percent = '0%';
	//Objeto de questões
	ng.QuestionsObj = {};
	//Objeto com os dados do lead
	ng.Lead = {};

	//Função inicial
	ng.Init = function(){
		ng.QuestionsObj = QuestionsValue;
		ng.Lead = LeadService.Get(); //Carrega os dados do lead armazenados em cookies
		LeadService.Remove(); //Remove esses dados do lead dos cookies

		//Se não houver informação do lead, redireciona usuário para a tela incial
		if (ng.Lead.Email == ''){
			$window.location.href = "/index.html";
		}
	};

	//Avança para a próxima questão
	ng.NextQuestion = function(){
		//Só vança para a proxima questão se o usuário selecionou uma resposta
		if (ng.QuestionsObj.Questions[ng.CurrentQuestion].Answer != ''){
			ng.CurrentQuestion = ng.CurrentQuestion + 1;
			ng.Percent = (8.33 * ng.CurrentQuestion) + '%'; //Porcentagem é calculada usando o calculo (numero de questões / 100) * (indice da questão exibida em tela + 1)
		}
	};

	//Finaliza o questionário
	ng.Finish = function(){	
		//Só finaliza o questionario se o usuário selecionou uma resposta para a ultima pergunta
		if (ng.QuestionsObj.Questions[ng.CurrentQuestion].Answer != ''){	
			//Calcula o resultado final. O retorno é um objeto contendo a pontuação e o resultado do questionário respondido
			var ret = QuestionsService.Score(ng.QuestionsObj.Questions);

			ng.QuestionsObj.Score = ret.score;
			ng.QuestionsObj.Result = ret.result;

			//Cria um objeto com as respostas para salvar no RdStation
			var answers = QuestionsService.CreateAnswerObj(ng.QuestionsObj.Questions);

			//Cria querystring com base nas respostas do usuário
			var hash = QuestionsService.ObjectToHash(ng.QuestionsObj.Questions, ng.Lead.Email, ng.Lead.Name, ng.QuestionsObj.Score);			
			
			//Monta url para página de resultados
			var url = $window.location.href.replace($window.location.pathname, '') + '/query.html?' + hash;

			//Encurtar url para salvar no RdStation
			BitlyService.Short(url).then(function (response) {
			    if (response.status == 200) {
			        var shortUrl = response.data.data.url;

			        //Requisição de diagnostico de vedas finalizado para o RdStation 
			        RdStationIntegrationService.DiagnosticoMktVendasFinalizado(ng.Lead.Email, answers, shortUrl, ng.QuestionsObj.Score).then(function (response) {
			            if (response.status == 200) {
			                $window.location.href = url;
			            }
			            else {
			            }
			        }, function (error) {
			        });
			    }
			    else {
			    }
			}, function (error) {
			});			
	    }
	};
}]);