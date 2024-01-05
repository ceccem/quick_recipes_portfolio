document.addEventListener('turbolinks:load', () => {
  const fileInput = document.getElementById('image_upload');
  const label = document.querySelector('.image_input_btn');

  label.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const fileName = e.target.files[0].name;
    label.querySelector('span').textContent = `画像を添付する (${fileName})`;
  });
});
