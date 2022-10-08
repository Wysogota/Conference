import { Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Conference from './pages/Conference';
import Edit from './pages/Edit';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path=':conferenceId' element={<Conference />} />
      <Route path=':conferenceId/edit' element={<Edit />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
