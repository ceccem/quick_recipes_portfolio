document.addEventListener("DOMContentLoaded", () => {
  const addStepButton = document.getElementById("add-step");
  const stepsContainer = document.getElementById("steps-container");
  let stepIndex = 0;

  addStepButton.addEventListener("click", (e) => {
    e.preventDefault();

    const stepFieldSet = document.createElement("div");
    stepFieldSet.classList.add("field");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = `手順 ${stepIndex + 1}`;
    descriptionLabel.setAttribute("for", `steps_attributes_${stepIndex}_description`);

    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.setAttribute("name", `recipe_form[steps_attributes][${stepIndex}][description]`);
    descriptionTextArea.id = `steps_attributes_${stepIndex}_description`;

    const imageLabel = document.createElement("label");
    imageLabel.innerText = `画像 ${stepIndex + 1}`;
    imageLabel.setAttribute("for", `steps_attributes_${stepIndex}_image`);

    const imageInput = document.createElement("input");
    imageInput.setAttribute("type", "file");
    imageInput.setAttribute("name", `recipe_form[steps_attributes][${stepIndex}][image]`);
    imageInput.id = `steps_attributes_${stepIndex}_image`;

    stepFieldSet.appendChild(descriptionLabel);
    stepFieldSet.appendChild(descriptionTextArea);
    stepFieldSet.appendChild(imageLabel);
    stepFieldSet.appendChild(imageInput);

    stepsContainer.appendChild(stepFieldSet);

    stepIndex++;
  });
});
