export interface CocktailListResponse {
  drinks: CocktailListItem[];
}

export interface CocktailListItem {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export interface CocktailDetailResponse {
  drinks: CocktailDetail[];
}

export interface CocktailDetail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strInstructions: string;
  strDrinkThumb: string;
  strGlass: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
}
