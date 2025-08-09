import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function setCategories(categoriesArray) {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
}