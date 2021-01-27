import React, { useContext, useRef } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { LocalCafe } from '@material-ui/icons';

import { AppContext } from './AppContext';

import './App.css';

function App() {
	const { state, dispatch } = useContext(AppContext);
	const mapRef = useRef(null);
	return (
		<Container maxWidth="lg" className="app-container">
			<AppBar position="sticky">
				<Toolbar className="header">
					<Grid container spacing={2}>
						<LocalCafe />
					</Grid>
					<Grid container spacing={2}>
						<Typography variant="h6">Coffee Shops</Typography>
					</Grid>
				</Toolbar>
			</AppBar>
			<Container maxWidth={state.showMap ? 'lg' : 'sm'} className="app-container">
				<div className="mapDiv" ref={mapRef}>
					{state.showMap ? (
						[]
					) : (
						<List>
							{state.shops.map((shop) => (
								<ListItem
									button
									onClick={() => {
										dispatch({
											type: 'SHOW_MAP',
											payload: {
												showMap: true,
												shop,
												container: mapRef.current,
											},
										});
									}}
									key={shop.attributes.Place_addr}
								>
									<ListItemText
										primary={shop.attributes.PlaceName}
										secondary={shop.attributes.Place_addr}
									/>
								</ListItem>
							))}
						</List>
					)}
				</div>
			</Container>
		</Container>
	);
}

export default App;
