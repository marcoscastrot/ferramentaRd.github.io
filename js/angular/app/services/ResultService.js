//Serviço para armezar, buscar e remover informações dos resultados das respostas nos cookies
app.service("ResultService", ['$cookies', function ($cookies) {
    this.Set = function (Results) {
        $cookies.putObject('Results', Results, { path: '/' });
    };

    this.Get = function () {
        var results = $cookies.getObject('Results');

        if (results) return results;
        
        return {
			     	Results: {
                        Name: '',
                        Email: '',
                        Score: '',
                        Result: '',
                        Answers: []
                    },
                    ShortUrl: ''
			   };
    };

    this.Remove = function () {
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            if (k == 'Results') {
                $cookies.remove(k, { path: '/' });
            }
        });
    };
}]);