import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { ToastContainer } from 'react-toastify';
// import { useRecoilValue } from 'recoil';
// import { UserAtom } from './store/user';
// import type { User } from './utils/userInterface';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/dashboard" element={<Dashboard />} />
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
