'use strict';

const store = (function(){
  function sayHello(){
    console.log('Hello from store.js');
  }

  const addItem = function(item) {
    this.items.push(item);
  };

  return {
    sayHello,
    items: [],
    error: '',
    addItem
  };
}());
