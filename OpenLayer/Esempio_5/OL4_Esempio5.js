function init() {
    document.removeEventListener('DOMContentLoaded', init);

    var format_confinicomunali = new ol.format.GeoJSON();
    var features_confinicomunali = format_confinicomunali.readFeatures(geojson_confinicomunali,
                                { dataProjection: 'EPSG:4326',
                                 featureProjection: 'EPSG:3857'
                                });
    var jsonSource_confinicomunali = new ol.source.Vector();
    jsonSource_confinicomunali.addFeatures(features_confinicomunali);

    var lyr_confinicomunali = new ol.layer.Vector({
            source:jsonSource_confinicomunali,
            title: "Confini Comunali",
            name: "confini_comunali"
    });

    var format_centrilocalita = new ol.format.GeoJSON();
    var features_centrilocalita = format_confinicomunali.readFeatures(geojson_centrilocalita,
                                { dataProjection: 'EPSG:4326',
                                 featureProjection: 'EPSG:3857'
                                });
    var jsonSource_centrilocalita = new ol.source.Vector();
    jsonSource_confinicomunali.addFeatures(features_centrilocalita);

    var lyr_centrilocalita = new ol.layer.Vector({
            source:jsonSource_centrilocalita,
            title: "Centri e Localita'",
            name: "centri_localita"
    });

    var map = new ol.Map({
        // componente HTML dove posizionare la Mapps
        target: 'map',
        layers: [
              new ol.layer.Tile({
                  // Usa un Layer di Tipo Tile da OpenStreetMap
                  source: new ol.source.OSM()
              }),
              lyr_centrilocalita,
              lyr_confinicomunali,
        ],
        controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
              collapsible: false
              })
            }).extend([
              new ol.control.ScaleLine({}),
              new ol.control.LayerSwitcher({tipLabel: "Layers"}),
          ]),
        // Posizionamento della View coordinate Potenza
        view: new ol.View({
            center: ol.proj.transform([15.8022214, 40.6372425], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7
        })
    });

    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Légende' // Optional label for button
    });
    map.addControl(layerSwitcher);
}
// Questo ci assicura che lo script JavaScript viene eseguito solo
// Quando la DOM e' stata completamente caricata
document.addEventListener('DOMContentLoaded', init);
