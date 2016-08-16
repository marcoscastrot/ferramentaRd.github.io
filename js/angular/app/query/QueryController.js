//Controller de página intermediária entre o questionário e o resultado
//A função dessa página é ler os dados do usuário e das respostas do usuário que virão por query string,
//salvar esses dados nos cookies e redirecionar o usuário para a página de resultados
app.controller('QueryController', ['$scope', 'QuestionsService', '$location', 'BitlyService', 'ResultService', '$window', function(ng, QuestionsService, $location, BitlyService, ResultService, $window){
	ng.Init = function(){
		var absUrl = $location.absUrl().split('?');
		//Encurtar url
		BitlyService.Short(absUrl[0] + '?' + encodeURIComponent(absUrl[1])).then(function (response) {
		    if (response.status == 200) {
		    	//Transforma querystring em objeto
		    	var queryObj = QuestionsService.HashToObject($location.absUrl());

		    	//Salva os dados de resultado nos cookies
		    	ResultService.Set({
		    		Results: queryObj,
		    		ShortUrl: response.data.data.url
		    	});

			$window.location.href = "/results.html";
		    }
		    else {
		    }
		}, function (error) {
		});	
	};
}]);