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

const dataCategories = [
	// 'Surface moisture anomaly',
	// 'Surface temperature',
	// 'precipitation',
	//'NO2',
	'CO2',
	'AOD',
];

const Sidebar = ({ selectedCounty }) => {
	const [allCountyData] = useState(visData);
	const [countyData, setCountyData] = useState(null);
	const [options, setOptions] = useState(null);

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
			const dates = countyData.map((data) => data.date);
			const series = dataCategories.map((cat) => {
				return {
					name: cat,
					type: 'bar',
					barGap: 0,
					emphasis: {
						focus: 'series',
					},
					data: countyData.map((county) => county[cat]),
				};
			});

			setOptions({
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {
					data: dataCategories,
				},
				toolbox: {
					show: false,
					orient: 'vertical',
					left: 'right',
					top: 'center',
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						magicType: {
							show: true,
							type: ['line', 'bar', 'stack', 'tiled'],
						},
						restore: { show: true },
						saveAsImage: { show: true },
					},
				},
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: dates,
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series,
			});
		}
	}, [countyData]);

	return (
		<SidebarContainer>
			{selectedCounty ? (
				<>
					<h1>{selectedCounty} County</h1>
					<ChartContainer>
						{options && <ReactECharts option={options} />}
					</ChartContainer>
				</>
			) : (
				<>
					<h1>{selectedCounty} Welcome</h1>
					<p>Select a county to view see data</p>
				</>
			)}
		</SidebarContainer>
	);
};

export default Sidebar;
