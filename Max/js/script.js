'use strict';
var useLocalStorage = true;

if (typeof(window) !== 'undefined') {

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }


    const fanData = [];
    const newsData = [];
    var db;


    var request = window.indexedDB.open("newDatabase", 1);


    console.log("request");

    /* Indexed db */
    request.onerror = function(event) {
        console.log("error: ");
    };

    request.onsuccess = function(event) {
        db = request.result;
        console.log("success: " + db);


    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStoreFan = db.createObjectStore("fan", {
            keyPath: "id"
        });
        console.log("created");
        for (var i in fanData) {
            objectStoreFan.add(fanData[i]);
        }

        var objectStoreNews = db.createObjectStore("news", {
            keyPath: "id"
        });

        for (var i in fanData) {
            objectStoreNews.add(newsData[i]);
        }

    }
}

function isOnline() {
    return window.navigator.onLine;
}


class Fan {

    constructor() {
        try {
            var nowDate = new Date();
            var message = document.getElementById("message").value;
        } catch (e) {
            var message = "";
            var title = "";
        }
        this.fantext = message;
        this.date = nowDate.getDate() + "." + (nowDate.getMonth() + 1) + "." + nowDate.getFullYear();
    }
    set fan(text) {
        [this.fantext, this.date] = text.split(' ');

        console.log("text: " + `${(this)}`);
    }
    toString() {
        return `${(this.fantext)} ${(this.date)}`;
    }
    append() {
        var original = document.getElementById("fans-div");
        var fan = document.createElement("article");
        fan.innerHTML =
            " <p>" + `${(this.fantext)}` + " </p>" +
            "  <p class=\"col-sm-10\">" + `${(this.date)}` + "</p> " +
            " <h4 class=\"font-weight-bold\">Driver 2018</h4>" +
            "   <hr style=\"border-width:6px; color:black\">";
        original.appendChild(fan);
        document.getElementById("message").value = "";
    }
    check() {
        alert("The field is empty!");
        if (message == "") {
            document.getElementById("message").style.borderColor = "red";
        }
    }
    addToLocalStorage() {
        var count = parseInt(localStorage.getItem('count-fan'));
        if (isNaN(count)) count = 0;

        localStorage.setItem("fan-item-" + count, `${(this).toString()}`);
        console.log(`${(this).toString()}`);
        localStorage.setItem("count-fan", (count + 1));
    }

    addToIndexedDB() {
            var count = parseInt(localStorage.getItem('count-fan'));
            if (isNaN(count)) count = 0;
            var request = db.transaction(["fan"], "readwrite")
                .objectStore("fan")
                .add({
                    id: count,
                    message: `${(this).toString()}`
                });

            request.onsuccess = function(event) {
                alert("Prasad has been added to your database.");
            };

            request.onerror = function(event) {
                alert("Unable to add data\r\nPrasad is already exist in your database! ");
            }

        localStorage.setItem("count-fan", (count + 1));
    }
    addToServer() {
        console.log(JSON.stringify({
            name: `${(this)}`
        }));
        return fetch('http://localhost:8000/feedbacks/', {
                credentials: 'same-origin', // 'include', default: 'omit'
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'content-type'
                }),
                body: JSON.stringify({
                    name: `${(this.fantext)}`
                }), // Coordinate the body type with 'Content-Type'

            })
            .then(response => response.json())
            .then(res => console.log(res));
    }
}

function addFan() {
    var fan1;
    fan1 = new Fan();
    console.log(fan1.toString());

    if (isOnline()) {

        fan1.addToServer();
        fan1.append();
    } else {
        if (useLocalStorage) {
            fan1.addToLocalStorage();
        } else {
            fan1.addToIndexedDB();
        }

    }
    document.getElementById("message").value = "";

}

function readFan(objectStore, id) {

    // var tranaction = db.tranaction(["fan"]);
    // var objectStore = tranaction.objectStore("fan");
    var request = objectStore.get(id);
    var result;
    request.onerror = function(event) {
        alert("Unable to retrieve daa from database!");
    };

    request.onsuccess = function(event) {

        if (request.result) {
            var fan1 = new Fan();
            fan1.fan = request.result.message;
            fan1.append();
            fan1.addToServer();
            return request.result.message;
        } else {
            alert("Kenny couldn't be found in your database!");
        }
    };
    return "";
}

function getFromServer() {

    return fetch('http://localhost:8000/feedbacks')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Prints result from `response.json()` in getRequest
            for (var k in data) {
                var fan1 = new Fan();
                fan1.fan = data[k].name + ' ' + data[k].Created_date;
                console.log(fan1);
                fan1.append();
            }

        })
        .catch(error => console.error(error))

}

function addToServerFromLocal() {
    var objectStore = db.transaction(["fan"],"readwrite").objectStore('fan');
    var myIndex = objectStore.count();


    var count = parseInt(localStorage.getItem('count-fan'));
    var message;
    if (isNaN(count)) count = 0;
    var news1 = new News();
    var i;
    var fan1 = new Fan();
    console.log("SizeLocalStorage:"+count);
    for (i = 0; i < count; i++) {
        
        fan1.fan = localStorage.getItem("fan-item-" + i);
        console.log(i,  localStorage.getItem("fan-item-" + i));
        fan1.addToServer();
        fan1.append();
    }
    localStorage.clear();
    
    myIndex.onsuccess = function() {
        count = parseInt(myIndex.result);
        console.log("Size indexedDB:" + count);

        i = 0;
        fan1 = new Fan();

        for (i = 0; i < count; i++) {
            var z = readFan(objectStore, i);
            fan1.fan = z;
            console.log(fan1.toString());
            fan1.append();

        }
    }
    var objectStoreRequest = objectStore.clear();

    objectStoreRequest.onsuccess = function(event) {
        // alert('success');
    }

}

function displayFanOnline() {
    getFromServer();
    addToServerFromLocal();

}

function deletefan() {

    var i;
    for (i > 0; i < count; i++) {
        localStorage.removeItem('fan-item-' + i)
    }
    localStorage.removeItem('count-fan');
}


class News {

    constructor() {
        var nowDate = new Date();
        try {
            var message = document.getElementById("texts").value;
            var title = document.getElementById("title").value;
        } catch (e) {
            var message = "";
            var title = "";
        }
        this.newsText = message;
        this.date = title;
    }
    set news(text) {
        console.log("text: " + text);
        [this.newsText, this.date] = text.split(' ');
    }
    toString() {
        return `${(this.newsText)} ${(this.date)}`;
    }
    append() {
        var original = document.getElementById("news-div");
        var news = document.createElement("div");
        news.className = "cont-4";
        news.innerHTML =
            " <img src = \"img/img1.jpg\"class = \"third\" >  </img > " +
            "<p class = \"blue\" >" + `${(this.newsText)}` + "</p > " +
            " <div class = \"cont-text\" >" + `${(this.date)}` + "</div > ";
        original.appendChild(news);

    }
    check() {
        alert("The field is empty!");
        if (message == "") {
            document.getElementById("texts").style.borderColor = "red";
        }
    }
    addToLocalStorage() {
        var count = parseInt(localStorage.getItem('count-news'));
        if (isNaN(count)) count = 0;

        localStorage.setItem("news-item-" + count, `${(this).toString()}`);
        console.log(`${(this).toString()}`);
        localStorage.setItem("count-news", (count + 1));
    }

    addToIndexedDB() {
        var count = parseInt(localStorage.getItem('count-news'));
        if (isNaN(count)) count = 0;
        var request = db.tranaction(["news"], "readwrite")
            .objectStore("news")
            .add({
                id: count,
                message: `${(this).toString()}`
            });

        request.onsuccess = function(event) {
            alert("Prasad has been added to your database.");
        };

        request.onerror = function(event) {
            alert("Unable to add data\r\nPrasad is already exist in your database! ");
        }

        localStorage.setItem("count-news", (count + 1));
    }
    addToServer() {
        console.log(JSON.stringify({
            name: `${(this)}`
        }));
        return fetch('http://localhost:8000/feedbacks/', {
                credentials: 'same-origin', // 'include', default: 'omit'
                method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'content-type'
                }),
                body: JSON.stringify({
                    name: `${(this.newsText)}`,
                    title: `${(this.date)}`
                }), // Coordinate the body type with 'Content-Type'

            })
            .then(response => response.json())
            .then(res => console.log(res));
    }
}

function addNews() {

    var news1 = new News();
    console.log(news1.toString());

    if (isOnline()) {
        console.log('Isonline');
        news1.addToServer();
        //news1.append();
    } else {
        if (useLocalStorage) {
            news1.addToLocalStorage();
        } else {
            news1.addToIndexedDB();
        }

    }
    document.getElementById("texts").value = "";
    document.getElementById("title").value = "";

}

function readNews(id) {

    var tranaction = db.tranaction(["news"]);
    var objectStore = tranaction.objectStore("news");
    var request = objectStore.get(id);
    var result;
    request.onerror = function(event) {
        alert("Unable to retrieve daa from database!");
    };

    request.onsuccess = function(event) {

        if (request.result) {
            var news1 = new News();
            news1.news = request.result.message;
            news1.append();

            console.log(request.result.message);
            return request.result.message;
        } else {
            alert("Kenny couldn't be found in your database!");
        }
    };
    return "";
}
function getNewsFromServer() {

    return fetch('http://localhost:8000/feedbacks')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Prints result from `response.json()` in getRequest
            for (var k in data) {
                if(data[k].title!='title') {
                    var news1 = new News();
                    news1.news =  data[k].title+ ' '+data[k].name ;
                    console.log(news1);
                    news1.append();
                }
            }

        })
        .catch(error => console.error(error))

}


function addNewsToServerFromLocal() {
    var objectStore = db.transaction(["news"],"readwrite").objectStore('news');
    var myIndex = objectStore.count();


    var count = parseInt(localStorage.getItem('count-news'));
    var message;
    if (isNaN(count)) count = 0;
    var news1 = new News();
    var i;
    console.log("SizeLocalStorage:"+count);
    for (i = 0; i < count; i++) {
        
        news1.news = localStorage.getItem("news-item-" + i);
        console.log(i,  localStorage.getItem("news-item-" + i));
        news1.addToServer();
        news1.append();
    }
    localStorage.clear();
    
    myIndex.onsuccess = function() {
        count = parseInt(myIndex.result);
        console.log("Size indexedDB:" + count);

        i = 0;
        news1 = new News();

        for (i = 0; i < count; i++) {
            var z = readNews(objectStore, i);
            news1.news = z;
            console.log(news1.toString());
            news1.append();

        }
    }
    var objectStoreRequest = objectStore.clear();

    objectStoreRequest.onsuccess = function(event) {
        // alert('success');
    }

}

function displayNewsOnline() {
    getNewsFromServer();
    addNewsToServerFromLocal();

}

function deletenews() {

    var i;
    for (i > 0; i < count; i++) {
        localStorage.removeItem('news-item-' + i)
    }
    localStorage.removeItem('count-news');
}

if (typeof(window) !== 'undefined') {
    window.addEventListener('load', function() {
       

        function updateOnlineStatus(event) {}

        if (isOnline()) {
            if  (document.title=='Фани'){
                window.addEventListener('online', displayFanOnline());}
            else 
            if  (document.title=='Новини'){
                window.addEventListener('online', displayNewsOnline());
            }
          
        } else {
           
        }
    });
}