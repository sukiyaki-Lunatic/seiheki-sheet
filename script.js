const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  const slider = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");

  // 初期値表示
  valueSpan.textContent = slider.value;

  // スライダー操作時に値を更新
  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value;
  });
});

// 年齢範囲スライダー (noUiSlider)
const ageRangeSlider = document.getElementById('ageRangeSlider');
const ageRangeValue = document.getElementById('ageRangeValue');

noUiSlider.create(ageRangeSlider, {
  start: [2, 5],
  connect: true,
  range: {
    min: 0,
    max: 10
  },
  step: 1,
  format: {
    to: value => Math.round(value),
    from: value => Number(value)
  }
});

ageRangeSlider.noUiSlider.on('update', (values) => {
  ageRangeValue.textContent = `${values[0]}〜${values[1]}`;
});

function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none";

  // 実年齢・見た目年齢 → バーに変換
  sliders.forEach(id => {
    const slider = document.getElementById(id);
    const bar = document.createElement("div");
    const percent = ((parseInt(slider.value) + 10) / 20) * 100;

    bar.className = "pdf-bar";
    bar.style.width = "100%";
    bar.innerHTML = `<div class="pdf-bar-fill" style="width: ${percent}%;"></div>`;

    slider.style.display = "none";
    slider.parentNode.insertBefore(bar, slider.nextSibling);
    slider.dataset._pdfBarId = id + "-pdf-bar";
    bar.id = slider.dataset._pdfBarId;
  });

  setTimeout(() => {
    const element = document.getElementById("sheetWrapper");
    const opt = {
      margin:       0.5,
      filename:     'seiheki_sheet.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // 元に戻す
      sliders.forEach(id => {
        const slider = document.getElementById(id);
        const bar = document.getElementById(slider.dataset._pdfBarId);
        if (bar) bar.remove();
        slider.style.display = "";
      });
      saveBtn.style.display = "block";
    });
  }, 100);
}
