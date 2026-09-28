/* ===================================================================
   LIP Industrie Précision — interactions
   - bascule d'onglets Présentation / Contact
   - génération & téléchargement de la vCard (carte de visite)
   - apparition des sections au scroll
   =================================================================== */

(function () {
  "use strict";

  /* ---------- Onglets ---------- */
  var tabs   = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".tab-panel");

  function switchTab(name) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === name;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      var on = p.id === name;
      p.classList.toggle("active", on);
      if (on) { p.hidden = false; } else { p.hidden = true; }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    // met l'ancre à jour sans recharger
    if (history.replaceState) { history.replaceState(null, "", "#" + name); }
  }

  // Tout élément portant data-tab bascule l'onglet
  document.querySelectorAll("[data-tab]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      switchTab(el.dataset.tab);
    });
  });

  // Ouverture directe via ancre (#contact)
  if (location.hash === "#contact") { switchTab("contact"); }

  /* ---------- vCard (carte de visite dématérialisée) ---------- */
  var vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;LIP Industrie Précision;;;",
    "FN:LIP Industrie Précision",
    "ORG:LIP Industrie Précision",
    "TITLE:Mécanique de précision",
    "TEL;TYPE=WORK,VOICE:+33381535088",
    "EMAIL;TYPE=WORK:contact@lip-industrie.com",
    "ADR;TYPE=WORK:;;2D chemin de l'Ermitage;Besançon;;25000;France",
    "URL:https://www.lip-industrie.com",
    "NOTE:La garantie d'une réponse précise — Usinage et mécanique de précision. Rencontré à Micronora 2026 (Hall B1, Stand 503).",
    "END:VCARD"
  ].join("\r\n");

  var btn = document.getElementById("download-vcard");
  if (btn) {
    btn.addEventListener("click", function () {
      var blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement("a");
      a.href = url;
      a.download = "LIP-Industrie-Precision.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    });
  }

  /* ---------- Apparition au scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Année du footer ---------- */
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
