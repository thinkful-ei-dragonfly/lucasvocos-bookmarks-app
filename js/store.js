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

  return {
    sayHello,
    items: [],
    error: '',
    addingState: false,
    addItem,
    findAndDelete
  };
}());
