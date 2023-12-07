import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import PageContent from './containers/PageContent/PageContent';
import { pages } from './constant';
import PageForm from './containers/PageForm/PageForm';

const App = () => {
  return (
    <>
      <header className='bg-body-secondary'>
        <Navbar />
      </header>
      <main className='container'>
        <Routes>
          <Route path={'/'} element={<PageContent />} />
          {pages.map((page) => {
            if (page === 'admin') {
              return (<Route path={'/pages/admin'} element={<PageForm />} key={page} />);
            } else {
              return (<Route key={page} path={'/pages/' + page} element={<PageContent />} />);
            }
          })}
        </Routes>
      </main>
    </>
  );
};

export default App;