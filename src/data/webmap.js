import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';

import { coffee } from './images';

const symbol = {
	type: 'picture-marker',
	url: coffee,
	width: 46,
	height: 46,
	yoffset: 23,
};

export const webmap = new ArcGISMap({
	basemap: 'streets-navigation-vector',
});

const app = {
	map: webmap,
	center: [-116.5, 33.8],
	scale: 25000,
	ui: {
		components: ['attribution', 'zoom', 'compass'],
	},
};

export let view = new MapView(app);

export async function initialize(container) {
	view.container = container;
	return view;
}

export async function showLocation(item) {
	const { attributes, location, extent } = item;
	const graphic = new Graphic({
		attributes,
		geometry: {
			type: 'point',
			...location
		},
		symbol,
		popupTemplate: {
			title: '{PlaceName}',
			content: '{Place_addr}'
		}
	});
	view.graphics.add(graphic);
	view.extent = extent;
}
