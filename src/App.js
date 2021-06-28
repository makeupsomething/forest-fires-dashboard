import styled from 'styled-components';
import Map from './components/map';

const AppWrapper = styled.div`
	display: grid;
	grid-template-columns: 70% auto;
`;

const Sidebar = styled.div`
	z-index: 9999;
	height: 100vh;
	background-color: black;
	color: white;
`;

function App() {
	return (
		<AppWrapper>
			<div>
				<Map />
			</div>
			<Sidebar> Test Test</Sidebar>
		</AppWrapper>
	);
}

export default App;
