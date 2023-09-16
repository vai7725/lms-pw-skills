import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

import './index.css';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Footer />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]);

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
