// services
//---------
angular.module('project', []).
	config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ContactsCtrl, templateUrl:'partials/contacts'}).
      when('/checkout', {controller:ContactsCtrl, templateUrl:'partials/checkout'}).
      otherwise({redirectTo:'/'});
	});


// controllers
//------------

function ContactsCtrl($rootScope ,$scope, $http, $location) {
  $rootScope.invoice;
  $http.get('/api/contacts').
    success(function(data, status, headers, config) {
      $scope.contacts = data;
    });
 
  $scope.addContact = function() {
    $http.post('/api/addcontact', $scope.form).
      success(function(data) {
        $scope.contacts.push(data);
        $scope.form.code = '';
        $scope.form.tag = '';
        $scope.form.description = '';
        $scope.form.price = '';
        $scope.form.size = '';
        $scope.form.bpc = '';
        $scope.form.cases = '';
        $("#collapseOne").collapse('toggle');
      });
  };

    $rootScope.addItem = function(item) {
        if($rootScope.invoice == null){
            $rootScope.invoice = {
                items: [{
                    cases: 1,
                    code: item.code,
                    tag: item.tag,
                    description: item.description,
                    price: item.price,
                    size: item.size,
                    bpc: item.bpc
                }]
            };
        }else{
            $rootScope.invoice.items.push({
                cases: 1,
                code: item.code,
                tag: item.tag,
                description: item.description,
                price: item.price,
                size: item.size,
                bpc: item.bpc
            });
        }
    };
    $rootScope.removeItem = function(index) {
        $rootScope.invoice.items.splice(index, 1);
    };

  $scope.delete = function(id) {
    $http.post('/api/deletecontact/' + id).
      success(function(data) {
        for (var i=0; i < $scope.contacts.length; ++i)
          if ($scope.contacts[i]._id == id)
          {
            $scope.contacts.splice(i, 1);
            return;
          }
      });
  };
 
  $scope.edit = function(contact, name) {
    contact.edit = name;
  };
 
  $scope.update = function(contact) {
    $http.put('/api/updatecontact/' + contact._id, contact).
      success(function(data) {
        // for (var i=0; i < $scope.contacts.length; ++i)
          // if ($scope.contacts[i]._id == contact.id)
          // {
            // $scope.contacts[i] = data;
            // break;
          // }
        contact.edit = '';
      });
  };
}