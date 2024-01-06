document.addEventListener("DOMContentLoaded", () => {
  const stepsContainer = document.getElementById("steps-container");
  let stepIndex = 1;

  stepsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-step")) {
      e.preventDefault();
      e.target.parentElement.remove();
    }
  });

  document.getElementById("add-step").addEventListener("click", (e) => {
    e.preventDefault();
    addStepField();
  });

  function addStepField() {
    const stepFieldSet = document.createElement("div");
    stepFieldSet.classList.add("field", "step-field");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = `説明 ${stepIndex + 1}`;
    descriptionLabel.className = "step-label";
    descriptionLabel.setAttribute("for", `steps_attributes_${stepIndex}_description`);

    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.name = `recipe_form[steps_attributes][${stepIndex}][description]`;
    descriptionTextArea.id = `steps_attributes_${stepIndex}_description`;
    descriptionTextArea.className = "step-textarea";

    const imageLabel = document.createElement("label");
    imageLabel.className = "image_input_btn step-image-label";
    imageLabel.innerHTML = `<img src="/path/to/camera.png" class="image_icon" style="width: 50px; height: 50px;"><span>画像を添付する</span>`;
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.name = `recipe_form[steps_attributes][${stepIndex}][image]`;
    imageInput.id = `steps_attributes_${stepIndex}_image`;
    imageInput.className = "step-image-input";
    imageInput.style.display = "none";
    imageLabel.appendChild(imageInput);

    imageLabel.addEventListener('click', function(event) {
      event.stopPropagation();
      imageInput.click();
    });

    imageInput.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        imageLabel.querySelector('span').textContent = `画像を添付する (${fileName})`;
      } else {
        imageLabel.querySelector('span').textContent = '画像を添付する';
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerText = "削除";
    deleteButton.className = "delete-step";

    stepFieldSet.appendChild(descriptionLabel);
    stepFieldSet.appendChild(descriptionTextArea);
    stepFieldSet.appendChild(imageLabel);
    stepFieldSet.appendChild(deleteButton);

    stepsContainer.appendChild(stepFieldSet);

    stepIndex++;
    return stepFieldSet;
  }
});
