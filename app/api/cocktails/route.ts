import { getCachedData, setCachedData } from '@/lib/redis';
import { CocktailListResponse } from '@/app/types/cocktail';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '6');
    const search = searchParams.get('search') || '';

    const cacheKey = `cocktails:${search}`;
    const cached = await getCachedData<CocktailListResponse>(cacheKey);
    
    let drinks;
    if (cached) {
      drinks = cached.drinks;
    } else {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
      );
      const data: CocktailListResponse = await response.json();
      await setCachedData(cacheKey, data);
      drinks = data.drinks;
    }

    
    if (search) {
      drinks = drinks.filter(drink => 
        drink.strDrink.toLowerCase().includes(search.toLowerCase())
      );
    }

  
    const start = (page - 1) * perPage;
    const paginatedDrinks = drinks.slice(start, start + perPage);
    const total = drinks.length;

    return NextResponse.json({
      drinks: paginatedDrinks,
      total,
      hasMore: start + perPage < total
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cocktails' },
      { status: 500 }
    );
  }
}
