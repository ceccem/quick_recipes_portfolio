document.addEventListener("DOMContentLoaded", () => {
  const stepsContainer = document.getElementById("steps-container");
  let stepIndex = stepsContainer.querySelectorAll(".step-field").length;

  const addStepButton = document.getElementById("add-step");
  addStepButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newField = addStepField();
    newField.querySelector(".step-textarea").focus();
  });

  let lastEnterPressTime = 0;
  stepsContainer.addEventListener("keydown", (e) => {
    if (e.target.matches(".step-textarea") && e.key === 'Enter') {
      e.preventDefault();
      const currentTime = new Date().getTime();

      if (currentTime - lastEnterPressTime <= 1000) {
        const newField = addStepField();
        newField.querySelector(".step-textarea").focus();
        lastEnterPressTime = 0;
      } else {
        lastEnterPressTime = currentTime;
      }
    }
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

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.name = `recipe_form[steps_attributes][${stepIndex}][image]`;
    imageInput.id = `steps_attributes_${stepIndex}_image`;
    imageInput.className = "step-image-input";
    imageInput.style.display = "none";

    const imageLabel = document.createElement("label");
    imageLabel.className = "image_input_btn step-image-label";
    imageLabel.appendChild(imageInput);
    imageLabel.innerHTML += `<img src="/assets/camera.png" class="image_icon" style="width: 50px; height: 50px;"><span>画像を添付する</span>`;

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

  stepsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-step")) {
      e.preventDefault();
      const stepField = e.target.closest(".step-field");
      stepField.remove();
      stepIndex--;
      updateStepLabels();
    }
  });

  function updateStepLabels() {
    stepsContainer.querySelectorAll(".step-label").forEach((label, index) => {
      label.textContent = `説明 ${index + 1}`;
    });
  }
});
