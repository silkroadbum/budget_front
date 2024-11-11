import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { API_URL } from './api/const';

function App() {
  console.log(API_URL);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
