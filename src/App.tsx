import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Manage from './pages/Manage/Manage';
import Protected from './authorization/Protected';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className="App">
					<BrowserRouter>
						<Header />
						<main>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route
									path="/manage"
									element={
										<Protected requiredRole="Manager">
											<Manage />
										</Protected>
									}
								/>
								<Route
									path="*"
									element={<Navigate to="/" replace />}
								/>
							</Routes>
						</main>
						<Footer />
					</BrowserRouter>
				</div>
			</PersistGate>
		</Provider>
	);
};

export default App;
