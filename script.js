function createSingleSlider(id, label, min, max, step, initial) {
  const wrapper = document.getElementById(id + "-wrapper");
  wrapper.innerHTML = `
    <label for="${id}">${label}</label>
    <div class="noui-wrapper" id="${id}"></div>
    <span class="value-display" id="${id}Value">${initial}</span>
  `;

  const slider = document.getElementById(id);
  noUiSlider.create(slider, {
    start: [initial],
    connect: [true, false],
    range: { min, max },
    step,
    tooltips: false,
    format: {
      to: value => Math.round(value),
      from: value => Number(value)
    }
  });

  const valueSpan = document.getElementById(id + "Value");
  slider.noUiSlider.on("update", (values) => {
    valueSpan.textContent = values[0];
  });
}

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
    range: { min, max },
    step,
    tooltips: false,
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

function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none";

  // スライダーのハンドルを非表示
  const handles = document.querySelectorAll('.noUi-handle');
  handles.forEach(handle => {
    handle.style.opacity = '0';
    handle.style.pointerEvents = 'none';
  });

  // 名前入力欄の見た目を下線だけに変更
  const textInputs = document.querySelectorAll('.text-input');
  const originalStyles = [];
  textInputs.forEach(input => {
    originalStyles.push({
      element: input,
      style: input.getAttribute("style") // 元のインラインスタイルを保存
    });

    input.style.border = "none";
    input.style.borderBottom = "1px solid #000";
    input.style.borderRadius = "0";
    input.style.paddingLeft = "0";
    input.style.paddingRight = "0";
    input.style.background = "transparent";
  });

  setTimeout(() => {
    const element = document.getElementById("pdfArea");
    const opt = {
      margin: 0.5,
      filename: 'seiheki_sheet.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // スライダーハンドル復元
      handles.forEach(handle => {
        handle.style.opacity = '1';
        handle.style.pointerEvents = 'auto';
      });

      // 名前入力欄のスタイルを元に戻す
      originalStyles.forEach(({ element, style }) => {
        if (style !== null) {
          element.setAttribute("style", style);
        } else {
          element.removeAttribute("style");
        }
      });

      saveBtn.style.display = "block";
    });
  }, 200);
}

window.addEventListener("load", () => {
  createSingleSlider("jitunennrei", "実年齢", 0, 100, 1, 25);
  createSingleSlider("mitamenonennrei", "見た目年齢", 0, 100, 1, 20);
  createRangeSlider("nennrei", "好みの年齢範囲", 0, 100, 1, 2, 5);
});
