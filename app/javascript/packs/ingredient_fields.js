document.addEventListener("DOMContentLoaded", () => {
  const addIngredientButton = document.getElementById("add-ingredient");
  const ingredientsContainer = document.getElementById("ingredients-container");

  addIngredientButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newField = document.createElement("input");
    newField.setAttribute("type", "text");
    newField.setAttribute("name", "recipe_form[ingredient_names][]");
    ingredientsContainer.appendChild(newField);
  });
});
