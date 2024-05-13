let imgs = document.querySelectorAll('.character .item img');

imgs.forEach((img) => {
  let src = img.src;
  img.src = '';
  img.setAttribute('loading', 'lazy');
  img.src = src;
  // img.onerror = function () {
  //   let profileImg = document.querySelector('.character .photo:has(> img)')
  //   this.src = profileImg.dataset.tokenImg;
  //   this.style.backgroundColor = 'white';
  //   this.classList.add('defaultImage');
  // };
});
