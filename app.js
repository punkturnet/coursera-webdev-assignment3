(function(){
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuService', MenuService)
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ["MenuService"];
  function NarrowItDownController(MenuService){
    var narrow = this;
    narrow.found = [];
    narrow.searchTerm = "";

    narrow.search = function(){
      narrow.found = MenuService.getMatchedMenuItems(narrow.searchTerm);
      console.log(narrow.found);
    };



    narrow.removeItem = function(itemIndex){
      narrow.found.splice(itemIndex, 1);
    };
  }

  function MenuService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        url: "http://davids-restaurant.herokuapp.com/menu_items.json"
      })
      .then(function(result){
        var foundItems = [];
        angular.forEach(result.data.menu_items, function(item, key) {
          if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
            this.push(item);
          }
        }, foundItems
      );
        console.log(foundItems);
        return foundItems;
      })
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
