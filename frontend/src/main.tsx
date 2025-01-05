import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ClerkProvider} from "@clerk/clerk-react";
import {RequestUtil} from "./utils/RequestUtil";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

if (!RequestUtil.BASE_API_URL) {
    throw new Error("Missing base api url")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <App />
      </ClerkProvider>
  </StrictMode>,
)
