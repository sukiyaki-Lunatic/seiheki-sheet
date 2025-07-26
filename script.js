document.getElementById("kemomimi").addEventListener("input", function () {
  document.getElementById("kemomimiValue").textContent = this.value;
});

function downloadPDF() {
  alert("PDF出力機能はまだ実装されていません（html2pdf.jsなどを使って実装可能）");
}
