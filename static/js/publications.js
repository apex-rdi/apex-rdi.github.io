// Filters for the Publications page.
// Remembers the chosen category, year and tag, then shows only matching papers.

const chosen = { type: "all", year: "all", tag: "all" };

function matches(paper) {
  const typeOk = chosen.type === "all" || paper.dataset.type === chosen.type;
  const yearOk = chosen.year === "all" || paper.dataset.year === chosen.year;
  const tagOk  = chosen.tag  === "all" || paper.dataset.tags.split(" ").includes(chosen.tag);
  return typeOk && yearOk && tagOk;
}

function update() {
  let shown = 0;

  document.querySelectorAll(".pub").forEach(paper => {
    const ok = matches(paper);
    paper.hidden = !ok;
    if (ok) shown++;
  });

  // Hide a year heading when none of its papers are showing
  document.querySelectorAll(".pub-year").forEach(year => {
    year.hidden = !year.querySelector(".pub:not([hidden])");
  });

  document.querySelector(".pub-empty").hidden = shown > 0;
}

document.querySelectorAll(".filter-row").forEach(row => {
  const filter = row.dataset.filter;   // "type", "year" or "tag"

  row.querySelectorAll("button").forEach(button => {
    button.setAttribute("aria-pressed", button.classList.contains("is-on"));

    button.addEventListener("click", () => {
      row.querySelectorAll("button").forEach(b => {
        b.classList.remove("is-on");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-on");
      button.setAttribute("aria-pressed", "true");

      chosen[filter] = button.dataset.value;
      update();
    });
  });
});