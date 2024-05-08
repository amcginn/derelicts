document.addEventListener("DOMContentLoaded", (event) => {
  let imgs = document.querySelectorAll('.character .item img');

  imgs.forEach((img) => {
    let src = img.src;
    img.src = '';
    img.setAttribute('loading', 'lazy');
    img.src = src;
  });
});
