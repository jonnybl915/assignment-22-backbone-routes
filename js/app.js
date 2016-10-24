var categoryListings = [
   {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
   {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
   {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
]
//Three routes:
//ROUTE ===== FETCH ===== RENDER //
//1. Home, 2.Books-main, 3. Books
var appContainer = document.querySelector("#app-container");

var BookCollection = Backbone.Collection.extend({
  url: "",
  initialize: function(inputValue){
    this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + inputValue;
  }
})

var AppRouter = Backbone.Router.extend({
  routes: {
    "show-books/:generalCategory": 'showBooks',
    '': "HomePage"
  },

  showBooks: function(categoryName){
    var bookCollectonInstance = new BookCollection(categoryName);
    bookCollectonInstance.fetch().then(function(){
      console.log(bookCollectonInstance);
    })
  },
  
});
