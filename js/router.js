app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/ts/tsindex');
    $stateProvider
    	.state('home', {
            url: '/home',
            templateUrl: 'tpl/app.html'
        })
        .state('home.ts', {
	        url: '/ts',
	        template: '<div class="padding fade-in-up" ui-view></div>'
	    })
	    .state('home.ts.tsindex', {
	        url: '/tsindex',
	        templateUrl: 'tpl/content.html'
      	})
	    .state('home.base', {
	        url: '/base',
	        template: '<div class="padding fade-in-up" ui-view></div>'
	    })
	    .state('home.base.button', {
	        url: '/buttonIndex',
	        templateUrl: 'tpl/button.html'
	    })
	    .state('home.user', {
	        url: '/base',
	        template: '<div class="padding fade-in-up" ui-view></div>'
	    })
	    .state('home.user.index', {
	        url: '/userIndex',
	        templateUrl: 'tpl/user.html'
	    })
	    .state('home.table', {
	        url: '/table',
	        template: '<div class="padding fade-in-up" ui-view></div>'
	    })
	    .state('home.table.index', {
	        url: '/userIndex',
	        templateUrl: 'tpl/table.html'
	    })
})