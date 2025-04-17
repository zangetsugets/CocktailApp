import Image from 'next/image';
import Link from 'next/link';
import { CocktailListItem } from '../types/cocktail';

export default function CocktailCard({ cocktail }: { cocktail: CocktailListItem }) {
  return (
    <Link href={`/cocktail/${cocktail.idDrink}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>
        <div className="p-4 bg-[var(--card-background)]">
          <h2 className="text-lg font-semibold truncate">{cocktail.strDrink}</h2>
        </div>
      </div>
    </Link>
  );
}
