app.controller('IndexController', ['$scope', 'RdStationIntegrationService', 'LeadService', '$window', function(ng, RdStationIntegrationService, LeadService, $window){
	ng.Lead = {};

	ng.Init = function(){
		ng.Lead = LeadService.Get();
	};

	ng.Send = function(){
		RdStationIntegrationService.DiagnosticoMktVendasIniciado(ng.Lead.Email, ng.Lead.Name, ng.Lead.Position, ng.Lead.Company, ng.Lead.NumberOfEmployees, ng.Lead.OccupationArea, ng.Lead.Website).then(function (response) {
            if (response.status == 200) {
            	LeadService.Set(ng.Lead);
                $window.location.href = '/questions.html';
            }
            else {
            }
        }, function (error) {
        });
	};
}]);
