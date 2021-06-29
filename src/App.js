import React, { useState } from 'react';
import styled from 'styled-components';
import Map from './components/map';
import Sidebar from './components/Sidebar';

const AppWrapper = styled.div`
	display: grid;
	grid-template-columns: 70% auto;
`;

function App() {
	const [selectedCounty, setSelectedCounty] = useState(null);

	return (
		<AppWrapper>
			<div>
				<Map
					selectedCounty={selectedCounty}
					setSelectedCounty={setSelectedCounty}
				/>
			</div>
			<Sidebar selectedCounty={selectedCounty}> Test Test</Sidebar>
		</AppWrapper>
	);
}

export default App;
