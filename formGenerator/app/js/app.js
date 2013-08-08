'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/login', {templateUrl: 'partials/login.html', controller: OrderListCtrl}).
      when('/orderForm', {templateUrl: 'partials/order-form.html', controller: OrderListCtrl}).
      when('/checkout', {templateUrl: 'partials/final-form.html', controller: OrderListCtrl}).
      otherwise({redirectTo: '/login'});
}]);
