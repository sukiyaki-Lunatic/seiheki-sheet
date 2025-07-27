const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  document.getElementById(id).addEventListener("input", function () {
    document.getElementById(id + "Value").textContent = this.value;
  });
});

function downloadPDF() {
  const button = document.querySelector("button");
  button.style.display = "none"; // ボタンを非表示にする

  const element = document.body;

  const opt = {
    margin:       0.5,
    filename:     'seiheki-sheet.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    button.style.display = "inline-block"; // PDF保存後に再表示
  });
}
