/* global store, api, item, bookmark */
'use strict';

const bookmark = (function(){
  function handleNewBookmarkSubmit() {
    $('#js_create_form').submit(event => {
      event.preventDefault();
      let newBookmark = $(event.target).serializeJson();
      api.createBookmark(newBookmark);
    });
  }
  function sayHello(){
    console.log('Hello from Bookmark.js');
  }
  function bindEventListeners(){
    sayHello();
    handleNewBookmarkSubmit();
  }
  return {
    bindEventListeners
  };
}());
