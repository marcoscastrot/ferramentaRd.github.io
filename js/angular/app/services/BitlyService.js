//Serviço para encurtar url
app.service('BitlyService', ["$http", "$q", function ($http, $q) {
    this.Short = function (url) {
        var deferred = $q.defer();

        var req = {
            method: 'GET',
            url: 'https://api.bitly.com/v3/shorten?format=json&apiKey=R_7d8776cf13bd45b0bf4fa9376b1212c4&login=marketingrd&longUrl=' + url,
            headers: {
                'Content-type': 'application/json'
            }
        }

        $http(req).then(function (response) {
            deferred.resolve(response);
        }, function (response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };
}]);