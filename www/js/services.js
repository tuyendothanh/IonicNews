var starter_services = angular.module('starter.services', []);

starter_services.factory('Chats', function($http) {
  var chats = [];
  // Might use a resource here that returns a JSON array
  $http.get('https://www.reddit.com/r/Android/.json')
    .success(function(response){
      angular.forEach(response.data.children, function(child){
        // console.log(child.data.id);
        if (child.data.preview) {
          chats.push({
            id: child.data.id,
            name: child.data.domain,
            lastText: child.data.title,
            face: child.data.preview.images[0].source.url
          });
          console.log(child.data.id);
          console.log(child.data.preview.images[0].source.url); //"preview": {"images": [{"source": {"url":
        }

      });
    });
  // Some fake testing data
  /*
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];
  */
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === (chatId)) { //parseInt
          return chats[i];
        }
      }
      return null;
    },
    image_urls: function() {
      var img_urls = [];
      for (var i = 0; i < chats.length; i++) {
        img_urls.push(chats[i].face);
      }
      return img_urls;
    }
  };
});

starter_services.factory('Categories', function($http) {
  var categories = [];
  // Might use a resource here that returns a JSON array
  $http.get('http://localhost:3000/api/categories')
    .success(function(response){
      console.log(response);
      angular.forEach(response, function(category){
        console.log(category);
        if (category) {
          categories.push({
            category: category.category,
            image:category.image
          });

        }
      });
    });
  return {
    all: function() {
      return categories;
    },
    remove: function(category) {
      categories.splice(categories.indexOf(category), 1);
    },
    get: function(category) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].category === (category)) { //parseInt
          return categories[i];
        }
      }
      return null;
    }
  };
});
