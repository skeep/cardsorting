var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
if ('webkitIndexedDB' in window) {
	window.IDBTransaction = window.webkitIDBTransaction;
	window.IDBKeyRange = window.webkitIDBKeyRange;
}

var db = null, version = 1;
var c = function (e) {
	console.log(e);
}

function openDB (dbName) {
	var request = indexedDB.open(dbName);
	request.onsuccess = function (e) {
		db = e.target.result;
		addObjectStore('cards');
	}
	request.onerror = function (e) {
		c(e);
	}
}

function addObjectStore (storeName) {
	var setVersionRequest = db.setVersion(version);

	setVersionRequest.onsuccess = function (e) {
		c('version set to:'+db.version);
		if(db.objectStoreNames.contains(storeName)){
			db.deleteObjectStore(storeName);
			c('object store "'+storeName+'" deleted');
		}
		var store = db.createObjectStore(storeName,{keyPath: "timeStamp"});
		showObjectStore(storeName);
	}
	setVersionRequest.onerror = function (e) {
		c(e);
	}
	
}

function addObject (object, storeName) {
	// body...
}

function showObjectStore (objectStore) {
	c(objectStore);
	var trans = db.transaction([objectStore], IDBTransaction.READ_WRITE);
	var store = trans.objectStore(objectStore);

	var keyRange = IDBKeyRange.lowerBound(0);
	var cursorRequest = store.openCursor(keyRange);

	cursorRequest.onsuccess = function(e) {
		var result = e.target.result;
    	if(!!result == false){
	    	return;
		}
		result.continue();
    }
}

function init () {
	db = openDB('db1');
}

window.addEventListener("DOMContentLoaded", init, false);