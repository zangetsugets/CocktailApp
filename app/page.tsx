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
    <div className="min-h-screen container mx-auto max-w-[1200px] px-4 py-[var(--spacing-lg)]">
      <header className="text-center mb-[var(--spacing-xl)] max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Cocktail Explorer
        </h1>
      </header>

      <div className="max-w-2xl mx-auto mb-[var(--spacing-xl)] flex justify-center">
        <input
          type="text"
          placeholder="Search cocktails..."
          className="w-full max-w-xl px-6 py-4 border border-[var(--input-border)]
                     rounded-full bg-[var(--card-background)] shadow-[var(--input-shadow)]
                     text-lg placeholder:text-[var(--foreground)]/60
                     focus:outline-none focus:border-[var(--input-focus-border)]
                     focus:shadow-[var(--input-focus-shadow)]
                     transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-[var(--spacing-lg)]">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {filteredCocktails.map(cocktail => (
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      )}
    </div>
  );
}
