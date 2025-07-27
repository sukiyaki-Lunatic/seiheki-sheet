const sliders = ["jitunennrei", "mitamenonennrei"];

sliders.forEach(id => {
  document.getElementById(id).addEventListener("input", function () {
    document.getElementById(id + "Value").textContent = this.value;
  });
});

function downloadPDF() {
  const element = document.getElementById("seihekiForm");
  const opt = {
    margin:       0.5,
    filename:     '性癖シート.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
