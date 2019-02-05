//checks that our service worker is registered
console.log('service worker registered');

//variable stores all of the files we want to cache
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

//wait until installation event is complete
self.addEventListener('install', function(event) {
    event.waitUntil(
        //open caches object and add cacheFiles
        caches.open('cacheOne').then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );

});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        //determine if the event request url already exists 
        caches.match(event.request).then(function(response) {
            //if true return existing cache
            if (response) { return response }
            //if request does not exist, fetch item like normal
            else {
                return fetch(event.request)
                    .then(function(response) {
                        const clonedResponse = response.clone();
                        caches.open('cacheOne').then(function(cache) {
                                //pair the request with response
                                cache.put(e.request, clonedResponse);
                            })
                            //this returns the response back to the fetch
                        return response;
                    })
                    //logs errors
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        })
    );
});