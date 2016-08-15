app.service("LeadService", ['$cookies', function ($cookies) {
    this.Set = function (Lead) {
        $cookies.putObject('Lead', Lead, { path: '/' });
    };

    this.Get = function () {
        var lead = $cookies.getObject('Lead');

        if (lead) return lead;
        
        return {
					Email: '',
					Name: '',
					Position: '',
					Company: '',
					NumberOfEmployees: '',
					Website: '',
					OccupationArea: ''
				};
    };

    this.Remove = function () {
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            if (k == 'Lead') {
                $cookies.remove(k, { path: '/' });
            }
        });
    };
}]);