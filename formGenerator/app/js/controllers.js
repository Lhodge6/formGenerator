'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}
function PhoneListCtrl2($scope, Phone) {
    $scope.orders = Phone.query();
    $scope.orderProp = 'age';
}

function OrderListCtrl($scope, Phone) {
    $scope.orders = Phone.query();
    $scope.orderProp = 'description';
}
//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

function CartForm($scope) {
    $scope.invoice;/* = {
        items: [{
            code: 1,
            tag: "tag",
            description: "Description",
            price: 1,
            size: 1,
            bpc: "bpc"
        }]
    };    */

    $scope.addItem = function(item) {
        if($scope.invoice == null){
            $scope.invoice = {
             items: [{
                 qty: 1,
                 code: item.code,
                 tag: item.value1,
                 description: item.description,
                 price: item.price,
                 size: item.size,
                 bpc: item.value2
             }]
            };
        }else{
            $scope.invoice.items.push({
                qty: 1,
                code: item.code,
                tag: item.value1,
                description: item.description,
                price: item.price,
                size: item.size,
                bpc: item.value2
            });
        }
    },

    $scope.removeItem = function(index) {
        $scope.invoice.items.splice(index, 1);
    },
        $scope.hideItem = function(item) {
            item.visibility = false;
        },
        $scope.showItem = function(item) {
            item.visibility = true;
        },

    $scope.total = function() {
        var total = 0;
        if($scope.invoice != null){
            angular.forEach($scope.invoice.items, function(item) {
                total += item.qty * item.price;
            })
        }

        return total;
    }
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
