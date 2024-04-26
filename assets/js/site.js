$(window).on('load', function() {
  $('#top-link-container').on('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  if (window.scrollY > window.innerHeight * 2) {
    document.getElementById('top-link-container').style.display = 'flex';
  }
});

function createPlayerLinks() {
  let players = document.querySelectorAll('bag, fenrir, fiioria, groa, hakarl, merrek, mogli, myra, nepnik');

  let baseURL = document.querySelector('meta[name="site-home"]').getAttribute('content');

  players.forEach((player) => {
    let characterLink = baseURL + '/characters/' + player.tagName.toLowerCase();

    player.style.cursor = 'pointer';
    player.addEventListener('click', () => {
      window.location.href = characterLink;
    });
  });
}

window.addEventListener('load', () => {
  createPlayerLinks();
});

setInterval(() => {
  if (window.scrollY > window.innerHeight) {
    document.getElementById('top-link-container').style.display = 'flex';
  } else {
    document.getElementById('top-link-container').style.display = 'none';
  }
}, 500);

window.addEventListener('load', () => {

});