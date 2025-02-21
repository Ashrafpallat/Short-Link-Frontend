import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
    <Toaster
        position="top-center" // Adjust position
        toastOptions={{
          duration: 5000, // Auto close after 5 seconds
        }}
      />
     <Router>
      <AppRoutes/>
     </Router>
    </>
  ) 
}

export default App
