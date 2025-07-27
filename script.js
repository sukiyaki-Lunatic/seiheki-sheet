const sliders = ["jitunennrei", "mitamenonennmei"];

sliders.forEach(id => {
  const slider = document.getElementById(id);
  const valueSpan = document.getElementById(id + "Value");
  const fillBar = document.getElementById(id + "Fill");

  function updateSlider() {
    const val = parseInt(slider.value, 10);
    const percent = ((val + 10) / 20) * 100;
    valueSpan.textContent = (val > 0 ? "+" : val < 0 ? "−" : "±") + Math.abs(val) + "歳";
    fillBar.style.width = percent + "%";
  }

  slider.addEventListener("input", updateSlider);
  updateSlider();
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const button = document.getElementById("downloadBtn");
  const slidersEls = sliders.map(id => document.getElementById(id));
  const bars = sliders.map(id => document.getElementById(id + "Bar"));

  // ボタンとスライダーを非表示、棒グラフは表示
  button.style.display = "none";
  slidersEls.forEach(el => el.style.display = "none");
  bars.forEach(bar => bar.style.display = "block");

  const element = document.body;
  const opt = {
    margin: 0.5,
    filename: "性癖シート.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    // 元に戻す
    button.style.display = "inline-block";
    slidersEls.forEach(el => el.style.display = "inline-block");
    bars.forEach(bar => bar.style.display = "none");
  });
});
