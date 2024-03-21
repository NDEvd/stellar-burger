import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  let { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
