var categoryListings = [
   {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
   {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
   {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
]

var appContainer = document.querySelector("#app-container");

var bookModel = Backbone.Model.extend({
  url: "",
  initialize: function(inputValue){
    this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + inputValue;
  }
})

var AppRouter = Backbone.Router.extend({
  routes: {
    "show-books/:bookName": 'showBooks',
    '': "showHomePage"
  },

  
