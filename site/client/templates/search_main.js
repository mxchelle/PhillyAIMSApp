// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

Template.search_main.onRendered(function(){
     $('.secondary-search').hide();
     //Meteor.typeahead.inject();
});

Template.search_main.onDestroyed(function(){
     $('.secondary-search').show();
});

Template.search_main.helpers({
  canSearch: function () {
    return Users.can.view(Meteor.user());
  },
  searchQuery: function () {
    return FlowRouter.getQueryParam("query");
  },
  searchQueryEmpty: function () {
    return !!FlowRouter.getQueryParam("query") ? "" : "empty";
  },
  
  /*search : function(query, sync, callback) {
    var func2 = function(callback) {
      Meteor.call('search', query, {}, function(err, res) {
        if (err) {
          console.log(err);
          return;
        }
        callback(res.map(function(v){ return {value: v.name}; }));
      });
    };
    var wrapped2 = Meteor.wrapAsync(func2);
      
  }*/
});

Template.search_main.events({
  'keyup #search-main': function (e) {
    
    e.preventDefault();
    
    var val = $(e.target).val(),
        $search = $('#search-main');

    // if we're not on search route, go to it

    
    if (val === '') {
      // if search field is empty
      $search.addClass('empty');
      val = null;
    } else {
      $search.removeClass('empty');
    }

    delay(function(){
      $('.secondary-search').focus();

      if (FlowRouter.getRouteName() !== "postsDefault") {
        FlowRouter.go("postsDefault");
      }
      FlowRouter.setQueryParams({query: val});
      

    }, 500 );

  }
});