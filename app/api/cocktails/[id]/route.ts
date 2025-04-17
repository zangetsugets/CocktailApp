import { getCachedData, setCachedData } from '@/lib/redis';
import { CocktailDetailResponse } from '@/app/types/cocktail';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const cacheKey = `cocktail:${id}`;
    
   
    const cached = await getCachedData<CocktailDetailResponse>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

   
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data: CocktailDetailResponse = await response.json();
    
 
    await setCachedData(cacheKey, data);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cocktail details' },
      { status: 500 }
    );
  }
}
