import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Preview } from './preview.tsx';
import { HashRouter, Routes, Route } from 'react-router'
import RootLayout from './rootLayout.tsx';
import CountryDetailPage from './country-detail-page.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Preview />} />
          <Route path='/detail/:officialName' element={<CountryDetailPage />}/>
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
