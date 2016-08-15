app.controller('ResultsController', ['$scope', 'QuestionsValue', 'QuestionsService', '$location', function(ng, QuestionsValue, QuestionsService, $location){
	ng.QuestionsObj = {};
	ng.QueryResult = {};
	ng.Category = 'Atração';
	ng.PageUrl = $location.absUrl();

	ng.Init = function(){
		ng.QuestionsObj = QuestionsValue;
		ng.QueryResult = QuestionsService.HashToObject($location.absUrl());
		ng.QuestionsObj.Questions = QuestionsService.SetAnswers(ng.QuestionsObj.Questions, ng.QueryResult.Answers);
	};
}]);