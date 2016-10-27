var myApp = angular.module('myApp', [
    'ui.router',
    'ngGrid',
    'ngResource',
    "ngCookies",
    'oc.lazyLoad',
    'ui.bootstrap',
    'ngTable',
    'BookListModule',
    'BookDetailModule',
    'BookAddModule',
    'book.resources',
]);

myApp.run(function($rootScope, $http,$cookies,$state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];

    // $.ajax({
    // url : url,
    // type: "POST",
    // data : {csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value},
    // dataType : "json",
    // success: function( data ){
    //     // do something
    // }

    // @csrf_protect
    // def my_view(request):
    //     ...

    // <form method="POST" action="/post-url/">
    //     {% csrf_token %}

    //     <input name='zqxt' value="自强学堂学习Django技术">
    // </form>


    // 或者 更为优雅简洁的代码（不能写在 .js 中，要直接写在模板文件中）：

    // $.ajaxSetup({
    //     data: {csrfmiddlewaretoken: '{{ csrf_token }}' },
    // });

    // $(function() {
    //     $.ajaxSetup({
    //         headers : {
    //             'CSRFToken' : getCSRFTokenValue()
    //         }
    // });


    // var token = "SOME_TOKEN";
    // $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    //   jqXHR.setRequestHeader('X-CSRF-Token', token);
    // });
});




});
});


 function tpl(html){
    return '/static/muke/'+html;

 }
 myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            views: {
                '': {
                    templateUrl: tpl('home.html')
                },
                'main@index': {
                    templateUrl: tpl('LoginForm.html')
                }
            }
        })
        .state('booklist',{
            url: '/{bookType:[0-9]{1,4}}',
            views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: tpl('bookList.html')
                },
                'booktype@booklist': {
                    templateUrl: tpl('bookType.html')
                },
                'bookgrid@booklist': {
                    templateUrl: tpl('bookGrid.html'),
                }
            },
        })
        .state('bookdetail', {
            url: '/bookdetail/:bookId',
            templateUrl: tpl('bookDetail.html'),
            resolve: {
                bookid: function ($stateParams) {
                    return $stateParams.bookId;
                },
            }
        })
        // .state('addbook', {
        //     url: '/addbook',
        //     templateUrl: tpl('addBookForm.html')
        // })
});