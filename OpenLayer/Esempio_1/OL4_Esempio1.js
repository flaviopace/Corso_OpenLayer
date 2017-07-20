function init() {
    document.removeEventListener('DOMContentLoaded', init);

    var map = new ol.Map({
        // componente HTML dove posizionare la Mapps
        target: 'map',
        layers: [
            new ol.layer.Tile({
                // Usa un Layer di Tipo Tile da OpenStreetMap
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
        // Posizionamento della View
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });
}
// Questo ci assicura che lo script JavaScript viene eseguito solo
// Quando la DOM e' stata completamente caricata
document.addEventListener('DOMContentLoaded', init);
