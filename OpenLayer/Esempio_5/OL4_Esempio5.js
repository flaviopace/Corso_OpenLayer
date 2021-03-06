function init() {
    document.removeEventListener('DOMContentLoaded', init);
    
    //Creazione di un gruppo di Base Layer
    var baseLayer = new ol.layer.Group({
        'title': 'Base maps',
        layers: [
            new ol.layer.Tile({
                'title': 'Cartina',
                'type': 'base',
                source: new ol.source.TileJSON({
                    url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
                    crossOrigin: 'anonymous'
                })
            }),
            new ol.layer.Tile({
                // Usa un Layer di Tipo Tile da OpenStreetMap
                'title': 'OSM Standard',
                'type': 'base',
                source: new ol.source.OSM()
            }),
        ]
    });
    
    // Istanzia un oggetto di tipo GeoJSON
    var format_confinicomunali = new ol.format.GeoJSON();
    // instanzia un nuovo oggetto 
    // readFeatures methos e' usato per estrarre dal GeoJSON i dati della proiezione
    var features_confinicomunali = format_confinicomunali.readFeatures(geojson_confinicomunali,
                                { dataProjection: 'EPSG:4326',
                                 featureProjection: 'EPSG:3857'
                                });
    // Istanzia un oggetto di tipo Vector               
    var jsonSource_confinicomunali = new ol.source.Vector();
    jsonSource_confinicomunali.addFeatures(features_confinicomunali);

    var lyr_confinicomunali = new ol.layer.Vector({
            source:jsonSource_confinicomunali,
            title: "Confini Comunali",
            name: "confini_comunali"
    });


    var format_centrilocalita = new ol.format.GeoJSON();
    var features_centrilocalita = format_centrilocalita.readFeatures(geojson_centrilocalita,
                                { dataProjection: 'EPSG:4326',
                                 featureProjection: 'EPSG:3857'
                                });
    var jsonSource_centrilocalita = new ol.source.Vector();
    jsonSource_centrilocalita.addFeatures(features_centrilocalita);

    var lyr_centrilocalita = new ol.layer.Vector({
            source:jsonSource_centrilocalita,
            title: "Centri e Localita'",
            name: "centri_localita"
    });

    var layers = new ol.layer.Group({
        'title': 'Layers',
        layers: [
            lyr_centrilocalita,
            lyr_confinicomunali
        ]
    });
    
    var map = new ol.Map({
        // componente HTML dove posizionare la Mapps
        target: 'map',
        layers: [
              baseLayer,
              layers,
        ],
        controls: [
            //Define the default controls
            new ol.control.Zoom(),
            new ol.control.Rotate(),
            new ol.control.Attribution(),
            //Define some new controls
            new ol.control.ZoomSlider(),
            new ol.control.MousePosition(),
            new ol.control.ScaleLine(),
            new ol.control.OverviewMap()
        ],
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
