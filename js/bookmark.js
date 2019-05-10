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
    if (store.searchRating) {
      items = store.items.filter(item => item.rating > (store.searchRating-1));
    }

    // This function will render the shopping list in the DOM
    const bookmarkItemsString = generatebookmarkItemString(items);

    // insert that HTML into the DOM
    $('.bookmarks_results').html(bookmarkItemsString);

  }
  function generateBookmarkItem(item){
    let expanded = '',
      itemRatingString = '',
      itemRating = item.rating,
      bookmarkEditButton = '<button type="button" name="editButton" class="js_edit">Edit Bookmark</button>',
      button = '<button type="submit" name="expand" class="expand">(Expand)</button>';

    // This loop determines how many stars to display
    for (var i = 0; i < itemRating; i++) {
      itemRatingString += '<i class="material-icons">star</i>';
    }

    if (item.expanded) {
      button = '<button type="submit" name="expand" class="expand">(Contract)</button>';
      expanded = `
      <p class='bookmark_description'>${item.desc}</p>
      <p><a href="${item.url}" target="_blank" class="bookmark_url">Visit Site</a></p>
      `;
    }

    let itemTitle = `<p class="bookmark_title">${item.title} ${button}</p><p class="bookmark_stars">${itemRatingString}</p>`;


    if (item.isEditing) {
      bookmarkEditButton = '<button type="button" name="editButton" class="js_edit_cancel">Cancel Edit</button>';
      itemTitle = `
      <form id="editBookmark">
          <input type="text" class="bookmark_title_edit" name="title" value="${item.title}"></input>
          <input type="text" class="bookmark_url_edit" name="url" value="${item.url}">
          <input type="text" name="desc" class="bookmark_description_edit" value="${item.desc}">
          <div class="selectContainer_edit">
            <select class="" name="rating">
              <option value="" disabled selected>Update Rating ⬎</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>


          <button type="submit"  class="js_edit_submit">Update</button>
      </form>
      `;
    }



    return `
    <li class="bookmark " data-item-id="${item.id}" role="listitem">
      ${itemTitle}
      ${expanded}
      <div class="bookmark_edit">
        ${bookmarkEditButton}
        <button type="button" name="deleteButton" class="js_delete">Delete</button>
      </div>
    </li>
    `;
  }

  function generatebookmarkItemString(bookmarkList){
    const items = bookmarkList.map((item) => generateBookmarkItem(item));
    return items;
  }

  // Read
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.bookmark')
      .data('item-id');
  }
  // Expand
  function handleExpandBookmark(){
    $('.bookmarks_results').on('click', '.expand', event => {
      let bookmarkItemID = getItemIdFromElement(event.currentTarget);
      const currentItem = store.items.find(item => item.id === bookmarkItemID);
      store.findAndUpdate(bookmarkItemID, { expanded: !currentItem.expanded });
      render();

    });
  }
  // Start Edit
  function handleBookmarkItemStartEditing(){
    $('.bookmarks_results').on('click', '.js_edit', event => {
      const id = getItemIdFromElement(event.target);
      store.setItemIsEditing(id, true);
      render();
    });
  }
  // Cancel Edit
  function handleBookmarkItemCancelEditing(){
    $('.bookmarks_results').on('click', '.js_edit_cancel', event => {
      const id = getItemIdFromElement(event.target);
      store.setItemIsEditing(id, false);
      render();
    });
  }
  // Submit Edit
  // Update
  function handleBookmarkSubmitEdit() {
    $('.bookmarks_results').on('submit', '#editBookmark', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      let newBookmark = $(event.target).serializeJson(),
        updateStoreBookmark = JSON.parse(newBookmark);
      api.updateItem(id, newBookmark)
        .then(() => {
          store.findAndUpdate(id, updateStoreBookmark);
          render();
        })
        .catch(error => {
          store.errorMessage = error.message;
          render();
        });
      store.setItemIsEditing(id, false);
      render();
    });
  }

  // Open the create form
  function handleClickAddBookmarkButton() {
    $('.main_buttons').on('click', '#js_add_item', event => {
      event.preventDefault();
      $('.create_form_div').removeClass('hidden');
      render();
    });
  }

  // Create
  function handleNewBookmarkSubmit() {
    $('#js_create_form').submit(event => {
      event.preventDefault();
      let newBookmark = $(event.target).serializeJson();
      $('.itemName').val('');
      $('.itemURL').val('');
      $('.itemDescription').val('');
      $('select[name="rating"]').val('Bookmark Rating ⬎').change();
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

  // Cancel create
  function handleCancelAddBookmark() {
    $('#js_create_form').on('click', '.itemCancel', event => {
      event.preventDefault();
      $('.create_form_div').addClass('hidden');
      render();
    });
  }

  // Delete
  function handleDeleteItemClicked(){
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
  // Filter
  function handleFilter() {
    $('#js_filter_item').on('submit', event =>{
      event.preventDefault();
      let selectedNum = Number.parseInt(event.target[0].value);
      store.resetList(selectedNum);
      render();
    });
  }
  function bindEventListeners() {
    handleClickAddBookmarkButton();
    handleCancelAddBookmark();
    handleExpandBookmark();
    handleNewBookmarkSubmit();
    handleDeleteItemClicked();
    handleFilter();
    handleBookmarkItemStartEditing();
    handleBookmarkItemCancelEditing();
    handleBookmarkSubmitEdit();
  }
  return {
    bindEventListeners,
    render
  };
}());
