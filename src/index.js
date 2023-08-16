import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from the correct path

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Use createRoot function from the correct import
root.render(<App />);