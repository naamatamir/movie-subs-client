import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet fallback={<div>No match</div>}/>
    </>
  );
};

export default Layout;
