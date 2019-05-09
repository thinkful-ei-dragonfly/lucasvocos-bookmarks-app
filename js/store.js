'use strict';

const store = (function(){
  function sayHello(){
    console.log('Hello from store.js');
  }

  const addItem = function(item) {
    this.items.push(item);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const resetList = function(selectedNum) {
    this.searchRating = selectedNum;
  };

  return {
    sayHello,
    items: [],
    error: '',
    searchRating: false,
    addingState: false,
    addItem,
    findAndDelete,
    resetList
  };
}());
