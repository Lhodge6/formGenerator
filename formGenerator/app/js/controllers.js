

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



function PhoneDetailCtrl($rootScope, $scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

function CartForm($rootScope) {
    $rootScope.invoice;/* = {
        items: [{
            code: 1,
            tag: "tag",
            description: "Description",
            price: 1,
            size: 1,
            bpc: "bpc"
        }]
    };    */

    $rootScope.addItem = function(item) {
        if($rootScope.invoice == null){
            $rootScope.invoice = {
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
            $rootScope.invoice.items.push({
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

        $rootScope.removeItem = function(index) {
            $rootScope.invoice.items.splice(index, 1);
    },
        $rootScope.hideItem = function(item) {
        item.visibility = false;
    },
        $rootScope.showItem = function(item) {
        item.visibility = true;
    },
        $rootScope.download = function(lnk_obj) {
        var temp;
        var tmplt = "case \t size \t county code \t description"
                    "{{#items}} \n" +
                    "{{.}}\n" +
                    "{{/items}}"
       tmp =  Mustache.render(tmplt, $rootScope.invoice.items);



        temp = btoa(temp);
        window.open("data:application/octet-stream;charset=utf-8;base64,"+temp);
        },
        $rootScope.total = function() {
        var total = 0;
        if($rootScope.invoice != null){
            angular.forEach($rootScope.invoice.items, function(item) {
                total += item.qty * item.price;
            })
        }

        return total;
    }

}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
