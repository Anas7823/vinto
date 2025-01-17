import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './pages/ProductDetail';
import Filters from './components/Filters';
import Login from './pages/Login';
import Register from './pages/Register';
import NewsManagement from './pages/NewsManagement';
import ProductManagement from './pages/ProductManagement';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/news" element={
              <PrivateRoute>
                <NewsManagement />
              </PrivateRoute>
            } />
            <Route path="/admin/products" element={
              <PrivateRoute>
                <ProductManagement />
              </PrivateRoute>
            } />
            <Route path="/product/:id" element={
              <main className="flex-1">
                <ProductDetail />
              </main>
            } />
            <Route path="/" element={
              <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-6">
                  <aside className="w-64 flex-shrink-0">
                    <Filters />
                  </aside>
                  <div className="flex-1">
                    <ProductGrid />
                  </div>
                </div>
              </main>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;