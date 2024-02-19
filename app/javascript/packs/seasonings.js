document.addEventListener('turbolinks:load', () => {
  document.querySelectorAll('.seasoning input[type=checkbox]').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
      const quantityInput = document.getElementById(`quantity_for_seasoning_${this.value}`);
      if (this.checked) {
        quantityInput.style.display = 'inline'; // または 'block'
      } else {
        quantityInput.style.display = 'none';
      }
    });
  });
});
