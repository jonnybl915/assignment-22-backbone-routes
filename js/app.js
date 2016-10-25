var categoryListings = [{
    catName: "Fiction",
    subcatList: ['Drama', 'Literature', 'Mystery', 'Poetry', 'Romance']
}, {
    catName: "Nonfiction",
    subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help']
}, {
    catName: "Miscellaneous",
    subcatList: ['Cooking', 'Crafts', 'Espanol', 'Medicine']
}, ]

//Three routes:
//ROUTE ===== FETCH ===== RENDER //
//1. Home, 2.Books-main, 3. Books
//console.log(Backbone);
//=================
// Query Selectors
//=================
var contentArea = document.querySelector(".content-area")

var BookCollection = Backbone.Collection.extend({
    url: "",
    initialize: function(categoryName) {
        this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + categoryName;
    }
})

var BookModel = Backbone.Model.extend({

})


var AppRouter = Backbone.Router.extend({
    routes: {
        "books/:categoryName": 'showBooks',
        '': "HomePage",
        "books/bookName": 'showBook'
    },

    showBooks: function(categoryName) {
        var bookCollectonInstance = new BookCollection(categoryName);
        bookCollectonInstance.fetch().then(function(serverResponse) {
            console.log(bookCollectonInstance);
            console.log(serverResponse);
            bookCollectonInstance.models.forEach(function(bbModl, i){
            console.log("BACKBONE MODELS", bbModl);
            var imageGrabberArray = bbModl.get('items');
            for (var i = 0; i < imageGrabberArray.length; i++) {
              var smallThumbnailImageSrc = imageGrabberArray[i].volumeInfo.imageLinks.smallThumbnail;
              console.log("IMAGES: ", smallThumbnailImageSrc);
              contentArea.innerHTML += '<div class="card">'
              contentArea.innerHTML += '<li class="thumbnail-image"> <img src="' + smallThumbnailImageSrc + '"/> </li>';
              contentArea.innerHTML += '</div>'
            }

        })
      })
    },

    showBook: function(bookName) {
      var bookModelInstance = new BookModel(bookName);
      bookModelInstance.fetch().then(function(){
        console.log(bookModelInstance);
      })
    },

    HomePage: function() {

        for (var i = 0; i < categoryListings.length; i++) {

            var umbrellaCategory = categoryListings[i].catName;
            console.log(categoryListings[i]);
            contentArea.innerHTML += "<th> <a class='umbrella-category' href=''>" + umbrellaCategory + "</a> </th> ";
            var subCategoryArray = categoryListings[i].subcatList;
            console.log(subCategoryArray);

            for (var i = 0; i < subCategoryArray.length; i++) {
                var subCategory = subCategoryArray[i];
                contentArea.innerHTML += "<ul>";
                contentArea.innerHTML += "<li class='sub-category'> <a href=''>" + subCategory + "</a> </tr>";
                contentArea.innerHTML += "</ul>";

            }
        }
    }
});



window.addEventListener('load', function() {

    var appRouter = new AppRouter();
    console.log("Backbone ROUTING");
    Backbone.history.start();
    //keeps a log so as to go to previous hash on backspace
})
