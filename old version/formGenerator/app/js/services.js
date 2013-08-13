'use strict';

/* Services */
angular.module('orderServices', ['ngResource']).
    factory('Order', function($resource){
        return $resource('orders/:orderId.json', {}, {
            query: {method:'GET', params:{orderId:'orders'}, isArray:true},
            post: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
        });
    });