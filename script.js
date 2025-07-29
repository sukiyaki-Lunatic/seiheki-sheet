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
    range: {
      min: min,
      max: max
    },
    step: step,
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
