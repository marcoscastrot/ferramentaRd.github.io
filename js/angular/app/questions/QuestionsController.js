app.controller('QuestionsController', ['$scope', '$window', 'QuestionsValue', 'QuestionsService', 'RdStationIntegrationService', 'LeadService', '$location', function(ng, $window, QuestionsValue, QuestionsService, RdStationIntegrationService, LeadService, $location){
	ng.CurrentQuestion = 0;
	ng.Percent = '0%';
	ng.QuestionsObj = {};
	ng.Lead = {};

	ng.Init = function(){
		ng.QuestionsObj = QuestionsValue;
		ng.Lead = LeadService.Get();
		LeadService.Remove();

		if (ng.Lead.Email == ''){
			$window.location.href = "/index.html";
		}
	};

	ng.NextQuestion = function(){
		if (ng.QuestionsObj.Questions[ng.CurrentQuestion].Answer != ''){
			ng.CurrentQuestion = ng.CurrentQuestion + 1;
			ng.Percent = (8.33 * ng.CurrentQuestion) + '%';
		}
	};

	ng.Finish = function(){	
		if (ng.QuestionsObj.Questions[ng.CurrentQuestion].Answer != ''){	
			var ret = QuestionsService.Score(ng.QuestionsObj.Questions);

			ng.QuestionsObj.Score = ret.score;
			ng.QuestionsObj.Result = ret.result;

			var hash = QuestionsService.ObjectToHash(ng.QuestionsObj.Questions, ng.Lead.Email, ng.Lead.Name, ng.QuestionsObj.Score);

			var url = $window.location.href.replace($window.location.pathname, '') + '/results.html?' + hash;

			var answers = QuestionsService.CreateAnswerObj(ng.QuestionsObj.Questions);

			RdStationIntegrationService.DiagnosticoMktVendasFinalizado(ng.Lead.Email, answers, url, ng.QuestionsObj.Score).then(function (response) {
	            if (response.status == 200) {
	                $window.location.href = url;
	            }
	            else {
	            }
	        }, function (error) {
	        });
	    }
	};
}]);