angular.module('book.resources', [])
.factory('Publisher', ['$resource', function($resource){
    return $resource("/publisher/:id/:action/", {id: '@id'},
    	{
            query: {isArray: true},
            // getItems: {isArray: true, params: {action: "items"}},

        });
}])

.factory('Author', ['$resource', function($resource){
    return $resource("/author/:id/:action/", {id: '@id'},
    	{
            query: {isArray: true},
            // getItems: {isArray: true, params: {action: "items"}},

        });
}])

.factory('Book', ['$resource', function($resource){
    return $resource("/book/:id/:action/", {id: '@id'},
    	{
            query: {isArray: true},
            // getItems: {isArray: true, params: {action: "items"}},
        });
}]);