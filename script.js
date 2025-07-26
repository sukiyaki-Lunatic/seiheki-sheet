const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  document.getElementById(id).addEventListener("input", function () {
    document.getElementById(id + "Value").textContent = this.value;
  });
});


function downloadPDF() {
  alert("PDF出力機能はまだ実装されていません（html2pdf.jsなどを使って実装可能）");
}
