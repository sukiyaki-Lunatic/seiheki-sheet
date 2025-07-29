// 共通スライダー作成関数（単一値）
function createSingleSlider(id, min = -10, max = 10, start = 0) {
  const target = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");

  noUiSlider.create(target, {
    start: start,
    connect: [true, false],
    range: {
      min: min,
      max: max
    },
    step: 1,
    tooltips: false,
    format: {
      to: value => Math.round(value),
      from: value => Number(value)
    }
  });

  target.noUiSlider.on("update", (values) => {
    valueSpan.textContent = values[0];
  });
}

// 実年齢・見た目の年齢スライダー作成
createSingleSlider("jitunennrei", -10, 10, 0);
createSingleSlider("mitamenonennrei", -10, 10, 0);

// 年齢範囲スライダー
const nennreiSlider = document.getElementById("nennrei");
noUiSlider.create(nennreiSlider, {
  start: [2, 5],
  connect: true,
  range: {
    min: 0,
    max: 100
  },
  step: 1,
  tooltips: [false, true],
  format: {
    to: value => Math.round(value),
    from: value => Number(value)
  }
});
const nennreiValue = document.getElementById("nennreiValue");
nennreiSlider.noUiSlider.on("update", (values) => {
  nennreiValue.textContent = `${values[0]} ~ ${values[1]}`;
});

// PDF保存処理
function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none"; // 一時非表示

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
  }, 300);
}
