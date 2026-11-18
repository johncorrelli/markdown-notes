import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {applyTheme, getSavedTheme} from './helpers/themes';

applyTheme(getSavedTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
