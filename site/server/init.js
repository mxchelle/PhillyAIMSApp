 Meteor.methods({
        search: function(query, options) {
            options = options || {};

            // guard against client-side DOS: hard limit to 50
            if (options.limit) {
                options.limit = Math.min(50, Math.abs(options.limit));
            } else {
                options.limit = 50;
            }

            // TODO fix regexp to support multiple tokens
            var regex = new RegExp("^" + query);
            var post = Posts.find({title: {$regex:  regex}}, options).fetch();
            return Tags.find({name: {$regex:  regex}}, options).fetch().concat(post);
        }
    });