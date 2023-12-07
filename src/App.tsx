import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import PageContent from './containers/PageContent/PageContent';
import PageForm from './containers/PageForm/PageForm';
import { pages } from './constant';

const App = () => {
  return (
    <>
      <header className='bg-body-secondary'>
        <Navbar />
      </header>
      <main className='container mt-3'>
        <Routes>
          <Route path={'/'} element={<PageContent />} />
          <Route path={'/pages/admin'} element={<PageForm />} />
          {pages.map((page) => (
            <Route path={'/pages/' + page} element={<PageContent />} key={page} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default App;