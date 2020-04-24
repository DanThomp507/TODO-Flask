import update from 'immutability-helper';

let PORT = 8888
let BASE_URL = "http://localhost:" + PORT
let headers = {
  "content-type": "application/json",
  "accept": "*/*"
}


const service = {
  get: (url, options = {}) => {
    options.method = "GET";
    return fetch(url, options);
  },

  post: (url, options = {}) => {
    options.method = options.method || "POST";
    options.headers = headers;
    options.mode = "cors"
    return fetch(url, options);
  },

  put: function (url, options = {}) {
    options.method = "PUT";
    options.headers = headers;
    options.mode = "cors"
    return fetch(url, options);
  },

  delete: (url, options = {}) => {
    options.method = "DELETE";
    options.headers = headers;
    options.mode = "cors"
    return fetch(url, options);
  }
};

/**
 * Get the full list of items
 */
export function getAll() {
  let data = []
  return service.get(BASE_URL + `/todo`, { data: {} })
}
/** fetch a Todo list item by id */
export function getItemById(itemId) {
    return getAll().find(item => item.id === itemId);
}


/** update the status of a Todo list item */
export function updateStatus(itemId, completed) {
  let checked = completed === true ? 1: 0 
  console.log(completed, 'COMPLETED PARAM')
  return service.put(BASE_URL + `/todo/` + itemId, { body: JSON.stringify({"_is_done": checked } )})
}

/** delete a Todo list item */
export function deleteItem(itemId) {
  return service.delete(BASE_URL + `/todo/` + itemId, {})
}

/**
 * Adds a new item to the list
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
export function addToList(list, data) {
  console.log(data, 'ADD TO LIST DATA')
  return service.post(BASE_URL + `/todo`, { body: JSON.stringify(data) })
}