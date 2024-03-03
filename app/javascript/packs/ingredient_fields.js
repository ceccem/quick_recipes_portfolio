document.addEventListener("DOMContentLoaded", () => {
  const ingredientsContainer = document.getElementById("ingredients-container");
  const addIngredientButton = document.getElementById("add-ingredient");

  const addIngredientField = () => {
    const ingredientFieldContainer = document.createElement("div");
    ingredientFieldContainer.classList.add("ingredient-field-container", "mb-3");

    const newIngredientField = document.createElement("input");
    newIngredientField.type = "text";
    newIngredientField.name = "recipe_form[ingredient_names][]";
    newIngredientField.classList.add("ingredient-name-field", "form-control");
    newIngredientField.placeholder = "食材名";

    const newQuantityField = document.createElement("input");
    newQuantityField.type = "text";
    newQuantityField.name = "recipe_form[ingredient_quantities][]";
    newQuantityField.classList.add("ingredient-quantity-field", "form-control");
    newQuantityField.placeholder = "分量";

    ingredientFieldContainer.appendChild(newIngredientField);
    ingredientFieldContainer.appendChild(newQuantityField);

    ingredientsContainer.appendChild(ingredientFieldContainer);
    addDeleteButton(ingredientFieldContainer);
  };

  const addDeleteButton = (fieldContainer) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-danger", "delete-ingredient-btn");
    deleteButton.onclick = () => fieldContainer.remove();
    fieldContainer.appendChild(deleteButton);
  };

  addIngredientButton.addEventListener("click", (e) => {
    e.preventDefault();
    addIngredientField();
  });
});
