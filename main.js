// Pink Planner JS — simple + clean

// --- Affirmations randomizer ---
const affirmations = [
  "I am focused and unstoppable.",
  "I am becoming better every day.",
  "I am capable of hard things.",
  "I am disciplined and consistent.",
  "I am protected and guided.",
  "I am confident in my choices.",
  "I am the plan AND the prize.",
  "I am allowed to take up space.",
  "I am calm, clear, and in control.",
  "I am exactly where I need to be."
];

function setRandomAffirmation() {
  const el = document.getElementById("randomAffirmation");
  if (!el) return;
  const pick = affirmations[Math.floor(Math.random() * affirmations.length)];
  el.textContent = pick;
}

// --- Setup form validation + summary ---
function setupPlannerForm() {
  const form = document.getElementById("plannerForm");
  if (!form) return;

  const name = document.getElementById("name");
  const intention = document.getElementById("intention");
  const affirmation = document.getElementById("favAff");
  const output = document.getElementById("formOutput");
  const errorBox = document.getElementById("formErrors");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    errorBox.textContent = "";
    output.innerHTML = "";

    const errors = [];

    if (!name.value.trim()) errors.push("Please enter your name.");
    if (!intention.value.trim()) errors.push("Please enter a weekly intention.");
    if (!affirmation.value.trim()) errors.push("Please enter your favorite affirmation.");

    if (errors.length) {
      errorBox.textContent = errors.join(" ");
      return;
    }

    // Safe text insertion
    const safeName = name.value.trim();
    const safeIntention = intention.value.trim();
    const safeAff = affirmation.value.trim();

    output.innerHTML = `
      <div class="success">
        ✨ Your planner is set, <strong>${escapeHtml(safeName)}</strong>!<br/>
        <span>Weekly intention:</span> ${escapeHtml(safeIntention)}<br/>
        <span>Favorite affirmation:</span> ${escapeHtml(safeAff)}
      </div>
    `;

    form.reset();
  });
}

// Basic HTML escape to avoid injecting raw HTML into the page
function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Run page-specific features
document.addEventListener("DOMContentLoaded", () => {
  const randomBtn = document.getElementById("randomBtn");
  if (randomBtn) {
    randomBtn.addEventListener("click", setRandomAffirmation);
    setRandomAffirmation(); // load one on page open
  }
  setupPlannerForm();
});
