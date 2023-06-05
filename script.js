document.addEventListener('DOMContentLoaded', function() {
  const shape = document.querySelector('.shape');
  const fillSlider = document.querySelector('#fillSlider');
  const complexitySlider = document.querySelector('#complexitySlider');
  const fillValue = document.querySelector('#fillValue');
  const complexityValue = document.querySelector('#complexityValue');
  const generateImageButton = document.querySelector('#generateImageButton');
  const outputImage = document.querySelector('#outputImage');
  const errorMessage = document.querySelector('#errorMessage');

  function updateShape() {
    const fillPercentage = fillSlider.value;
    const complexity = complexitySlider.value;

    const radius = shape.offsetWidth / 2;
    const centerRadius = 12;
    const innerRadius = radius - centerRadius;

    const fillLevel = (100 - fillPercentage) / 100;

    const segmentCount = Math.floor(complexity) * 10;

    let shapePath = '';
    for (let i = 0; i <= segmentCount; i++) {
      const angle = (i / segmentCount) * Math.PI * 2;
      const x = Math.cos(angle) * innerRadius;
      const y = Math.sin(angle) * innerRadius;

      shapePath += `${x + radius}px ${y + radius}px,`;
    }

    shape.style.backgroundImage = `radial-gradient(circle at center, transparent ${centerRadius}px, #ccc ${innerRadius}px)`;
    shape.style.clipPath = `polygon(${shapePath})`;
  }

  function updateSliderValues() {
    fillValue.textContent = fillSlider.value;
    complexityValue.textContent = complexitySlider.value;
  }

  function generateImage() {
    html2canvas(shape)
      .then(function(canvas) {
        const imageUrl = canvas.toDataURL();
        outputImage.innerHTML = '<img src="' + imageUrl + '">';
      })
      .catch(function(error) {
        errorMessage.textContent = "Une erreur s'est produite lors de la génération de l'image.";
      });
  }

  fillSlider.addEventListener('input', function() {
    updateShape();
    updateSliderValues();
  });

  complexitySlider.addEventListener('input', function() {
    updateShape();
    updateSliderValues();
  });

  generateImageButton.addEventListener('click', function() {
    errorMessage.textContent = '';
    generateImage();
  });

  updateShape();
  updateSliderValues();
});
