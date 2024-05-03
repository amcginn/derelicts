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
  let actionInputs = document.querySelectorAll('.action > input[type="checkbox"]');

  actionInputs.forEach(function(actionInput) {
    actionInput.checked = localStorage.getItem(actionInput.id) === "true";
    
    actionInput.addEventListener('change', () => {
      localStorage.setItem(actionInput.id, actionInput.checked);
    });

    actionInput.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  // let charactersEl = document.querySelector('.tracker-characters');

  let resetButton = document.querySelector('.tracker-container .buttons button.reset');
  resetButton.addEventListener('click', (event) => {
    let actionInputs = document.querySelectorAll('.action > input[type="checkbox"]');

    actionInputs.forEach(function(actionInput) {
      actionInput.checked = true;
      localStorage.setItem(actionInput.id, 'true');
    });

    event.preventDefault();
    event.stopPropagation();
  });


  let trackerDetails = document.querySelector('details.tracker-container');
  let trackerDetailsSummary = document.querySelector('details.tracker-container > summary');
  trackerDetailsSummary.addEventListener('click', () => {
    localStorage.setItem('turn-tracker-open', !trackerDetails.hasAttribute('open')); // event triggered before attribute changed
  });

  // show tracker module
  let turnTrackerEnabled = localStorage.getItem('turn-tracker-enabled');
  if (turnTrackerEnabled == 'true') {
    let trackerExpanded = localStorage.getItem('turn-tracker-open');
    if (trackerExpanded == 'true') {
      trackerDetails.setAttribute('open', '');
    }

    let trackerContainer = document.querySelector('details.tracker-container');
    trackerContainer.classList.remove('hidden');
  }
}

window.addEventListener('load', () => {
  createPlayerLinks();
  initTurnTracker();
});

window.addEventListener('storage', () => {
  let trackerEnabled = window.localStorage.getItem('turn-tracker-enabled');

  let trackerCheckbox = document.getElementById('enable-tracker');
  if (trackerCheckbox) { trackerCheckbox.checked = trackerEnabled == 'true'; }

  let tracker = document.querySelector('details.tracker-container');
  if (trackerEnabled == 'true') {
    if (trackerCheckbox) { trackerCheckbox.checked = true; }
    tracker.classList.remove('hidden');
  } else {
    if (trackerCheckbox) { trackerCheckbox.checked = false; }
    tracker.classList.add('hidden');
  }
});

setInterval(() => {
  if (window.scrollY > window.innerHeight) {
    document.getElementById('top-link-container').style.display = 'flex';
  } else {
    document.getElementById('top-link-container').style.display = 'none';
  }
}, 500);
