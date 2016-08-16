app.controller('ResultsController', ['$scope', 'QuestionsValue', 'QuestionsService', '$location', 'BitlyService', 'ResultService', '$window', function(ng, QuestionsValue, QuestionsService, $location, BitlyService, ResultService, $window){
	//Objeto de questões
	ng.QuestionsObj = {};
	//Objeto contendo os resultados
	ng.QueryResult = {};
	//Categoria das perguntas. Atração como inicial
	ng.Category = 'Atração';
	//Url encurtada da página
	ng.PageUrl = '';

	ng.Init = function(){
		var resultObj = ResultService.Get(); //Recupera dados do resultado do questionário

		//Se as informações de resposta não estiverem nos cookies, usuário sera redirecionad para página inicial
		if (resultObj.ShortUrl != ''){
			ResultService.Remove(); //Se houver dados remove essa informação dos cookies
	        ng.PageUrl = resultObj.ShortUrl;

			ng.QuestionsObj = QuestionsValue;
			ng.QueryResult = resultObj.Results;
			//Insere as respostas no objeto de questões
			ng.QuestionsObj.Questions = QuestionsService.SetAnswers(ng.QuestionsObj.Questions, ng.QueryResult.Answers);
		}
		else{
			$window.location.href = "/index.html";	
		}
	};
}]);