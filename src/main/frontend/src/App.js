import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // AuthProvider import

import ScrollToTop from './ScrollToTop';
import Home from './components/Main';
import Test from './components/test/Test';
import GameDetailPage from './components/GameDetailPage';
import SignupForm from "./components/SignupForm";
import SearchResults from "./components/SearchResults";
import UserReviews from './components/UserReviews';

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider> {/* AuthProvider를 사용하여 로그인 상태를 전역으로 관리 */}
            <Routes>
              <Route path={'/'} element={<Home />}></Route>
              <Route path={'/test'} element={<Test />}></Route>
              <Route path='/game/:gameId' element={<GameDetailPage />}></Route>
              <Route path={'/signup'} element={<SignupForm />}></Route>
              <Route path="/search" element={<SearchResults />} />
              <Route path="/user-reviews/:userId" element={<UserReviews />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
