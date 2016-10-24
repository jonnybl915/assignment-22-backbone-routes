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
    contentArea.innerHTML += "<a href=''>" + "Fiction" + "</a>";
    contentArea.innerHTML += "<h1>HELLO000000</h1>"


   }
});

window.addEventListener('load', function(){

  var appRouter = new AppRouter();

  Backbone.history.start();
  //keeps a log so as to go to previous hash on backspace
})
