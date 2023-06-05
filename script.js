document.addEventListener('DOMContentLoaded', function() {
  const shape = document.querySelector('.shape');
  const fillSlider = document.querySelector('#fillSlider');
  const complexitySlider = document.querySelector('#complexitySlider');
  const fillValue = document.querySelector('#fillValue');
  const complexityValue = document.querySelector('#complexityValue');
  const colorPicker = document.querySelector('#colorPicker');
  const generateImageButton = document.querySelector('#generateImageButton');
  const outputImage = document.querySelector('#outputImage');
  const errorMessage = document.querySelector('#errorMessage');
  
  function updateShape() {
    const radius = shape.offsetWidth / 2;
    const centerRadius = 12;
    const fillLevel = fillSlider.value / 100;
    const segmentCount = complexitySlider.value;
    const color = colorPicker.value;
    let shapePath = '';

    for (let i = 0; i < segmentCount; i++) {
      const angle = (i / segmentCount) * Math.PI * 2;
      const x = Math.cos(angle) * (radius * fillLevel);
      const y = Math.sin(angle) * (radius * fillLevel);

      shapePath += `${x + radius}px ${y + radius}px,`;
    }

    shape.style.backgroundImage = `radial-gradient(circle at center, transparent ${centerRadius}px, ${color} ${radius * fillLevel}px)`;
    shape.style.clipPath = `polygon(${shapePath})`;
  }

  function updateSliderValues() {
    fillValue.textContent = fillSlider.value;
    complexityValue.textContent = complexitySlider.value;
  }

  function generateImage() {
    html2canvas(shape)
      .then(function(canvas) {
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'forme.png';
        link.click();
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

  colorPicker.addEventListener('input', function() {
    updateShape();
  });

  generateImageButton.addEventListener('click', function() {
    errorMessage.textContent = '';
    generateImage();
  });

  updateShape();
  updateSliderValues();
});
