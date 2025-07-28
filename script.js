const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  const slider = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");
  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value;
  });
});

// noUiSlider 年齢スライダー
const ageSlider = document.getElementById('ageSlider');
noUiSlider.create(ageSlider, {
  start: [2, 5],
  connect: true,
  step: 1,
  range: {
    'min': 0,
    'max': 100
  },
  format: {
    to: value => Math.round(value),
    from: value => Number(value)
  }
});

const ageRangeValue = document.getElementById('ageRangeValue');
ageSlider.noUiSlider.on('update', (values) => {
  ageRangeValue.textContent = `${values[0]} ~ ${values[1]}`;
});

function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none";

  setTimeout(() => {
    const element = document.getElementById("seihekiForm");
    const opt = {
      margin: 0.5,
      filename: 'seiheki_sheet.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      saveBtn.style.display = "block";
    });
  }, 100);
}
