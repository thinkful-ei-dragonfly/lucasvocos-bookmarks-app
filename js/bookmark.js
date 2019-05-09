/* global store, api, item, bookmark */
'use strict';

const bookmark = (function(){
  function render(){
    let items = [...store.items];
    if (store.errorMessage) {
      $('.js-error-message').removeClass('hidden').html(`
        <h2>${store.errorMessage}</h2>
        `);
    }
    if (store.addingState) {
      $('.create_form_div').removeClass('hidden');
    }

    // This function will render the shopping list in the DOM
    const bookmarkItemsString = generatebookmarkItemString(items);

    // insert that HTML into the DOM
    $('.bookmarks_results').html(bookmarkItemsString);

  }
  function generateBookmarkItem(item){
    let bookmark;
    if (!item.isEditing) {
      bookmark = `
      <li class="bookmark " data-item-id="${item.id}">
        <p class="bookmark_title">${item.title}</p>
        <p class="bookmark_stars">${item.rating} Stars</p>
        <div class="bookmark_edit">
          <button type="button" name="editButton" class="js_edit">Edit Bookmark</button>
          <button type="button" name="deleteButton" class="js_delete">Delete</button>
        </div>
      </li>
      `;
    } else {
      bookmark = `
      <li class="bookmark edit_item" data-item-id="${item.id}">
        <input class="bookmark_title" placeholder="Edit Bookmark"></input>
        <select class="" name="itemStars">
          <option value="" disabled selected>Bookmark Rating <i class="material-icons">arrow_downward</i></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input class="bookmark_description" placeholder="Edit Bookmark Description">
        <input class="bookmark_url" placeholder="Edit URL">
        <div class="bookmark_edit">
          <button type="button" name="cancelButton" class="js_edit">Cancel Edit</button>
          <button type="button" name="deleteButton" class="js_delete">Delete</button>
        </div>
      </li>
      `;
    }
    return bookmark;
  }
  function generatebookmarkItemString(bookmarkList){
    const items = bookmarkList.map((item) => generateBookmarkItem(item));
    return items;
  }
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.bookmark')
      .data('item-id');
  }
  function handleNewBookmarkSubmit() {
    $('#js_create_form').submit(event => {
      event.preventDefault();
      let newBookmark = $(event.target).serializeJson();
      api.createBookmark(newBookmark)
        .then((newItem) => {
          store.addItem(newItem);
          render();

        })
        .catch(error => {
          store.errorMessage = error.message;
          render();
        });
    });
  }
  function handleDeleteItemClicked(){
    console.log('handle item delete');
    $('.bookmarks_results').on('click', 'button.js_delete', event => {
      const bookmarkID = getItemIdFromElement(event.currentTarget);
      api.deletebookmark(bookmarkID)
        .then(() => {
          store.findAndDelete(bookmarkID);
          render();
        })
        .catch(error => {
          store.errorMessage = error.message;
          render();
        });
    });

  }
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteItemClicked();
  }
  return {
    bindEventListeners,
    render
  };
}());
