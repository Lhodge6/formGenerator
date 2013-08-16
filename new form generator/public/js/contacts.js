function ContactsCtrl($scope) {
  $scope.contacts = [
      {description:"1707 SELECCION DE BARRICAS",productNumber:339148,tag:"LS",price:98,size:"750ML",bpc:12},
      {description:"A MORGAINE CUV TRAD",productNumber:358274,tag:"SW",price:333.24,size:"750ML",bpc:12},
      {description:"A TO Z CHARD",productNumber:368938,tag:"LS",price:104.04,size:"750ML",bpc:12}];
 
  $scope.addContact = function() {
    $scope.contacts.push({description:$scope.description, productNumber:$scope.productNumber, tag:$scope.tag, price:$scope.price, size:$scope.size, bpc:$scope.bpc, cases:$scope.cases});
    $scope.description = '';
    $scope.productNumber = '';
    $scope.tag = '';
    $scope.price = '';
    $scope.size = '';
    $scope.bpc = '';
    $scope.cases = '';
    $location.path('/');
  };

}