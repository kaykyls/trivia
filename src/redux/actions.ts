export const SET_CATEGORIES = 'SET_CATEGORIES';

export function setCategories(categories: Category[]) {
  return { type: SET_CATEGORIES, categories };
}