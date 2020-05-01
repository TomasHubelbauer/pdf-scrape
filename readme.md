# PDF Scrape

0. Print `demo.html` to `demo.pdf` or use your own document
1. Go to https://mozilla.github.io/pdf.js/getting_started
2. Download **Stable**
3. Extract `pdf.js` and `pdf.worker.js` and their corresponding `*.map` here
4. Make `index.html` and reference PDF.js:

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>PDF Scrape</title>
    <script src="pdf.js"></script>
  </head>
  <body>

  </body>
</html>
```

5. Create `index.js` and reference it from `index.html`:

`index.js`
```js
```

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>PDF Scrape</title>
    <script src="pdf.js"></script>
    <script src="index.js"></script>
  </head>
  <body>

  </body>
</html>
```

6. Update `index.js` with code to load the document and render its page:

`index.js`
```js
void async function () {
  const document = await pdfjsLib.getDocument('demo.pdf').promise;
  const page = await document.getPage(1);
}()
```

7. Add a `canvas` element to `index.html` where the page will be rendered:

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>PDF Scrape</title>
    <script src="pdf.js"></script>
    <script src="index.js"></script>
  </head>
  <body>
    <canvas id="pageCanvas"></canvas>
  </body>
</html>
```

8. Extend the code to render the page to the canvas context:

`index.js`
```js
window.addEventListener('load', async () => {
  const document = await pdfjsLib.getDocument('demo.pdf').promise;
  const page = await document.getPage(1);
  const viewport = page.getViewport({ scale: 1 });
  const canvas = window.document.getElementById('pageCanvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const context = canvas.getContext('2d');
  page.render({ canvasContext: context, viewport });
});
```

9. Hook up code to extract text and highlight texts and images (see this repo)
