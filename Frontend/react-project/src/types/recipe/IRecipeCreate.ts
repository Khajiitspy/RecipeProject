export interface IRecipeCreate {
  name: string;
  slug: string;
  instruction: string;
  image?: File | null;
  categoryId: number;
  ingredientsJson: string; // JSON.stringify([...])
}
