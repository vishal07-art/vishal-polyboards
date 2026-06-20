# Vishal Polyboards — Website

A simple, professional, **plain HTML / CSS / JavaScript** website for a recycled
paper-board mill. No frameworks, no build step, no server needed. Just open the
files in a browser. Built to be easy to read, edit and learn from.

---

## 1. What's inside

```
polyboards-website/
├── index.html        ← Home (hero, products overview, process, why us)
├── products.html     ← Full catalogue + specifications + pricing table
├── contact.html      ← Enquiry form + company details + map
├── css/
│   └── styles.css    ← ALL styling. Colours/sizes live at the very top (:root).
├── js/
│   └── main.js       ← ALL behaviour. Your phone/email live at the very top.
├── images/
│   └── README.txt    ← Where to put real photos later (optional).
├── favicon.svg       ← The little tab icon.
└── README.md         ← This file.
```

## 2. Run it

Just **double-click `index.html`** — it opens in your browser. That's it.

To preview like a real website (recommended while editing), run a tiny local
server from inside the folder:

```bash
# Python (already on most machines)
python3 -m http.server 8000
# then open  http://localhost:8000
```

---

## 3. The 10-minute customisation checklist

Do these and the site is "yours". Everything is in plain text — use Find &
Replace in your editor (VS Code is free and great).

1. **Business name** — Find & Replace `Vishal Polyboards` with your real name
   across all three `.html` files.
2. **Phone & WhatsApp** — open `js/main.js`, edit the top:
   ```js
   const BUSINESS = {
     whatsapp: "919000000000",   // country code first, NO + or spaces (91 = India)
     email:    "sales@vishalpolyboards.com"
   };
   ```
   Then Find & Replace the display number `+91 90000 00000` and `tel:+919000000000`
   in the HTML with your real number.
3. **Email** — Find & Replace `sales@vishalpolyboards.com`.
4. **Address & pincode** — Find & Replace `Upputhar Vilaku, near Sivakasi` and
   `626XXX` with your exact address.
5. **Stats** — on `index.html`, edit the numbers in the `data-count="…"` boxes
   (waste reclaimed, years, etc.) to your real figures, and delete the `*` note.
6. **Pricing** — on `products.html`, edit the `₹/kg` figures in the reference
   table to your real rate card, and delete the placeholder note.
7. **Map** — see section 5 below.
8. **Colours / fonts** — optional, see section 6.

---

## 4. The contact form (no server required)

The form **does not need a backend**. When someone submits it, it opens a
**WhatsApp chat pre-filled** with their enquiry (and falls back to email). This is
ideal for B2B in the Sivakasi belt where WhatsApp is how buyers actually talk.

### Want enquiries delivered straight to your email inbox instead?
1. Go to **https://web3forms.com** (free) and get an **Access Key** (just enter
   your email — no account needed).
2. Open `js/main.js`, find this line near the middle and paste your key:
   ```js
   const WEB3FORMS_KEY = "";   // ← paste your key here, e.g. "a1b2c3d4-...."
   ```
3. Done. The form now emails you every enquiry. (If it ever fails, it still falls
   back to WhatsApp, so you never lose a lead.)

Other free options that work the same way: Formspree, Getform, or a Google Form.

---

## 5. Map & satellite imagery

The contact page already embeds a Google Map **centred on Sivakasi in satellite
view** (no API key needed). To make it point at your **exact mill**:

1. Open **Google Maps** and search your location (or drop a pin on your premises).
2. Click **Share → Embed a map**. *(Tip: switch the map to "Satellite" first,
   using the layers button at the bottom-left, so the embed copies that view.)*
3. Copy the `<iframe …></iframe>` it gives you.
4. In `contact.html`, find the comment `MAP — currently centred on Sivakasi…`
   and **replace the whole `<iframe>`** below it with the one you copied.

**Quick satellite trick:** in the simple map link already in the file, the
`&t=k` part is what forces satellite view (`t=m` = normal map, `t=k` = satellite,
`t=h` = hybrid with labels). Change `z=13` to zoom (higher = closer).

**Adding your own aerial / satellite photo** (nice for the hero or an "Our
facility" section):
- Take a **drone shot** of your premises, OR
- Screenshot your location from **Google Earth** (earth.google.com) at a good
  angle, OR use **Bing Maps → Aerial**.
- Save it into `images/` (e.g. `facility.jpg`) and place it with an `<img>` tag,
  or as a section background — see `images/README.txt` for the exact snippet.
- Always keep the file under ~300 KB so the page stays fast.

---

## 6. Changing colours & fonts (optional)

Open `css/styles.css`. The very first block (`:root`) is your control panel —
change a value once and it updates everywhere:

```css
--ink:   #16241E;   /* dark forest — headings & dark sections */
--pulp:  #F2EEE4;   /* page background */
--kraft: #C7A06A;   /* warm accent */
--moss:  #34664A;   /* buttons & links */
```

Fonts are loaded at the top of each HTML file from Google Fonts
(Archivo + Inter + Space Mono). To change one, swap the family in the
`<link …fonts.googleapis.com…>` line and update `--font-display` / `--font-body`
/ `--font-mono` in the CSS.

---

## 7. Putting it online (free)

Any of these host static sites for free — just drag the folder in:

- **Netlify** (netlify.com → "Add new site" → drag the folder). Bonus: it has
  built-in form handling.
- **Cloudflare Pages** or **GitHub Pages** — also free.
- Or upload the files to any normal web host via FTP/cPanel.

Point your domain (e.g. `vishalpolyboards.com`) at the host and you're live.

---

## 8. Notes for whoever maintains this

- The **header (nav)** and **footer** are copied into all three HTML pages. If
  you change a menu link, change it in **all three** files. (This is normal for a
  no-framework static site and keeps things simple.)
- Accessibility is built in: keyboard focus rings, alt text, reduced-motion
  support, mobile menu. Please keep `alt=""` descriptions real when adding photos.
- Everything degrades gracefully — if JavaScript is off, the site still reads fine.

Made simply with HTML · CSS · JavaScript. Have fun building. 🧱
