'use client';

import { useEffect, useState } from 'react';
import { CocktailListItem } from './types/cocktail';
import CocktailCard from './components/CocktailCard';

export default function Home() {
  const [cocktails, setCocktails] = useState<CocktailListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cocktails')
      .then(res => res.json())
      .then(data => {
        setCocktails(data.drinks);
        setLoading(false);
      });
  }, []);

  const filteredCocktails = cocktails.filter(cocktail =>
    cocktail.strDrink.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cocktail Explorer</h1>
      
      <input
        type="text"
        placeholder="Search cocktails..."
        className="w-full max-w-md mb-8 px-4 py-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCocktails.map(cocktail => (
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      )}
    </div>
  );
}
