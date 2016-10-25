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

var BookModel = Backbone.Model.extend({
    parse: function(parsedResponse) {
        return parsedResponse.volumeInfo;
        console.log("parsing volume Info: ", parsedResponse.volumeInfo);
    },
})

var BookCollection = Backbone.Collection.extend({
    //== parse fires IMMEDIATELY after fetch call ==//
    model: BookModel,

    parse: function(serverResponse) {
        console.log("parsing the response: ", serverResponse);
        return serverResponse.items;
    },
    url: "",
    initialize: function(categoryName) {
        this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + categoryName;
    }
})




var AppRouter = Backbone.Router.extend({
    routes: {
        "books/:categoryName": 'showBooks',
        '': "HomePage",
        "books/bookName": 'showBook'
    },

    showBooks: function(categoryName) {
        var bookCollectonInstance = new BookCollection(categoryName);
        bookCollectonInstance.fetch().then(function(serverRes) {
            console.log("Parsed COLLECTION INSTANCE: ", bookCollectonInstance);

            bookCollectonInstance.models.forEach(function(bbModl, i) {
                var builderString = '';

                var titles = bbModl.get("title");
                var imageSrc = bbModl.get("imageLinks").smallThumbnail;
                builderString += '<div class="book-card">'
                builderString += '<img alt="noIMG" src="' + imageSrc + '"/>';
                builderString += '<p>' + titles + '</p>';
                builderString += '</div>';

                contentArea.innerHTML += builderString;
            })
        })
    },

    showBook: function(bookName) {
        var bookModelInstance = new BookModel(bookName);
        bookModelInstance.fetch().then(function() {
            console.log(bookModelInstance);
        })
    },

    HomePage: function() {
        var builderString = "";
        for (var i = 0; i < categoryListings.length; i++) {

            var umbrellaCategory = categoryListings[i].catName;
            builderString += "<div class='category-list'>"
            builderString += "<p> <a class='umbrella-category' href=''>" + umbrellaCategory + "</a> </p> ";

            var subCategoryArray = categoryListings[i].subcatList;
            console.log("subCategoryArray: ", subCategoryArray.length);

            for (var x = 0; x < subCategoryArray.length; x++) {
                var subCategory = subCategoryArray[x];
                builderString += "<p class='sub-category'> <a href=''>" + subCategory + "</a> </p>";

            }
            builderString += "</div>"
            contentArea.innerHTML = builderString;

        }
    }
});



window.addEventListener('load', function() {

    var appRouter = new AppRouter();
    console.log("Backbone ROUTING");
    Backbone.history.start();
    //keeps a log so as to go to previous hash on backspace
})
