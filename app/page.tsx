'use client';

import { useEffect, useState } from 'react';
import { CocktailListItem } from './types/cocktail';
import CocktailCard from './components/CocktailCard';

const ITEMS_PER_PAGE = 6;

interface PaginatedResponse {
  drinks: CocktailListItem[];
  total: number;
  hasMore: boolean;
}

export default function Home() {
  const [cocktails, setCocktails] = useState<CocktailListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchCocktails = async (page: number, search: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: ITEMS_PER_PAGE.toString(),
      ...(search && { search })
    });

    const response = await fetch(`/api/cocktails?${params}`);
    const data: PaginatedResponse = await response.json();
    
    if (page === 1) {
      setCocktails(data.drinks);
    } else {
      setCocktails(prev => [...prev, ...data.drinks]);
    }
    setHasMore(data.hasMore);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchCocktails(1, searchTerm);
  }, [searchTerm]);

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCocktails(nextPage, searchTerm);
  };

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

      {loading && currentPage === 1 ? (
        <div className="text-center py-[var(--spacing-lg)]">Loading...</div>
      ) : cocktails.length === 0 ? (
        <div className="text-center py-[var(--spacing-lg)] text-[var(--foreground)] opacity-75">
          No cocktails found matching "{searchTerm}"
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto w-full">
            {cocktails.map(cocktail => (
              <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
          </div>
          
          {hasMore && (
            <button
              onClick={loadMore}
              className="mt-8 px-6 py-3 bg-[var(--card-background)] border border-[var(--input-border)]
                       rounded-full shadow-[var(--input-shadow)] hover:shadow-[var(--card-hover-shadow)]
                       transition-all duration-300 text-[var(--foreground)]"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
