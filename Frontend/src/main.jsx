import { StrictMode } from 'react'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes'
import { createRoot } from 'react-dom/client'; 
import router from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Scroll } from 'lucide-react';
import ScrollToTop from './ScrollToTop.js';
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkKey) {
  throw new Error("Missing Clerk Publishable Key");
}


createRoot(document.getElementById('root')).render(
  
     
  <StrictMode>
  <ClerkProvider 
  appearance={{
    baseTheme: dark,
  }}
  publishableKey={clerkKey} >
    {/* <ScrollToTop /> */}
     <RouterProvider router={router} />
     
    </ClerkProvider>
  </StrictMode>
  
)
