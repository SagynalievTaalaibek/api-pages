import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <header className="bg-body-secondary">
        <Navbar/>
      </header>
      <main className="container">
        <Routes>
          <Route />
        </Routes>
      </main>
    </>
  );
};

export default App;