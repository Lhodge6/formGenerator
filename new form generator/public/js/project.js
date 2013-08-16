// services
//---------
angular.module('project', []).
	config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ContactsCtrl, templateUrl:'partials/load'}).
      when('/shop', {controller:ContactsCtrl, templateUrl:'partials/contacts'}).
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
////////////////////////////////////////////////////
    $http.get('/api/forms').
        success(function(data, status, headers, config) {
            $scope.items = data;
        });

    $scope.addForm = function(item) {
        $http.post('/api/addform', item).
            success(function(data) {
                $scope.items.push(data);
            });
    };

    $scope.deleteForm = function(id) {
        $http.post('/api/deleteform/' + id).
            success(function(data) {
                for (var i=0; i < $scope.items.length; ++i)
                    if ($scope.items[i]._id == id)
                    {
                        $scope.items.splice(i, 1);
                        return;
                    }
            });
    };

    $scope.editForm = function(form, name) {
        contact.edit = name;
    };

    $scope.updateForm = function(contact) {
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


////////////////////////////////////////////////////
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
    $rootScope.download = function(name,number,po,date) {
        var items = $rootScope.invoice.items;
        var temp = "Account Name: " + name + "\tPO Number: " + po + "\nAccount Number: " + number + "\tDate: " + date + "\ncase \t size \t county code \t description";
        angular.forEach(items, function(item) {
            if(item.code < 100000){
                temp = temp + "\n" + item.qty +"\t" + item.size + "  \t" + item.code + "\t\t\t" + item.description;
            }else{
                temp = temp + "\n" + item.qty +"\t" + item.size + "  \t" + item.code + "\t\t" + item.description;
            }
        })
        temp = btoa(temp);
        window.open("data:application/octet-stream;charset=utf-8;base64,"+temp);
        return temp;
    };
    $rootScope.save = function(name,number,po,date) {
        var items = $rootScope.invoice.items;
        angular.forEach(items, function(item,name,number,po,date) {
            $scope.addForm({
                    accountName : name,
                    AccountNumber   : number,
                    po  : po,
                    date    : date,
                    cases: item.cases,
                    code: item.code,
                    tag: item.tag,
                    description: item.description,
                    price: item.price,
                    size: item.size,
                    bpc: item.bpc}
            );
        })
    };
}