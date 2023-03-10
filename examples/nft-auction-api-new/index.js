import * as AppViews from "./components/App/index.js";
import * as Attacher from "./components/Attacher/index.js";
import * as Deployer from "./components/Deployer/index.js";
import * as Playerviews from "./components/Player/index.js";
import RenderViews, { createRoot } from "./views/renderViews";
import ReachContextProvider from "./context/ReachContext";
import './index.css';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
import { renderDOM } from "./views/renderViews.jsx";
const reach = loadStdlib(process.env);



const V = {
	...AppViews,
	...Attacher,
	...Deployer,
	...Playerviews,
};

function App() {
	return (
		<div className='App'>
			<RenderViews {...Views} />
		</div>
	);
}

renderDOM(
	<ReachContextProvider>
		<App />
	</ReachContextProvider>
);

export default App;