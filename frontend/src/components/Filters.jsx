import React from 'react';
import { Disclosure } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';

const filters = [
  {
    id: 'category',
    name: 'Catégorie',
    options: ['Femmes', 'Hommes', 'Enfants', 'Maison', 'Divertissement', 'Animaux', 'Sport', 'Cosmétiques']
  },
  {
    id: 'brand',
    name: 'Marque',
    options: ['Nike', 'Adidas', 'Zara', "Levi's", 'H&M', 'Mango', 'Uniqlo', 'The North Face', 'Vans', 'Converse']
  },
  {
    id: 'size',
    name: 'Taille',
    options: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40', '41', '42', '43', '44']
  },
  {
    id: 'condition',
    name: 'État',
    options: ['Neuf avec étiquette', 'Très bon état', 'Bon état', 'Satisfaisant', 'À customiser']
  },
  {
    id: 'color',
    name: 'Couleur',
    options: ['Noir', 'Blanc', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Rose', 'Violet', 'Marron', 'Gris']
  },
  {
    id: 'price',
    name: 'Prix',
    options: ['Moins de 5€', '5€ - 10€', '10€ - 20€', '20€ - 50€', '50€ - 100€', 'Plus de 100€']
  },
  {
    id: 'location',
    name: 'Lieu',
    options: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier']
  }
];

function Filters() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
        <button className="text-sm text-teal-600 hover:text-teal-700">
          Réinitialiser
        </button>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900">Fourchette de prix</p>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-lg border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full rounded-lg border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-t border-gray-200 py-4">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between text-gray-400 hover:text-gray-500">
                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                <FiChevronDown
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={optionIdx} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default Filters;