import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import visData from '../../data/data_mobility_air_forest.json';

const SidebarContainer = styled.div`
	z-index: 9999;
	height: 100vh;
	background-color: black;
	color: white;
	padding: 1rem;
`;

const ChartContainer = styled.div`
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const options = {
	grid: { top: 8, right: 8, bottom: 24, left: 36 },
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			smooth: true,
		},
	],
	tooltip: {
		trigger: 'axis',
	},
};

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

	useEffect(() => {
		if (countyData) {
			console.log(countyData);
		}
	}, [countyData]);

	return (
		<SidebarContainer>
			<h1>{selectedCounty} County</h1>
			<ChartContainer>
				<ReactECharts option={options} />
				<ReactECharts option={options} />
			</ChartContainer>
		</SidebarContainer>
	);
};

export default Sidebar;
