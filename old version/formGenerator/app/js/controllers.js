

/* Controllers */

function OrderListCtrl($rootScope, Order) {
    $rootScope.orders = Order.query();
    $rootScope.orderProp = 'description';
    //Order.post(items);
}

function CartForm($rootScope,$scope, Order) {
    $rootScope.invoice;
    $rootScope.orders = Order.query();
    $rootScope.saveList = function(){
        Order.post($rootScope.invoice.items);
    }



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
    function callWebMethod(webMethod, requestParameters, callback) {

        $http({
            url: '/' + webMethod,
            method: 'POST',
            data: requestParameters
        }).success(function (returnMessage, status, headers, config) {

                callback(returnMessage.data);

            }).error(function (error, status, headers, config) {
                console.log(error);
            });
    }

}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
