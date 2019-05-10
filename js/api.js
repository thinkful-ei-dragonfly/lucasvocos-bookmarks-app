'use strict';

const api = (function(){
  function sayHello(){
    console.log('Hello from api.js');
  }

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/lucasvocos/bookmarks'

  function baseFetchMethod(...args) {
    // ...args is a spread operator meaning
    // it will combine all arguments into a local variable
    // aka it will run this function any number of arguments that you throw in
    let error = false;
    return fetch(...args)
      .then(response => {
        if (!response.ok) {
          // If we get an HTTP response but it's not 2xx status, it would be an error
          error = { code: response.status };
        }
        // parse the JSON response
        return response.json();
      })
      .then(data => {
        // If an error was found, reject the Promise with that error Object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        // Otherwise return the resolved newData
        return data;
      });
  }
  function getItems(){
    return baseFetchMethod(BASE_URL);
  }
  function createBookmark(bookmark){
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: bookmark
    };
    return baseFetchMethod(BASE_URL, options);
  }
  function updateItem(id, updateData) {
    const options = {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: updateData,
    };
    return baseFetchMethod(`${BASE_URL}/${id}`, options);
  }
  function deletebookmark(bookmarkID) {
    const options = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return baseFetchMethod(`${BASE_URL}/${bookmarkID}`, options);
  }
  return {
    sayHello,
    getItems,
    createBookmark,
    deletebookmark,
    updateItem
  };
}());
