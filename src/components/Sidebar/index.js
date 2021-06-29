import { useEffect, useState } from 'react';
import styled from 'styled-components';
import visData from '../../data/data_mobility_air_forest.json';

const SidebarContainer = styled.div`
	z-index: 9999;
	height: 100vh;
	background-color: black;
	color: white;
`;

const Sidebar = ({ selectedCounty }) => {
	const [allCountyData] = useState(visData);
	const [countyData, setCountyData] = useState(null);

	useEffect(() => {
		if (selectedCounty) {
			const filteredData = allCountyData.filter((county) =>
				county.County_name.includes(selectedCounty),
			);
			setCountyData(filteredData);
		}
	}, [selectedCounty, allCountyData]);

	return <SidebarContainer>{selectedCounty}</SidebarContainer>;
};

export default Sidebar;
