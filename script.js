const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  const slider = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");
  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value;
  });
});

// noUiSlider 年齢範囲スライダー
const nennreiSlider = document.getElementById("nennrei");
noUiSlider.create(nennreiSlider, {
  start: [2, 5],
  connect: true,
  range: {
    min: 0,
    max: 100
  },
  step: 1,
  tooltips: [true, true],
  format: {
    to: value => Math.round(value),
    from: value => Number(value)
  }
});

const nennreiValue = document.getElementById("nennreiValue");
nennreiSlider.noUiSlider.on("update", (values) => {
  nennreiValue.textContent = `${values[0]} ~ ${values[1]}`;
});

function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none"; // 一時非表示

  // PDF化処理
  setTimeout(() => {
    const element = document.getElementById("seihekiForm");
    const opt = {
      margin: 0.5,
      filename: 'seiheki_sheet.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      saveBtn.style.display = "block"; // 復元
    });
  }, 200);
}
