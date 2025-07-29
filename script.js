// 単一値スライダー生成
function createSingleSlider(id, label, min, max, step, initial) {
  const wrapper = document.getElementById(id + "-wrapper");
  wrapper.innerHTML = `
    <label for="${id}">${label}</label>
    <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${initial}">
    <span class="value-display" id="${id}Value">${initial}</span>
  `;

  const slider = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");
  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value;
  });
}

// 範囲スライダー生成（noUiSlider）
function createRangeSlider(id, label, min, max, step, startLow, startHigh) {
  const wrapper = document.getElementById(id + "-wrapper");
  wrapper.innerHTML = `
    <label for="${id}">${label}</label>
    <div class="noui-wrapper" id="${id}"></div>
    <span class="value-display" id="${id}Value"></span>
  `;

  const slider = document.getElementById(id);
  noUiSlider.create(slider, {
    start: [startLow, startHigh],
    connect: true,
    range: {
      min: min,
      max: max
    },
    step: step,
    tooltips: [false, false],
    format: {
      to: value => Math.round(value),
      from: value => Number(value)
    }
  });

  const valueSpan = document.getElementById(id + "Value");
  slider.noUiSlider.on("update", (values) => {
    valueSpan.textContent = `${values[0]} ~ ${values[1]}`;
  });
}

// PDF保存
function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none";

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
      saveBtn.style.display = "block";
    });
  }, 200);
}

// 初期スライダー作成
window.addEventListener("load", () => {
  createSingleSlider("jitunennrei", "実年齢", 0, 100, 1, 25);
  createSingleSlider("mitamenonennrei", "見た目年齢", 0, 100, 1, 20);
  createRangeSlider("nennrei", "好みの年齢範囲", 0, 100, 1, 2, 5);
});
