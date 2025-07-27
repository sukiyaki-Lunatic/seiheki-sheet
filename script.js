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

function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none"; // ボタンを一時的に非表示

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
      saveBtn.style.display = "block"; // 元に戻す
    });
  }, 100);
}
