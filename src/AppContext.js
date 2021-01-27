import React, { createContext, useEffect, useReducer } from 'react';
import { shopLocator } from './data/locator';

export const AppContext = createContext();

const initialState = {
	shops: [],
	showMap: false,
	shop: null,
	container: null,
};

function reducer(state, { type, payload }) {
	switch (type) {
		case 'ADD_SHOPS':
			return { ...state, shops: payload };
		case 'SHOW_MAP':
			return {
				...state,
				showMap: payload.showMap,
				shop: payload.shop,
				container: payload.container,
			};
		default:
			return state;
	}
}

const AppContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	useEffect(() => {
		shopLocator().then((results) => {
			dispatch({ type: 'ADD_SHOPS', payload: results });
		});
	}, []);

	useEffect(() => {
		const loadMap = async () => {
			const { initialize, showLocation } = await import('./data/webmap');
			const { container, shop } = state;
			await initialize(container);
			await showLocation(shop);
		};
		if (state.showMap) {
			loadMap();
		}
	}, [state]);

	return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
