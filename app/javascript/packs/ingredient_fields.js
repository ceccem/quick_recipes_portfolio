document.addEventListener("DOMContentLoaded", () => {
  const ingredientsContainer = document.getElementById("ingredients-container");
  let lastEnterPressTime = 0;

  // 既存のフィールドに削除ボタンを追加
  document.querySelectorAll("input[name='recipe_form[ingredient_names][]']").forEach(field => {
    addDeleteButton(field);
  });

  ingredientsContainer.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentTime = new Date().getTime();

      if (currentTime - lastEnterPressTime <= 1000) {
        const newField = addIngredientField();
        newField.focus();
        lastEnterPressTime = 0;
      } else {
        lastEnterPressTime = currentTime;
      }
    }
  });

  function addIngredientField() {
    const newField = document.createElement("input");
    newField.setAttribute("type", "text");
    newField.setAttribute("name", "recipe_form[ingredient_names][]");
    ingredientsContainer.appendChild(newField);
    addDeleteButton(newField);
    return newField;
  }

  function addDeleteButton(field) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      field.remove();
      deleteButton.remove();
    });
    field.parentNode.insertBefore(deleteButton, field.nextSibling);
  }
});
