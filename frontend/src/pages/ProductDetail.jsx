import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { apiService } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiService.getProductById(id);
        setProduct({
          ...data,
          seller: {
            name: data.author?.name || "Vendeur anonyme",
            rating: 4.5,
            memberSince: new Date(data.createdAt).getFullYear()
          }
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Erreur: {error}</div>;
  if (!product) return <div className="text-center py-4">Produit non trouvé</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Images */}
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image || "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=800&fit=crop"}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Informations produit */}
        <div className="mt-8 lg:mt-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <p className="mt-1 text-3xl text-gray-900">€{product.price}</p>
            </div>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FiHeart className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Caractéristiques principales */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-medium text-gray-900">Caractéristiques</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Marque</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taille</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">État</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.condition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Couleur</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Matière</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.material}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.location}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <div className="mt-4 prose prose-sm text-gray-500">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Vendeur */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{product.seller.name}</h2>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-500">
                    {product.seller.rating} / 5 - Membre depuis {product.seller.memberSince}
                  </span>
                </div>
              </div>
              <button className="text-sm font-medium text-teal-600 hover:text-teal-500">
                Voir le profil
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex space-x-4">
              <button className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 flex items-center justify-center">
                <FiShoppingBag className="w-5 h-5 mr-2" />
                Acheter
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">
                Faire une offre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 