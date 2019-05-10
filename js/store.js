'use strict';

const store = (function(){

  const addItem = function(item) {
    item.expanded = false;
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const resetList = function(selectedNum) {
    this.searchRating = selectedNum;
  };
  function findAndUpdate(id, newData){
    let updatedItem = this.items.find(item => item.id === id);
    Object.assign(updatedItem,newData);
  }

  const setItemIsEditing = function(id, isEditing) {
    const item = this.findById(id);
    item.isEditing = isEditing;
  };

  return {
    items: [],
    error: '',
    searchRating: false,
    addingState: false,
    addItem,
    findById,
    findAndDelete,
    resetList,
    findAndUpdate,
    setItemIsEditing
  };
}());
