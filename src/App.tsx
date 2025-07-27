import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { ToastContainer } from 'react-toastify';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/signin" replace />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<Navigate to="/signin" replace />} />
			</Routes>

			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</BrowserRouter>
	);
}

export default App;
