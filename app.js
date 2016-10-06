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
      narrow.found = MenuService.getMatchedMenuItems(this.searchTerm);
    };

    narrow.removeItem = function(itemIndex){
      narrow.found.splice(itemIndex, 1);
    };
  }

  function MenuService() {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        url: "http://davids-restaurant.herokuapp.com/menu_items.json"
      })
      .then(function(result){
        var foundItems = [];
        console.log(result.data)
        //for(var i = 0; i < )
        //if (name.toLowerCase().indexOf("cookie") !== -1) {
        //  return true;
        //}
        return foundItems;
      })
    };
  }

  function FoundItemsDirective(){
    var ddo = {
       templateUrl: 'foundItems.html',
      scope : {
        foundItems : '<',
        onRemove : '&'
      }
      //,controller: FoundItemsDirectiveController,
      //controllerAs: list,
      //bindToController: true
    };
    return ddo;
  }

})();
