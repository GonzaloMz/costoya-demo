import React from 'react';
import { useParams } from "react-router";
import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import ReactSVG from 'react-svg';
import ScreenManager from './ScreenManager';

/**
 * 
 * @param {HTMLElement} svg 
 */
const beforeInjection = (svg) => {
	new ScreenManager(svg);
}

/**
 * 
 * @param {Error} error 
 * @param {HTMLElement} svg 
 */
const afterInjection = (error, svg) => {
	if (error) {
		console.log(svg);
		console.error(error);
	}
}


const Home = () => {
	let { id } = useParams();
	if (!id) id = "HOME V1.svg"
	id = `../screens/${id}.svg`;
	return (
		<ReactSVG
			beforeInjection={beforeInjection}
			afterInjection={afterInjection}
			src={id}
			className="fadeIn animated w-100"></ReactSVG>
	);
}

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/:id" component={Home}>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
