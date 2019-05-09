/* global bookmark,item, api, store */
'use strict';
$(() => {
  bookmark.bindEventListeners();
  api.sayHello();
  item.sayHello();
  store.sayHello();
  // bookmark.render();
  // api.getItems()
  //   .then((items) =>{
  //     items.forEach(item => store.addItem(item));
  //     bookmark.render();
  //   });
  
});
