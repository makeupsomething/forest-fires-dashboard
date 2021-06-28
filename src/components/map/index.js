/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, GeoJsonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import styled from 'styled-components';
import geoData from '../../data/California_Counties.json';

const MapWrapper = styled.div`
	width: 50vw;
`;

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

const GeoLayer = new GeoJsonLayer({
	id: 'geojson-layer',
	data: geoData,
	pickable: true,
	stroked: true,
	filled: true,
	extruded: false,
	lineWidthScale: 20,
	lineWidthMinPixels: 2,
	getFillColor: [160, 160, 180, 200],
	getLineColor: [255, 0, 0, 255],
	getRadius: 100,
	getLineWidth: 1,
	getElevation: 30,
});

const Map = () => {
	return (
		<DeckGL
			initialViewState={INITIAL_VIEW_STATE}
			controller={true}
			layers={[GeoLayer]}
			width="70%"
		>
			<StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
		</DeckGL>
	);
};

export default Map;
