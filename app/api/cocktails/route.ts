import { getCachedData, setCachedData } from '@/lib/redis';
import { CocktailListResponse } from '@/app/types/cocktail';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cached = await getCachedData<CocktailListResponse>('cocktails');
    
    if (cached) {
      return NextResponse.json(cached);
    }

    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
    );
    const data: CocktailListResponse = await response.json();
    
    await setCachedData('cocktails', data);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cocktails' }, { status: 500 });
  }
}
