import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { apiService } from '../services/api';

// Images statiques pour enrichir les données
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
  // ... gardez toutes vos images existantes ...
];

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiService.getAllProducts();
      // Enrichir les données avec des images et informations supplémentaires
      const enrichedProducts = data.map((product, index) => ({
        ...product,
        image: SAMPLE_IMAGES[index % SAMPLE_IMAGES.length],
        location: "France",
        seller: `Vendeur ${index + 1}`,
      }));
      setProducts(enrichedProducts);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Erreur: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Articles populaires</h2>
        <div className="flex gap-4">
          <select className="border rounded-lg px-3 py-2 text-sm text-gray-700">
            <option>Prix: Plus bas en premier</option>
            <option>Prix: Plus haut en premier</option>
            <option>Plus récents en premier</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="group">
            <Link to={`/product/${product._id}`} className="block">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
                <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-100">
                  <FiHeart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-100">
                  <FiShoppingBag className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-900">€{product.price}</p>
                </div>
                <h3 className="text-sm text-gray-700">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{product.seller}</span>
                  <span>{product.location}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;