export async function shopLocator() {
	const searchUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
	const params = {
		f: 'json',
		category: 'Coffee Shop',
		location: [-117.2887949, 34.0594601],
		outFields: ['Place_addr', 'PlaceName'],
		maxLocations: 10,
	};

	const paramVals = [];
	for (const k in params) {
		const val = encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
		paramVals.push(val);
	}
	const url = `${searchUrl}?${paramVals.join('&')}`;
	const data = await fetch(url);
	const { candidates } = await data.json();
	return candidates;
}
