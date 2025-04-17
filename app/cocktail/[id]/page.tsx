'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CocktailDetail } from '@/app/types/cocktail';

export default function CocktailDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [cocktail, setCocktail] = useState<CocktailDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/cocktails/${id}`)
      .then(res => res.json())
      .then(data => {
        setCocktail(data.drinks[0]);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-[var(--spacing-lg)]">Loading...</div>;
  }

  if (!cocktail) {
    return <div className="text-center py-[var(--spacing-lg)]">Cocktail not found</div>;
  }

  const ingredients = Array.from({ length: 15 }, (_, i) => i + 1)
    .map(i => ({
      ingredient: cocktail[`strIngredient${i}` as keyof CocktailDetail],
      measure: cocktail[`strMeasure${i}` as keyof CocktailDetail]
    }))
    .filter(({ ingredient }) => ingredient);

  return (
    <div className="min-h-screen max-w-[1200px] mx-auto px-5 py-[var(--spacing-lg)]">
      <Link 
        href="/"
        className="inline-block mb-8 text-[var(--foreground)] hover:opacity-80"
      >
        ← Back to cocktails
      </Link>

      <div className="flex flex-wrap gap-8">
        <div className="flex-1 min-w-[300px]">
          <div className="relative aspect-[530/600] w-full max-w-[530px]">
            <Image
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              fill
              className="object-cover rounded"
              priority
            />
          </div>
        </div>
        
        <div className="flex-[1.5] min-w-[300px]">
          <h1 className="text-[4.5rem] leading-tight font-normal text-[#9b9e8e] mb-4 md:text-[3rem]">
            {cocktail.strDrink}
          </h1>
          
          <div className="flex items-center text-[#9b9e8e] mb-6">
            <Image 
              src="/search_icon.svg"
              alt="Drink type"
              width={20}
              height={20}
              className="text-[var(--icon-color)]"
            />
            <span className="ml-2 text-lg">{cocktail.strCategory}</span>
          </div>
          
          <p className="text-lg leading-relaxed text-[#555] mb-6">
            {cocktail.strInstructions}
          </p>
          
          <table className="w-full border-collapse my-8">
            <thead>
              <tr>
                <th className="text-left text-lg font-normal text-[#9b9e8e] pb-2">Ingredient</th>
                <th className="text-left text-lg font-normal text-[#9b9e8e] pb-2">Measure</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map(({ ingredient, measure }, index) => (
                <tr key={index}>
                  <td className="py-3 border-t border-b border-[#e5e5e5]">{ingredient}</td>
                  <td className="py-3 border-t border-b border-[#e5e5e5]">{measure || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex items-center text-[#9b9e8e] mt-5">
            <Image 
              src="/glass_icon.svg"
              alt="Glass type"
              width={24}
              height={24}
              className="text-[var(--icon-color)]"
            />
            <span className="ml-2">{cocktail.strGlass}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
