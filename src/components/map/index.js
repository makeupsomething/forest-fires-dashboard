import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import geoData from '../../data/California_Counties.json';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = `${process.env.REACT_APP_MAP_BOX_KEY}`;

// Viewport settings
const INITIAL_VIEW_STATE = {
	longitude: -122.41669,
	latitude: 37.7853,
	zoom: 4,
	pitch: 0,
	bearing: 0,
};

const Map = ({ selectedCounty, setSelectedCounty }) => {
	const [hoverInfo, setHoverInfo] = useState(null);

	const geoLayer = new GeoJsonLayer({
		id: 'geojson-layer',
		data: geoData,
		pickable: true,
		stroked: true,
		filled: true,
		extruded: false,
		lineWidthScale: 20,
		lineWidthMinPixels: 2,
		getFillColor: (d) => {
			const { COUNTY_NAME: countyName } = d.properties;
			if (countyName === hoverInfo) {
				return [255, 0, 0, 200];
			} else if (countyName === selectedCounty) {
				return [255, 0, 0, 250];
			} else {
				return [160, 160, 180, 200];
			}
		},
		getLineColor: [255, 0, 0, 255],
		getRadius: 100,
		getLineWidth: 1,
		getElevation: 30,
		onHover: (d) => {
			if (d.object) {
				const { COUNTY_NAME: countyName } = d.object.properties;
				if (countyName) {
					setHoverInfo(countyName);
				}
			} else {
				setHoverInfo(null);
			}
		},
		onClick: (d) => {
			if (d.object) {
				const { COUNTY_NAME: countyName } = d.object.properties;
				if (countyName) {
					setSelectedCounty(countyName);
				}
			} else {
				setSelectedCounty(null);
			}
		},
		updateTriggers: {
			getFillColor: [hoverInfo, selectedCounty],
		},
	});

	return (
		<DeckGL
			initialViewState={INITIAL_VIEW_STATE}
			controller={true}
			layers={[geoLayer]}
			width="70%"
		>
			<StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
		</DeckGL>
	);
};

export default Map;
