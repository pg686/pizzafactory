export const getPizzaDescription = (products) => {
  return Object.values(products)
    .reduce((acc, curr) => {
      const currentProducts = Object.entries(curr)
        .filter((item) => item[1].checked)
        .map((item) => item[0]);
      acc = [...acc, ...currentProducts];
      return acc;
    }, [])
    .join(", ");
};
