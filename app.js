(function(){
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuService', MenuService)
  .directive('foundItems', FoundItemsDirective)
  .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective);

  function ItemsLoaderIndicatorDirective(){
    return {
      templateUrl:'loader/itemsloaderindicator.template.html',
      restrict: 'E'
    }
  }

  NarrowItDownController.$inject = ["MenuService"];
  function NarrowItDownController(MenuService){
    var narrow = this;
    narrow.found = [];
    narrow.searchTerm = "";
    narrow.message = "";
    narrow.showLoader = false;
    narrow.search = function(){
      narrow.showLoader = true;
      narrow.found = [];
      if(narrow.searchTerm != ''){
        var promise = MenuService.getMatchedMenuItems(narrow.searchTerm);
        promise.then(function(result){
          narrow.found = result;
          if(narrow.found.length == 0){
            narrow.message = 'Nothing found! Please try again';
          }
          else {
            narrow.message = '';
          }
          narrow.showLoader = false;
        });
      }
      else {
        narrow.message = 'Nothing found because you did not enter a search term';
      }
    };

    narrow.removeItem = function(itemIndex){
      narrow.found.splice(itemIndex, 1);
    };
  }

  MenuService.$inject = ['$http'];
  function MenuService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {

      return $http({
        method: "GET",
        url: "http://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function(result){
        var foundItems = [];
        angular.forEach(result.data.menu_items, function(item, key) {
          if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
            this.push(item);
          }
        }, foundItems);
        console.log(foundItems);
        return foundItems;
      }).catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };
  }

function FoundItemsDirective(){
  var ddo = {
    templateUrl: 'foundItem.html',
    restrict: 'E',
    scope : {
      foundItems : '<',
      onRemove : '&'
    }
    //,controller: FoundItemsDirectiveController,
    //controllerAs: 'list',
    //bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;
}

})();
