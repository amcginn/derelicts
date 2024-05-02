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

function initTurnTracker() {
  let defaultCharacters = localStorage.getItem('default-characters');
  if (defaultCharacters) {
    let charactersEl = document.querySelector('.tracker-characters');
    let newdiv = document.createElement('span');
    newdiv.innerText = defaultCharacters;

    // charactersEl.append(newdiv);

  }

  let turnTrackerEnabled = localStorage.getItem('turn-tracker-enabled');
  if (turnTrackerEnabled == 'true') {
    let trackerContainer = document.querySelector('details.tracker-container');
    trackerContainer.classList.remove('hidden');
  }
}

window.addEventListener('load', () => {
  createPlayerLinks();
  initTurnTracker();
});

setInterval(() => {
  if (window.scrollY > window.innerHeight) {
    document.getElementById('top-link-container').style.display = 'flex';
  } else {
    document.getElementById('top-link-container').style.display = 'none';
  }
}, 500);
