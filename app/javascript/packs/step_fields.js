document.addEventListener("DOMContentLoaded", () => {
  const stepsContainer = document.getElementById("steps-container");
  let stepIndex = 1; // 既存の手順が0から始まるため、1から始める
  let lastEnterPressTime = 0;

  // キーボードイベントハンドラー
  stepsContainer.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentTime = new Date().getTime();

      if (currentTime - lastEnterPressTime <= 1000) { // エンターキーが2回連続で押された場合
        const newField = addStepField();
        newField.querySelector("textarea").focus(); // 新しいフィールドのテキストエリアにフォーカスを移動
        lastEnterPressTime = 0;
      } else {
        lastEnterPressTime = currentTime;
      }
    }
  });

  // 削除ボタンクリックイベントハンドラー
  stepsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-step")) {
      e.preventDefault();
      e.target.parentElement.remove();
    }
  });

  // 手順追加ボタンのクリックイベントハンドラー
  document.getElementById("add-step").addEventListener("click", (e) => {
    e.preventDefault();
    addStepField();
  });

  // 手順フィールドを追加する関数
  function addStepField() {
    const stepFieldSet = document.createElement("div");
    stepFieldSet.classList.add("field");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = `手順 ${stepIndex + 1}`;
    descriptionLabel.setAttribute("for", `steps_attributes_${stepIndex}_description`);

    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.setAttribute("name", `recipe_form[steps_attributes][${stepIndex}][description]`);
    descriptionTextArea.id = `steps_attributes_${stepIndex}_description`;

    // 画像アップロードフィールドの作成
    const imageLabel = document.createElement("label");
    imageLabel.classList.add("image_input_btn", "step-image-label");

    const imageIcon = document.createElement("img");
    imageIcon.src = "/path/to/camera.png"; // カメラアイコンのパスを設定
    imageIcon.classList.add("image_icon");
    imageIcon.style.width = "50px";
    imageIcon.style.height = "50px";

    const spanText = document.createElement("span");
    spanText.innerText = "画像を添付する";

    const imageInput = document.createElement("input");
    imageInput.setAttribute("type", "file");
    imageInput.setAttribute("name", `recipe_form[steps_attributes][${stepIndex}][image]`);
    imageInput.id = `steps_attributes_${stepIndex}_image`;
    imageInput.classList.add("step-image-input");

    imageLabel.appendChild(imageIcon);
    imageLabel.appendChild(spanText);
    imageLabel.appendChild(imageInput);

    stepFieldSet.appendChild(descriptionLabel);
    stepFieldSet.appendChild(descriptionTextArea);
    stepFieldSet.appendChild(imageLabel);

    // 削除ボタンの作成
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-step");
    deleteButton.innerText = "削除";
    stepFieldSet.appendChild(deleteButton);

    stepsContainer.appendChild(stepFieldSet);
    stepIndex++;
    return stepFieldSet;
  }
});
