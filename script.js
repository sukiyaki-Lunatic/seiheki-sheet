window.addEventListener("load", () => {
  const form = document.getElementById("preference-form");

  // 単一スライダー追加関数
  function createSingleSlider(labelText, min, max, initialValue) {
    const container = document.createElement("div");
    container.className = "slider-item";

    const label = document.createElement("label");
    label.textContent = labelText;

    const slider = document.createElement("div");
    slider.className = "noui-wrapper";

    const valueDisplay = document.createElement("span");
    valueDisplay.className = "value-display";
    valueDisplay.textContent = initialValue;

    container.appendChild(label);
    container.appendChild(slider);
    container.appendChild(valueDisplay);
    form.insertBefore(container, form.querySelector("button"));

    noUiSlider.create(slider, {
      start: initialValue,
      connect: [true, false],
      range: {
        min: min,
        max: max,
      },
      step: 1,
      tooltips: false,
    });

    slider.noUiSlider.on("update", (values) => {
      valueDisplay.textContent = Math.round(values[0]);
    });
  }

  // 範囲スライダー追加関数
  function createRangeSlider(labelText, min, max, initialMin, initialMax) {
    const container = document.createElement("div");
    container.className = "slider-item";

    const label = document.createElement("label");
    label.textContent = labelText;

    const slider = document.createElement("div");
    slider.className = "noui-wrapper";

    const valueDisplay = document.createElement("span");
    valueDisplay.className = "value-display";
    valueDisplay.textContent = `${initialMin} - ${initialMax}`;

    container.appendChild(label);
    container.appendChild(slider);
    container.appendChild(valueDisplay);
    form.insertBefore(container, form.querySelector("button"));

    noUiSlider.create(slider, {
      start: [initialMin, initialMax],
      connect: true,
      range: {
        min: min,
        max: max,
      },
      step: 1,
      tooltips: false,
    });

    slider.noUiSlider.on("update", (values) => {
      const [low, high] = values.map((v) => Math.round(v));
      valueDisplay.textContent = `${low} - ${high}`;
    });
  }

  // ▼ ここでスライダーを追加 ▼
  createSingleSlider("実年齢", 0, 100, 25);
  createSingleSlider("見た目年齢", 0, 100, 25);
  createRangeSlider("好みの年齢範囲", 10, 60, 18, 30);
  createRangeSlider("理想身長", 140, 200, 160, 170);
});
