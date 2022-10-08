import { Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Conference from './pages/Conference';
import Edit from './pages/Edit';
import PageNotFound from './pages/PageNotFound';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':conferenceId' element={<Conference />} />
        <Route path=':conferenceId/edit' element={<Edit />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
