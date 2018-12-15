// FANS PAGE
//localStorage.clear();
var useLocalStorage = false;

//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
 }
 
 const fansData = [ ];
 const newsData = [];
 var db;
 var request = window.indexedDB.open("newDatabase", 1);
 
 request.onerror = function(event) {
    console.log("error: ");
 };
 
 request.onsuccess = function(event) {
    db = request.result;
    console.log("success: "+ db);
 };
 
 request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStoreFans = db.createObjectStore("fans", {keyPath: "id"});
    
    for (var i in fansData) {
        objectStoreFans.add(fansData[i]);
    }

    var objectStoreNews = db.createObjectStore("news", {keyPath: "id"});
    
    for (var i in fansData) {
        objectStoreNews.add(newsData[i]);
    }

 }
 

function isOnline() {
    return window.navigator.onLine;
}
function addToFans(count, message) {
    console.log("add");
    var request = db.transaction(["fans"], "readwrite")
    .objectStore("fans")
    .add({ id: count, message: message });
    
    request.onsuccess = function(event) {
       alert("Prasad has been added to your database.");
    };
    
    request.onerror = function(event) {
       alert("Unable to add data\r\nPrasad is already exist in your database! ");
    }
 }

 function readFans(id) {
    
    var transaction = db.transaction(["fans"]);
    var objectStore = transaction.objectStore("fans");
    var request = objectStore.get(id);
    var result;
    request.onerror = function(event) {
       alert("Unable to retrieve daa from database!");
    };
    
    request.onsuccess = function(event) {
    
    if(request.result) {
         // alert("Id: " + ", Message: " + request.result.message);
          $(".fans").append(request.result.message);
            result= request.result.message;
       } else {
          alert("Kenny couldn't be found in your database!");  
       }
    };
    return result;
 }
 
function addFans() {
    var nowDate = new Date();

    var message = document.getElementById("message").value;
    var count = parseInt(localStorage.getItem('count-fans'));
    if(isNaN(count)) count =0;
    if (message != "") {
        var fansText = "<article>" +
            " <p>" + message +
            " </p>" +
            "  <p class=\"col-sm-10\">" + nowDate.getDate() + "." + (nowDate.getMonth() + 1) + "." + nowDate.getFullYear() + "</p> " +
            " <h4 class=\"font-weight-bold\">Tenis Fan 2018</h4>" +
            "   <hr style=\"border-width:6px; color:black\">" +
            " </article>";
        // document.createElement(article);
        if (isOnline()) {
            window.addEventListener("online", function (e) {
                console.log("online");
                $.post("demo_test_post.asp", {
                    date: nowDate,
                    message: message
                });
            })
            $(".fans").append(fansText);

        } else {
            console.log("offline");
            if (useLocalStorage){
             localStorage.setItem("fans-item-" + count, fansText);
            } else addToFans(count, fansText);

            localStorage.setItem("count-fans", (count + 1));
            
            //var request = readFans(count);
            
        }


        console.log("+1");
        console.log("fans-item-" + count);

        document.getElementById("message").value = "";
    } else {
        alert("The field is empty!");
        if (message == "") {
            console.log("yes");
            document.getElementById("message").style.borderColor = "red";
        }
    }
}


function displayFansOffline() {
       
}


function displayFansOnline(){
    console.log("displayFansOnline");
    var count = parseInt(localStorage.getItem('count-fans'));
    console.log("Fans: online");
    var message;
    for (i = 0; i < count; i++ ) {
        if (useLocalStorage) {
            message = localStorage.getItem("fans-item-"+i);
            console.log(message);
        } else     var request = readFans(i)
       
        $(".fans").append(message);
        console.log("+1");
        console.log("fans-item-" + i);
    }

}

function deletefans() {
    
    var i;
    for (i > 0; i < count; i++ ) {
        localStorage.removeItem('fans-item-' + i)
    }
    localStorage.removeItem('count-fans');
}



// ADMIN PAGE

function addToNews(count, message) {
    console.log("add");
    var request = db.transaction(["news"], "readwrite")
    .objectStore("news")
    .add({ id: count, message: message });
    
    request.onsuccess = function(event) {
       alert("Prasad has been added to your database.");
    };
    
    request.onerror = function(event) {
       alert("Unable to add data\r\nPrasad is already exist in your database! ");
    }
 }

 function readNews(id) {
    console.log("readNews");
    var transaction = db.transaction(["news"]);
    var objectStore = transaction.objectStore("news");
    var request = objectStore.get(id);
    var result;
    request.onerror = function(event) {
       alert("Unable to retrieve daa from database!");
    };
    
    request.onsuccess = function(event) {
    
    if(request.result) {
        // alert("Id: " + ", Message: " + request.result.message);
         console.log("news:"+request.result.message);
          $(".news").append(request.result.message);
            result= request.result.message;
       } else {
          alert("Kenny couldn't be found in your database!");  
       }
    };
    return result;
 }
function addNews() {
    // var message = $('textarea#texts').val();
    console.log("is:" + isOnline());
    var message = document.getElementById("texts").value;
    var title = document.getElementById("title").value;
    var count = parseInt(localStorage.getItem('count-news'));
    if(isNaN(count)){
        count = 0;
    }
    console.log("m" + message);
    console.log("t" + title);
    if ((message != "") && (title != "")) {
        var fansText = "<div class = \"cont-4\">" +
            " <img src = \"img/img1.jpg\"class = \"third\" >  </img > " +
            "<p class = \"blue\" >" + title + "</p > " +
            " <div class = \"cont-text\" >" + message + "</div ></div > ";
        if (isOnline()){
           
        } else {
            if(useLocalStorage){
                localStorage.setItem("news-item-" + count, fansText);
                console.log("added");
                    } else 
                     addToNews(count, fansText);
                localStorage.setItem("count-news", (count + 1));

        }
        // $(".news").append(fansText); 
        alert("News is added.");
        console.log("+1");
        console.log("news-item-" + count);
       // console.log(fansText);

        document.getElementById("texts").value = "";
        document.getElementById("title").value = "";
       // document.getElementById("texts").style.borderColor = "black"; 
       // document.getElementById("title").style.borderColor = "black";
    } else {

        if (message == "") {
            document.getElementById("texts").style.borderColor = "red";

        }
        if (title == "") {
            document.getElementById("title").style.borderColor = "red";

        }

        alert("The field is empty!");


    }

}

function setNews() {
    var count = parseInt(localStorage.getItem('count-news'));
    if (count >= 0) { count = count; } else
        localStorage.setItem('count-news', 0);
}

function sendNewsToServer(){
    var i;
    var count = parseInt(localStorage.getItem('count-news'));
    var message;
    for (i = 0; i < count; i++ ) {
        if(useLocalStorage){
        message = localStorage.getItem("news-item-" + i);
        } else
         request= readNews(i);
        $(".news").append(message);
        $.post("demo_test_post.asp", {
            name: "news",
            message: message
        });
        
    }
    
    for (i > 0; i < count; i++ ) {
        localStorage.removeItem('news-item-' + i)
    }
    localStorage.removeItem('count-news');
}

function displayNewsOffline() {
    var i;
    var count = parseInt(localStorage.getItem('count-news'));
    var message;
    for (i = 0; i < count; i++ ) {
        message = localStorage.getItem("news-item-" + i);
        console.log(message);
       $(".news").append(message);
        console.log("+1");
        console.log("news-item-" + i);
    }
}

 
function displayNewsOnline() {
    sendNewsToServer();
    getFromServe();
}

function getFromServe(){
    
}


window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
    }

    if(isOnline()){
    window.addEventListener('online',  displayNewsOnline() )
    window.addEventListener('online',  displayFansOnline() );
    } else {
    window.addEventListener('offline',displayNewsOffline() );
    window.addEventListener('offline',  displayFansOffline());
    }
}); 


