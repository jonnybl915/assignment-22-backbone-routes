var categoryListings = [
   {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
   {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
   {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
]
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
  initialize: function(categoryName){
    this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + categoryName;
  }
})

var AppRouter = Backbone.Router.extend({
  routes: {
    "books/:categoryName": 'showBooks',
    '': "HomePage"
  },

  showBooks: function(categoryName){
    var bookCollectonInstance = new BookCollection(categoryName);
    bookCollectonInstance.fetch().then(function(){
      console.log(bookCollectonInstance);
    })
  },

  HomePage: function(){
    console.log("hello there");
    //perfom loops to insert row info dynamically;
    for (var i = 0; i < categoryListings.length; i++) {
      categoryListings[i]
    }
    contentArea.innerHTML += "<th> <a class='umbrella-category' href=''>" + "Fiction" + "</a> </th>";
    contentArea.innerHTML += "<th> <a class='umbrella-category' href=''>" + "Mystery" + "</a> </th>"
    contentArea.innerHTML += "<th> <a class='umbrella-category' href=''>" + "Nonfiction" + "</a> </th>"


   }
});

window.addEventListener('load', function(){

  var appRouter = new AppRouter();

  Backbone.history.start();
  //keeps a log so as to go to previous hash on backspace
})
