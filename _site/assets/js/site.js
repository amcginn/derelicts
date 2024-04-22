$(window).on('load', function() {
  $('#top-link-container').on('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  if ($('body > #container').height() > $(window).height() * 2) {
    $('#top-link-container').css('display', 'block')
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