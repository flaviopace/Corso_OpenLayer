function init() {
    document.removeEventListener('DOMContentLoaded', init);

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
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
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });
}
document.addEventListener('DOMContentLoaded', init);
