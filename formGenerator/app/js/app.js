'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones2', {templateUrl: 'partials/phone-list2.html',   controller: PhoneListCtrl2}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      when('/login', {templateUrl: 'partials/login.html', controller: OrderListCtrl}).
      when('/orderList', {templateUrl: 'partials/order-list.html', controller: OrderListCtrl}).
      otherwise({redirectTo: '/login'});
}]);
