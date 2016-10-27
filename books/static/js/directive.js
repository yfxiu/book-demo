angular.module('books.directive', [])
.directive('mytitle', function() { 
	return { 
		restrict: 'A', 
		template: '<h3>Book List!!!!!!</h3>', 
		replace: true, 
	};
}); 