var map = L.map('map').setView([29.8884, -97.9384], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);





        var point1 = turf.point([-97, 29])
         L.geoJson(point1).addTo(map);

        var point2 = turf.point([-98, 28])
        L.geoJson( point2).addTo(map);

        var midpoint = turf.midpoint(point1, point2)
        L.geoJson(midpoint).addTo(map);
