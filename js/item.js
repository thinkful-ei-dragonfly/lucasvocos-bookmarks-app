'use strict';

const item = (function(){
  function sayHello(){
    console.log('Hello from item.js');
  }

  return {
    sayHello
  };
}());
