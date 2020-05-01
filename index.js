window.addEventListener('load', async () => {
  const document = await pdfjsLib.getDocument('demo.pdf').promise;
  const page = await document.getPage(1);
  const viewport = page.getViewport({ scale: 1 });
  const canvas = window.document.getElementById('pageCanvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const context = canvas.getContext('2d');
  const imageLayer = {
    // Note that this method does not accept any arguments
    beginLayout: () => { },

    // Note that this method does not accept any arguments
    endLayout: () => { },

    appendImage: ({ imgData, left, top, width, height }) => box(left, top, width, height, `${imgData.data.length} B ${~~width}px × ${~~height}px (natively ${imgData.width}px × ${imgData.height}px) image at ${~~left}px × ${~~top}px`),
  };

  page.render({ canvasContext: context, viewport, imageLayer });

  const { items } = await page.getTextContent();
  for (const item of items) {
    box(item.transform[4], viewport.height - item.transform[5] - item.height, item.width, item.height, item.str);
  }
});

function box(x, y, width, height, title) {
  const boxDiv = window.document.createElement('div');
  boxDiv.textContent = title;
  boxDiv.style.left = x + 'px';
  boxDiv.style.top = y + 'px';
  boxDiv.style.width = width + 'px';
  boxDiv.style.height = height + 'px';
  window.document.body.append(boxDiv);
}
