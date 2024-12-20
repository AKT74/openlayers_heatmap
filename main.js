import KML from 'https://cdn.skypack.dev/ol/format/KML.js';
import Map from 'https://cdn.skypack.dev/ol/Map.js';
import StadiaMaps from 'https://cdn.skypack.dev/ol/source/StadiaMaps.js';
import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import {Heatmap as HeatmapLayer, Tile as TileLayer} from 'https://cdn.skypack.dev/ol/layer.js';

const blur = document.getElementById('blur');
const radius = document.getElementById('radius');

const vector = new HeatmapLayer({
  source: new VectorSource({
    url: 'data/kml/2012_Earthquakes_Mag5.kml',
    format: new KML({
      extractStyles: false,
    }),
  }),
  blur: parseInt(blur.value, 10),
  radius: parseInt(radius.value, 10),
  weight: function (feature) {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it from
    // the Placemark's name instead.
    const name = feature.get('name');
    const magnitude = parseFloat(name.substr(2));
    return magnitude - 5;
  },
});

const raster = new TileLayer({
  source: new StadiaMaps({
    layer: 'stamen_toner',
  }),
});

new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

blur.addEventListener('input', function () {
  vector.setBlur(parseInt(blur.value, 10));
});

radius.addEventListener('input', function () {
  vector.setRadius(parseInt(radius.value, 10));
});


// Function to update slider background
function updateSliderBackground(slider) {
    const value = slider.value;
    const max = slider.max;
    const percentage = (value / max) * 100;
    slider.style.background = `linear-gradient(to right, #0078d7 ${percentage}%, #ddd ${percentage}%)`;
  }

  // Select sliders
  const radiusSlider = document.getElementById('radius');
  const blurSlider = document.getElementById('blur');

  // Initialize slider backgrounds
  updateSliderBackground(radiusSlider);
  updateSliderBackground(blurSlider);

  // Add event listeners for input changes
  radiusSlider.addEventListener('input', () => updateSliderBackground(radiusSlider));
  blurSlider.addEventListener('input', () => updateSliderBackground(blurSlider));