Array.prototype.toInt=function(){
	return this.map(function(x){return parseInt(x)})
}


var bookListModule = angular.module("BookListModule", ['books.directive']);
bookListModule.controller('BookListCtrl',function($scope,$state,$http, $stateParams,$modal,Book,Publisher) {

	// alert($stateParams.bookType)
	$scope.buttonname="AddBook";
	$scope.publishers=Publisher.query();

	
	$scope.data =  Book.query({ id:$stateParams.bookType });


	$scope.get_book_detail=function(bookId){
		$state.go('bookdetail', {"bookId": bookId})
	}
	$scope.edit_book=function(bookId){
		$http.get('/book_e/'+bookId).then(function (result) {
			if (result.statusText=='OK') {
				// $modalInstance.close();
				$modal.open({
		            templateUrl: '/static/muke/addBookForm.html',
		            backdrop: "static",
		            controller: 'BookEditCtrl',
		            size: 'md',
					resolve: {
						data: function(){
                        	return {
                        	'bookId':bookId,
                        	'obj':result.data,
                        	};
                    	}
					}

       			}).result.then(function () {
            	});
			} else {
			}
        }).finally(function () {
        });
	}

	$scope.openAddBookModal = openAddBookModal;
    function openAddBookModal(){
    	$modal.open({
	            templateUrl: '/static/muke/addBookForm.html',
	            backdrop: "static",
	            controller: 'BookAddCtrl',
	            size: 'md',
	             resolve: {
	             }
        }).result.then(function () {
            });
    }

});
bookListModule.controller('BookEditCtrl', BookEditCtrl);
function BookEditCtrl($scope, $state,$http, $modalInstance, $stateParams,Book,Publisher,Author,data) {
   



    $scope.add = function(){
    	$scope.bookInfo['id'] = data.bookId
    	$scope.bookInfo['publisher']=parseInt($scope.bookInfo['publisher']);
    	$scope.bookInfo['author']=$scope.bookInfo['author'].toInt();

    	console.log($scope.bookInfo);
        $http.post('/book/update/',$scope.bookInfo).then(function (result) {
			if (result.data.success) {
				$modalInstance.close();
				alert('update successfully');
			} else {
				$modalInstance.close();
				alert('update failed');
			}
        }).finally(function () {
        });
    }
    $scope.aa=data.obj.title;
    // $scope.bookInfo['title']=data.obj.title;
    // $scope.bookInfo['publisher'] = data.obj.publisher

	$scope.publishers=Publisher.query();
	$scope.authors=Author.query();


	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};

}

bookListModule.controller('BookAddCtrl', BookAddCtrl);
function BookAddCtrl($scope, $state,$http, $modalInstance, $stateParams,Book,Publisher,Author) {
    $scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
	
    $scope.add = function(){
    	$scope.bookInfo['publisher']=parseInt($scope.bookInfo['publisher']);
    	$scope.bookInfo['author']=$scope.bookInfo['author'].toInt();

    	console.log($scope.bookInfo);
        $http.post('/book/add/',$scope.bookInfo).then(function (result) {
        	console.log(result)
			if (result.data.success) {
				$modalInstance.close();
				alert('add successfully');
			} else {
				$modalInstance.close();
				alert('add failed');
			}
        }).finally(function () {
        });
    }

	$scope.publishers=Publisher.query();
	$scope.authors=Author.query();
}



var bookDetailModule = angular.module("BookDetailModule", []);
bookDetailModule.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {

	$scope.setData = function(data){
		$scope.name = data.name;
		$scope.type = data.booktype;
		$scope.author = data.author
		$scope.pdate = data.publishdate;
		$scope.price = data.price;
		$scope.Ebook = data.Ebook;
	}

    $scope.getDataAsync=$http.get('/static/data/books'+ $stateParams.bookId+'.json')
	                    .success(function(largeLoad) {
	                        $scope.setData(largeLoad[0]);
	                    });
    console.log($scope.getDataAsync);
	    
});



var bookAddModule = angular.module("BookAddModule", []);
