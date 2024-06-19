import { Route, createRoutesFromElements } from 'react-router'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { Favorites } from './pages/Favorites/Favorites'
import Home from './pages/Home/Home'
import { List } from './pages/List/List'
import { MoviePage, movieLoader } from './pages/Movie/MoviePage'
import NotFound from './pages/NotFound/NotFound'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Layout />}>
			<Route index element={<Home />} />
			<Route path='list/:pageId' element={<List />} />
			<Route
				path='movie/:movieId'
				element={<MoviePage />}
				loader={movieLoader}
			/>
			<Route path='favorites/:pageId' element={<Favorites />} />
			<Route path='*' element={<NotFound />} />
		</Route>
	)
)

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
