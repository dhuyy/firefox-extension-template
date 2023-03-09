const appendStyles = (document: Document): void => {
  const style = document.createElement('style');

  style.innerHTML = `
      .bar {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        line-height: 20px;
        padding: 6px 0;
        background-color: #2f3133;
      }
    `;

  document.head.appendChild(style);
};

export const prependBarElement = (): void => {
  const body = document.querySelector('body');

  if (body !== null) {
    appendStyles(document);

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.dataset.testid = 'bar';
    bar.textContent =
      '🎉  Service worker, content script, and popup script were responsible for rendering this bar  🎉';

    body.prepend(bar);
  }
};
