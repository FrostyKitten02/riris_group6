import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ClerkProvider} from "@clerk/clerk-react";
import {ConfigUtil} from "./utils/ConfigUtil";

const config = ConfigUtil.readConfig();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ClerkProvider publishableKey={config.clerkPublishable} afterSignOutUrl="/">
          <App />
      </ClerkProvider>
  </StrictMode>,
)
