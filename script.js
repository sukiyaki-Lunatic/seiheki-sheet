const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  const slider = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");
  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value;
  });
});

function downloadPDF() {
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.display = "none"; // ボタンを一時的に非表示

  // 少し待ってPDF化（非表示が反映されるように）
  setTimeout(() => {
    const element = document.getElementById("seihekiForm");
    const opt = {
      margin:       0.5,
      filename:     'seiheki_sheet.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      saveBtn.style.display = "block"; // PDF保存後にボタンを戻す
    });
  }, 100);
}
