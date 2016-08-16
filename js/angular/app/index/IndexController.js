app.controller('IndexController', ['$scope', 'RdStationIntegrationService', 'LeadService', '$window', function(ng, RdStationIntegrationService, LeadService, $window){
    //Objeto com os dados do lead
    ng.Lead = {};

	ng.Init = function(){
		ng.Lead = LeadService.Get();
	};

	ng.Send = function(){
        //Requisição de diagnostico de vedas iniciado para o RdStation 
		RdStationIntegrationService.DiagnosticoMktVendasIniciado(ng.Lead.Email, ng.Lead.Name, ng.Lead.Position, ng.Lead.Company, ng.Lead.NumberOfEmployees, ng.Lead.OccupationArea, ng.Lead.Website).then(function (response) {
            if (response.status == 200) {
            	LeadService.Set(ng.Lead); //Salva os dados do lead nos cookies do navegador
                $window.location.href = '/questions.html'; //Redireciona para a página de resultados
            }
            else {
            }
        }, function (error) {
        });
	};
}]);
