const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  const slider = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");
  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value;
  });
});

// 範囲スライダー追加関数
function createRangeSlider(id, start, min, max, step = 1) {
  const element = document.getElementById(id);
  noUiSlider.create(element, {
    start: start,
    connect: true,
    range: { min: min, max: max },
    step: step,
    tooltips: false, // ツールチップを無効
    format: {
      to: value => Math.round(value),
      from: value => Number(value)
    }
  });
  return element;
}

// 年齢範囲スライダー初期化
const nennreiSlider = createRangeSlider("nennrei", [2, 5], 0, 100);
const nennreiValue = document.getElementById("nennreiValue");
nennreiSlider.noUiSlider.on("update", (values) => {
  nennreiValue.textContent = `${values[0]} ~ ${values[1]}`;
});

// PDF出力
function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none"; // ボタンを一時非表示

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
