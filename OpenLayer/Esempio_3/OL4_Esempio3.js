function init() {
    document.removeEventListener('DOMContentLoaded', init);

    var map = new ol.Map({
        // componente HTML dove posizionare la Mapps
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.TileJSON({
              url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
              crossOrigin: 'anonymous'
            })
          })
        ],
        controls: [
            //Define the default controls
            new ol.control.Zoom(),
            new ol.control.Rotate(),
            new ol.control.Attribution(),
            //Define some new controls
            //new ol.control.ZoomSlider(),
            //new ol.control.MousePosition(),
            //new ol.control.ScaleLine(),
            //new ol.control.OverviewMap()
        ],
        // Posizionamento della View coordinate Potenza 
        view: new ol.View({
            center: ol.proj.transform([15.8022214, 40.6372425], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7
        })
    });
}
// Questo ci assicura che lo script JavaScript viene eseguito solo
// Quando la DOM e' stata completamente caricata
document.addEventListener('DOMContentLoaded', init);
