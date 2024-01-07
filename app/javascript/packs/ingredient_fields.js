document.addEventListener("DOMContentLoaded", () => {
  const ingredientsContainer = document.getElementById("ingredients-container");
  const addIngredientButton = document.getElementById("add-ingredient");

  // エンターキーを2回押すと新しい食材入力欄を追加する機能を全ての食材入力欄に適用する関数
  const applyDoubleEnterToAddField = (field) => {
    let lastEnterPressTime = 0;

    field.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const currentTime = new Date().getTime();
        if (currentTime - lastEnterPressTime <= 500) {
          const newField = addIngredientField();
          newField.focus();
        }
        lastEnterPressTime = currentTime;
      }
    });
  };

  // 既存の全ての食材入力欄に上記の機能を適用
  document.querySelectorAll(".ingredient-name-field").forEach(applyDoubleEnterToAddField);

  // '食材を追加'ボタンのイベントリスナー
  addIngredientButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newField = addIngredientField();
    newField.focus();
  });

  // 新しい食材入力欄を追加する関数
  function addIngredientField() {
    const newField = document.createElement("input");
    newField.type = "text";
    newField.name = "recipe_form[ingredient_names][]";
    newField.classList.add("ingredient-name-field");
    applyDoubleEnterToAddField(newField); // 新しいフィールドにも2回エンターの機能を適用
    ingredientsContainer.appendChild(newField);
    addDeleteButton(newField);
    return newField;
  }

  // 削除ボタンを追加する関数
  function addDeleteButton(field) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "削除";
    deleteButton.classList.add("delete-ingredient");
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      field.remove();
      deleteButton.remove();
    });
    field.parentNode.insertBefore(deleteButton, field.nextSibling);
  }
});
