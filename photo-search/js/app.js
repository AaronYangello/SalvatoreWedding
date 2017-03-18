window.Instagram = {
    /**
    * Store application settings 
    */
    config: {},
    
    BASE_URL: 'https://api.instagram.com/v1',
    
    init: function(opt) {
        opt = opt || {};
        this.config.access_token = opt.access_token;
    },
    
    /**
    * Gets a list of recently tagged media with specified hashtag
    */
    
    tagsByName: function( name, callback ){
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?access_token=' + this.config.access_token;
        this.getJSON(endpoint, callback);
    },
    
    getJSON: function( url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function (response) {
                if(typeof callback === 'function') callback(response);
            }
        });
    },
};

Instagram.init({
   access_token:'221434880.c61f2d9.ed877c31145943ce979e9cbe17e3b5af'
});

$(document).ready(function() {
    
    var TAG_NAMES = ['salvatoreorbust',
                     'kickinitwiththesalvatores',
                     'kickingitwiththesalvatores'];
    
    Instagram.tagsByName(TAG_NAMES[1],function(response){
        var $instagram = $('#instagram');
            $instagram.html('');

        for (var i = 0; i < response.data.length; i++){
            //Image
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append('<img src="' + imageUrl + '"/>');

            //Likes
            imageLikes = response.data[i].likes.count;
            $instagram.append('<p>Likes: ' + imageLikes + '</p>');

            //PhotoCred
            imageCred = response.data[i].caption.from.username;
            $instagram.append('<p>Photo Credit: ' + imageCred + '</p>');

            //Caption
            imageCap = response.data[i].caption.text;
            $instagram.append('<p>' + imageCap + '</p>');                
        }
    });
    
    
})