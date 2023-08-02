import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import LoginPage from '../pages/loginPage/LoginPage';
import CreateAccountPage from '../pages/createAccountPage/CreateAcoountPage';
import MenuPage from '../pages/MenuPage';
import MoviesPage from '../pages/moviesPage/MoviesPage';
import EditMoviePage from '../pages/editMoviePage/EditMoviePage';
import AddMoviePage from '../pages/addMoviePage/AddMoviePage';
import UsersPage from '../pages/usersPage/UsersPage';
import EditUserPage from '../pages/editUserPage/EditUserPage';
import AddUserPage from '../pages/addUserPage/AddUserPage';
import MembersPage from '../pages/membersPage/MembersPage';
import EditMemberPage from '../pages/editMemberPage/EditMemberPage';
import AddMemberPage from '../pages/addMemberPage/AddMemberPage';

const AppRoutes = ({ isAuthenticated }) => (
  <Routes>
    {!isAuthenticated ? (
      <Route path='/' element={<LoginPage />} />
    ) : (
      <Route path='/' element={<MenuPage />} />
    )}

    <Route path='login' element={<LoginPage />} />
    <Route path='register' element={<CreateAccountPage />} />
    <Route path='menu' element={<MenuPage />} />

    <Route path='/*' element={<Layout isAuthenticated={isAuthenticated} />}>
      <Route path='movies/*' element={<Outlet />}>
        <Route index element={<MoviesPage />} />
        <Route path='add' element={<AddMoviePage />} />
        <Route path=':id/edit' element={<EditMoviePage />} />
      </Route>

      <Route path='users/*' element={<Outlet />}>
        <Route index element={<UsersPage />} />
        <Route path='add' element={<AddUserPage />} />
        <Route path=':id/edit' element={<EditUserPage />} />
      </Route>

      <Route path='members/*' element={<Outlet />}>
        <Route index element={<MembersPage />} />
        <Route path='add' element={<AddMemberPage />} />
        <Route path=':id/edit' element={<EditMemberPage />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
