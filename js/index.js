/* global bookmark, api, store */
'use strict';
$(() => {
  bookmark.bindEventListeners();
  bookmark.render();
  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmark.render();
    });

});
