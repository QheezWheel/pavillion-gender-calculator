// identities for the scale
const IDENTITIES = [
  { label: "Hyper-feminine woman", value: -5 },
  { label: "Average woman", value: -4.5 },
  { label: "Femme woman", value: -4 },
  { label: "Tomboy", value: -2.5 },
  { label: "Butch woman", value: -1.5 },
  { label: "Androgynous person", value: 0 },
  { label: "Non-binary (agender)", value: 0 },
  { label: "Gender-fluid (variable)", value: 0 },
  { label: "Femboy", value: 1.5 },
  { label: "Cross-dressing man", value: 2.5 },
  { label: "Soft boy / gentle masculine", value: 2.5 },
  { label: "Drag queen (performance)", value: 2 },
  { label: "Drag king (performance)", value: -1 },
  { label: "Average man", value: 4.5 },
  { label: "Masculine man / hyper-masculine", value: 5 },
  { label: "Trans woman (post-transition)", value: -4.5 },
  { label: "Trans man (post-transition)", value: 4.5 }
];

// get DOM elements
const id1Select = document.getElementById("id1");
const id2Select = document.getElementById("id2");

const id1Display = document.getElementById("id1Display");
const id2Display = document.getElementById("id2Display");
const distanceDisplay = document.getElementById("distanceDisplay");
const straightnessDisplay = document.getElementById("straightnessDisplay");
const gaynessDisplay = document.getElementById("gaynessDisplay");

// populate both selects with the same options
function populateSelect(selectEl) {
  IDENTITIES.forEach((identity, idx) => {
    const opt = document.createElement("option");
    opt.value = identity.value;
    opt.textContent = identity.label;
    // store the label on the option so we can read it later
    opt.setAttribute("data-label", identity.label);
    selectEl.appendChild(opt);
  });
}

// init
populateSelect(id1Select);
populateSelect(id2Select);

// set defaults
id1Select.selectedIndex = IDENTITIES.findIndex(i => i.label === "Average woman");
id2Select.selectedIndex = IDENTITIES.findIndex(i => i.label === "Average man");

// core calculator
function updateResults() {
  const id1Option = id1Select.options[id1Select.selectedIndex];
  const id2Option = id2Select.options[id2Select.selectedIndex];

  const label1 = id1Option.getAttribute("data-label");
  const label2 = id2Option.getAttribute("data-label");

  const x1 = parseFloat(id1Option.value);
  const x2 = parseFloat(id2Option.value);

  const distance = Math.abs(x1 - x2);
  const straightness = distance / 10;
  const gayness = 1 - straightness;

  id1Display.textContent = `${label1} (X₁ = ${x1})`;
  id2Display.textContent = `${label2} (X₂ = ${x2})`;
  distanceDisplay.textContent = `Distance: ${distance.toFixed(2)}`;
  straightnessDisplay.textContent = `Straightness (S): ${straightness.toFixed(2)}`;
  gaynessDisplay.textContent = `Gayness (G): ${gayness.toFixed(2)}`;
}

// update on load
updateResults();

// update on change
id1Select.addEventListener("change", updateResults);
id2Select.addEventListener("change", updateResults);
