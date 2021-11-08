export interface Recipes {
  title: string;
  publisher: string;
  source_url: string;
  recipe_id: string;
  image_url: string;
  social_rank: number;
  publisher_url: string;
  time: string;
}

export interface Recipe {
  title: string;
  publisher: string;
  source_url: string;
  recipe_id: string;
  image_url: string;
  social_rank: number;
  publisher_url: string;
  ingredients: string[];
  id: string;
}
export type RootStackParamList = {
  Home: undefined;
  Recipe: { operation: Recipes[] };
};
