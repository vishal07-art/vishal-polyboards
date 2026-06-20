/* =====================================================================
   VISHAL POLYBOARDS — main.js
   ---------------------------------------------------------------------
   Plain JavaScript, no libraries. Each feature is a small function that
   only runs if the elements it needs exist on the current page, so the
   same file can be shared safely across all three pages.

   >>> EDIT THESE TWO LINES with your real details <<<
   ===================================================================== */
const BUSINESS = {
  whatsapp: "916374139647",         // country code first, NO + or spaces
  email:    "sales@vishalpolyboards.com",
  phone:    "+91 6374139647",       // display format
  location: {
    area:     "Uppathur Vilakku",
    district: "Virudhunagar Dist.",
    state:    "Tamil Nadu",
    pincode:  "626205",
    lat:      9.354526,
    lng:      77.924711
  }
};

/* ---------------------------------------------------------------------
   1. MOBILE NAV TOGGLE
   --------------------------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector(".menu-toggle");
  const links  = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // close the menu after tapping a link
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------------------------------------------------------------------
   2. SCROLL REVEAL  (fades sections in as you scroll)
   --------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  // If the browser can't observe, just show everything.
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

/* ---------------------------------------------------------------------
   3. ANIMATED COUNTERS  (the stat numbers count up once on view)
   --------------------------------------------------------------------- */
function initCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length || !("IntersectionObserver" in window)) {
    nums.forEach(n => n.firstChild && (n.childNodes[0].nodeValue = n.dataset.count));
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    if (reduce) { el.childNodes[0].nodeValue = target; return; }
    const dur = 1300, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.childNodes[0].nodeValue = Number.isInteger(target)
        ? Math.round(val).toLocaleString("en-IN")
        : val.toFixed(1);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.6 });
  nums.forEach(n => io.observe(n));
}

/* ---------------------------------------------------------------------
   4. PRODUCT FILTER  (products page chips)
   --------------------------------------------------------------------- */
function initFilters() {
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll(".product-card[data-cat]");
  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const f = chip.dataset.filter;
      cards.forEach(card => {
        const show = f === "all" || card.dataset.cat.split(" ").includes(f);
        card.style.display = show ? "" : "none";
      });
    });
  });
}

/* ---------------------------------------------------------------------
   5. CONTACT FORM  →  WhatsApp / Email (no server required)
   The form never reloads the page. On submit it validates, then opens a
   pre-filled WhatsApp chat (primary) or an email draft (secondary).

   WANT REAL EMAIL DELIVERY INTO YOUR INBOX INSTEAD?
   Sign up free at https://web3forms.com , paste your Access Key into
   WEB3FORMS_KEY below, and the form will POST to them automatically.
   Leave it blank to keep the WhatsApp/email behaviour.
   --------------------------------------------------------------------- */
const WEB3FORMS_KEY = ""; // e.g. "a1b2c3d4-...."  (optional)

function buildMessage(d) {
  return (
`New enquiry from website
--------------------------------
Name: ${d.name}
Company: ${d.company || "-"}
Phone: ${d.phone}
Email: ${d.email || "-"}
Board type: ${d.product}
GSM / thickness: ${d.gsm || "-"}
Quantity: ${d.qty || "-"}

Message:
${d.message || "-"}`
  );
}

function initForm() {
  const form = document.querySelector("#enquiry-form");
  if (!form) return;
  const status = form.querySelector(".form-status");

  const showError = (field, on) => {
    field.closest(".field").classList.toggle("invalid", on);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ---- validate required fields ----
    const required = ["name", "phone", "product"];
    let ok = true;
    required.forEach(name => {
      const el = form.elements[name];
      const empty = !el.value.trim();
      showError(el, empty);
      if (empty) ok = false;
    });
    // light email check (email is optional but if filled must look valid)
    const email = form.elements["email"];
    if (email.value.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      showError(email, true); ok = false;
    }
    if (!ok) { form.querySelector(".invalid input, .invalid select")?.focus(); return; }

    const data = Object.fromEntries(new FormData(form).entries());

    // ---- Option A: real email delivery via Web3Forms ----
    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: "New board enquiry", ...data })
        });
        if (res.ok) {
          status.textContent = "Thank you — your enquiry has been sent. We will get back within one working day.";
          status.classList.add("show");
          form.reset();
          return;
        }
      } catch (_) { /* fall through to WhatsApp below */ }
    }

    // ---- Option B (default): open WhatsApp pre-filled ----
    const text = encodeURIComponent(buildMessage(data));
    const wa = `https://wa.me/${BUSINESS.whatsapp}?text=${text}`;
    window.open(wa, "_blank");

    status.innerHTML =
      `Opening WhatsApp with your enquiry… ` +
      `If nothing opened, <a href="mailto:${BUSINESS.email}?subject=Board%20enquiry&body=${text}">send it by email instead</a>.`;
    status.classList.add("show");
  });
}

/* ---------------------------------------------------------------------
   6. WHATSAPP LINKS  (floating button + any [data-wa] links)
   --------------------------------------------------------------------- */
function initWhatsApp() {
  document.querySelectorAll("[data-wa]").forEach(a => {
    const msg = a.dataset.wa || "Hello, I would like to enquire about your recycled boards.";
    a.href = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
  });
}

/* ---------------------------------------------------------------------
   7. FOOTER YEAR
   --------------------------------------------------------------------- */
function initYear() {
  const y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------------
   BOOT
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initCounters();
  initFilters();
  initForm();
  initWhatsApp();
  initYear();
});
