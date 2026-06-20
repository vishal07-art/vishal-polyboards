IMAGES FOLDER
=============

Right now the whole site looks good WITHOUT any photos — the board textures,
samples and dividers are all drawn with CSS, so nothing can break or load slowly.

When you have real photos, drop them in this folder and swap them in. Good ones to take:

  hero.jpg          A wide shot of stacked boards or a board cut edge (close-up of the layers).
  mill.jpg          The machine / mill floor — great for the "Process" section.
  facility.jpg      A drone / aerial / satellite shot of your premises (see README → Map & satellite).
  product-grey.jpg  One clean photo per board grade for the product cards (optional).
  ...

HOW TO USE A PHOTO INSTEAD OF A CSS TEXTURE
-------------------------------------------
Find a block like this in the HTML:

    <div class="thumb board-edge"><span class="tag">Stiff · rigid</span></div>

and change it to:

    <div class="thumb" style="background-image:url('images/product-grey.jpg');
         background-size:cover;background-position:center">
      <span class="tag">Stiff · rigid</span>
    </div>

TIPS
----
- Keep files small: aim for under 300 KB each. Resize to ~1600px wide max.
- Use .jpg for photos, .png only for logos/graphics with transparency.
- Always add a real description in the alt="" text for accessibility & SEO.
