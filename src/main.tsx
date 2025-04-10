import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from '@/store/reducer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import '@/assets/scss/style.scss';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'react-toastify/dist/ReactToastify.css';

import './index.css';

const store = configureStore({ reducer });

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  </Provider>,
);
