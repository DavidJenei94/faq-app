import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Main from './Main';

const MainWrapper = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default MainWrapper;
