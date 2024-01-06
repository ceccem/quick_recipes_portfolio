document.addEventListener('turbolinks:load', () => {
  // すべての画像アップロードボタンを取得する
  const imageLabels = document.querySelectorAll('.image_input_btn');

  // 各画像アップロードボタンに対してイベントリスナーを設定する
  imageLabels.forEach(label => {
    const fileInput = label.querySelector('input[type="file"]');
    label.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const fileName = e.target.files[0].name;
      label.querySelector('span').textContent = `画像を添付する (${fileName})`;
    });
  });
});
