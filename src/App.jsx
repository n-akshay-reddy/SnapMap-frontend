import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MainNavigation from './shared/shared-components/Navigation/MainNavigation.jsx';
import Users from './users/users-pages/User';
import NewPlace from './places/places-pages/NewPlace.jsx';
import UserPlace from './places/places-pages/UserPlaces.jsx';
import UpdatePlace from './places/places-pages/UpdatePlace.jsx';
import Authentication from './users/users-pages/Auth';
import LokiAi from './LokiAi/LokiAI.jsx';
import { AuthContext } from './shared/shared-components/Context/auth-context.jsx';
import { useAuth } from './shared/hooks/auth-hook.js';

const App = () => {

  

  const {token, login, logout, userId} = useAuth();
  
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlace />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:pid" element={<UpdatePlace />} />
        <Route path="lokiai" element={<LokiAi/>} />
        <Route path="*" element={<Navigate to="/" />} />
      
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlace />} />
        <Route path="/authenticate" element={<Authentication />} />
        <Route path="lokiai" element={<LokiAi/>} />
        <Route path="*" element={<Navigate to="/authenticate" />} />
      </Routes>
    );
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token,token: token , login: login, logout: logout, userId:userId }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
