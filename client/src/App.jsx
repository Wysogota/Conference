import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Conference from './pages/Conference';
import Edit from './pages/Edit';
import Create from './pages/Create';
import PageNotFound from './pages/PageNotFound';
import Header from './components/Header';
import CONSTANTS from './constants';
const { PAGES: { HOME, EDIT, CREATE } } = CONSTANTS;

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={`${HOME}/:conferenceId`} element={<Conference />} />
        <Route path={`${HOME}/:conferenceId${EDIT}`} element={<Edit />} />
        <Route path={CREATE} element={<Create />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
