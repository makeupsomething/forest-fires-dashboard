import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
	z-index: 9999;
	height: 100vh;
	background-color: black;
	color: white;
	padding: 1rem;
	overflow: scroll;
`;

const ChartContainer = styled.div`
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const natureCategories = [
	'Surface moisture anomaly',
	'Surface temperature',
	'precipitation',
];

const airCategories = ['NO2', 'CO2', 'AOD'];

const mobilityCategories = [
	'grocery_and_pharmacy_percent_change_from_baseline',
	'parks_percent_change_from_baseline',
	'transit_stations_percent_change_from_baseline',
	'workplaces_percent_change_from_baseline',
	'residential_percent_change_from_baseline',
];

const mobilityKeys = {
	grocery_and_pharmacy_percent_change_from_baseline: 'Grocery & Pharmacy',
	parks_percent_change_from_baseline: 'Parks',
	transit_stations_percent_change_from_baseline: 'Transit',
	workplaces_percent_change_from_baseline: 'Workplace',
	residential_percent_change_from_baseline: 'Residential',
};

const defaultOptions = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
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
	yAxis: [
		{
			type: 'value',
		},
	],
};

const Sidebar = ({ selectedCounty }) => {
	const [allCountyData, setAllCountyData] = useState([]);
	const [countyData, setCountyData] = useState(null);
	const [natureOptions, setNatureOptions] = useState(null);
	const [airOptions, setAirOptions] = useState(null);
	const [mobilityOptions, setMobilityOptions] = useState(null);
	const [burnedOptions, setBurnedOptions] = useState(null);

	useEffect(() => {
		fetch(
			'https://raw.githubusercontent.com/makeupsomething/forest-fires-dashboard-data/main/data/min_max_normalize_data_mobility_air_forest.json',
		)
			.then((response) => response.json())
			.then((data) => setAllCountyData(data));
	}, []);

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
			const burnedData = countyData.map(
				(county) => county['Burned area'],
			);
			const natureSeries = natureCategories.map((cat) => {
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

			const airSeries = airCategories.map((cat) => {
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

			const mobilitySeries = mobilityCategories.map((cat) => {
				return {
					name: mobilityKeys[cat],
					type: 'bar',
					barGap: 0,
					emphasis: {
						focus: 'series',
					},
					data: countyData.map((county) => county[cat]),
				};
			});

			setBurnedOptions({
				...defaultOptions,
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: dates,
					},
				],
				series: {
					name: 'Burned Area',
					type: 'bar',
					barGap: 0,
					emphasis: {
						focus: 'series',
					},
					data: burnedData,
				},
			});

			setNatureOptions({
				...defaultOptions,
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: dates,
					},
				],
				legend: {
					data: natureCategories,
				},
				series: natureSeries,
			});

			setAirOptions({
				...defaultOptions,
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: dates,
					},
				],
				legend: {
					data: airCategories,
				},
				series: airSeries,
			});

			setMobilityOptions({
				...defaultOptions,
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: dates,
					},
				],
				legend: {
					data: [
						'Grocery & Pharmacy',
						'Parks',
						'Transit',
						'Workplace',
						'Residential',
					],
				},
				series: mobilitySeries,
			});
		}
	}, [countyData]);

	return (
		<SidebarContainer>
			{selectedCounty ? (
				<>
					<h1>{selectedCounty} County</h1>
					<ChartContainer>
						<h2>Burned Area</h2>
						<p>
							Burned Area refers to how much area in the country
							was bruned in a month
						</p>
						{burnedOptions && (
							<ReactECharts option={burnedOptions} />
						)}
						<h2>Natural Factors</h2>
						<p>
							The natural factors that contributed to the fire in
							each month, the largest value is the factor that
							contributed most the the fire in that month
						</p>
						{natureOptions && (
							<ReactECharts option={natureOptions} />
						)}
						<h2>Airborne Factors</h2>
						<p>
							The airbone factors that contributed to the fire in
							each month, the largest value is the factor that
							contributed most the the fire in that month
						</p>
						{airOptions && <ReactECharts option={airOptions} />}
						<h2>Mobility Factors</h2>
						<p>
							The human mobility factors that contributed to the
							fire in each month, the largest value is the factor
							that contributed most the the fire in that month
						</p>
						{mobilityOptions && (
							<ReactECharts option={mobilityOptions} />
						)}
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
