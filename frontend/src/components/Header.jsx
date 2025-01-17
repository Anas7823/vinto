import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top banner */}
        <div className="bg-teal-500 text-white text-center text-sm py-2 px-4">
          Frais de port offerts dès 50€ d'achats !
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500">
                <FiMenu className="h-6 w-6" />
              </button>
              <Link to="/" className="text-2xl font-bold text-teal-500 ml-2 lg:ml-0">
                Vinted
              </Link>
              <div className="hidden lg:ml-10 lg:flex">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher des articles"
                    className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 lg:space-x-6">
              {user && (
                <>
                  <Link
                    to="/admin/products"
                    className="hidden lg:block text-sm text-gray-700 hover:text-teal-500"
                  >
                    Gestion Produits
                  </Link>
                  <Link
                    to="/admin/news"
                    className="hidden lg:block text-sm text-gray-700 hover:text-teal-500"
                  >
                    Gestion Actualités
                  </Link>
                </>
              )}
              
              <button className="hidden lg:block px-6 py-2 text-sm font-medium text-white bg-teal-500 rounded-full hover:bg-teal-600 transition-colors">
                Vends maintenant
              </button>
              <button className="lg:hidden px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-full hover:bg-teal-600">
                Vendre
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FiHeart className="w-6 h-6" />
              </button>
              <div className="relative">
                <button 
                  className="p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <FiUser className="w-6 h-6" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          {user.name}
                        </div>
                        <Link
                          to="/admin/products"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Gestion des produits
                        </Link>
                        <Link
                          to="/admin/news"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Gestion des actualités
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <FiLogOut className="mr-2" />
                            Se déconnecter
                          </div>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Se connecter
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          S'inscrire
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <FiShoppingBag className="w-6 h-6" />
                <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-teal-500 text-white rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories navigation */}
        <nav className="hidden lg:block border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 py-3">
              <Link to="/femmes" className="text-sm text-gray-700 hover:text-teal-500">Femmes</Link>
              <Link to="/hommes" className="text-sm text-gray-700 hover:text-teal-500">Hommes</Link>
              <Link to="/enfants" className="text-sm text-gray-700 hover:text-teal-500">Enfants</Link>
              <Link to="/maison" className="text-sm text-gray-700 hover:text-teal-500">Maison</Link>
              <Link to="/divertissement" className="text-sm text-gray-700 hover:text-teal-500">Divertissement</Link>
              <Link to="/animaux" className="text-sm text-gray-700 hover:text-teal-500">Animaux</Link>
              <Link to="/sport" className="text-sm text-gray-700 hover:text-teal-500">Sport</Link>
              <Link to="/cosmetiques" className="text-sm text-gray-700 hover:text-teal-500">Cosmétiques</Link>
            </div>
          </div>
        </nav>

        {/* Mobile search */}
        <div className="lg:hidden border-t px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher des articles"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;