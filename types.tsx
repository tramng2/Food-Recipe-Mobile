export interface Recipes {
  title: string;
  source_url: string;
  recipe_id: string;
  image_url: string;
  social_rank: number;
  publisher_url: string;
  time: string;
}
export type RootStackParamList = {
  Home: undefined;
  Recipe: { operation: Recipes[] };
};
