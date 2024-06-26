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

function syncActionValues(actionInput) {
  actionInput.checked = localStorage.getItem(actionInput.id) === "true";
  
  actionInput.addEventListener('change', () => {
    localStorage.setItem(actionInput.id, actionInput.checked);
  });

  actionInput.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

const actionTypes = { 'A': 'action', 'B': 'bonus', 'F': 'free', 'R': 'reaction' };

function addCharactersToTracker() {
  let additionalCharacters = localStorage.getItem('additional-characters');
  if (additionalCharacters) {
    let characters = additionalCharacters.split(',');

    let characterList = document.querySelector('.tracker-characters');
    let characterEls = characterList.querySelectorAll('div > .character');

    let existingCharEls = [];
    characterEls.forEach((characterEl) => {
      existingCharEls.push(characterEl.dataset.characterKey);
    });

    // console.log(characters);
    // console.log(existingCharEls);
    // console.log();

    let intersectCharKeys = characters.filter(char => existingCharEls.includes(char));
    let newCharKeys = characters.filter(char => !existingCharEls.includes(char));
    let removedCharKeys = existingCharEls.filter(char => !characters.includes(char));

    // console.log(intersectCharKeys);
    // console.log(newCharKeys);
    // console.log(removedCharKeys);

    newCharKeys.forEach((characterKey) => {
      let encodedName = characterKey.split('_')[0].slice(1);
      let characterName = decodeURIComponent(encodedName);

      let actions = document.createElement('div');
      actions.className = 'actions';

      Object.entries(actionTypes).forEach(([abbr, type]) => {
        // action
        let actionCheckbox = document.createElement('input');
        actionCheckbox.type = 'checkbox';
        actionCheckbox.id = characterKey + '_' + type;
        syncActionValues(actionCheckbox);

        let actionLabel = document.createElement('label');
        actionLabel.htmlFor = characterKey + '_' + type;
        actionLabel.innerText = abbr;

        let actionDiv = document.createElement('div');
        actionDiv.className = 'action';
        actionDiv.title = type.slice(0, 1).toUpperCase() + type.slice(1);
        actionDiv.append(actionLabel, actionCheckbox);

        actions.append(actionDiv);
      });

      let character = document.createElement('div');
      character.className = 'character';
      character.setAttribute('data-character-key', characterKey);
      let nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.innerText = characterName;

      character.append(nameSpan, actions);
      characterList.append(character);
    });

    intersectCharKeys.forEach((characterKey) => {
      actionTypes.forEach((action) => {
        localStorage.getItem(characterKey + '_' + action);
      });
    });
  }
}

function initTurnTracker() {
  let actionInputs = document.querySelectorAll('.action > input[type="checkbox"]');

  actionInputs.forEach(function(actionInput) {
    syncActionValues(actionInput);
  });

  // additional characters
  addCharactersToTracker()

  // reset
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

  // open/close
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

function addTopLinkAnchor() {
  let topLink = document.getElementById('top-link-container');
  topLink.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  if (window.scrollY > window.innerHeight * 2) {
    document.getElementById('top-link-container').style.display = 'flex';
  }
}

window.addEventListener('load', () => {
  createPlayerLinks();
  initTurnTracker();
  addTopLinkAnchor();
});

window.addEventListener('storage', () => {
  // enable/disable 
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

  // update additional character list
  let additionalCharacters = localStorage.getItem('additional-characters');
  if (additionalCharacters) {
    let characters = additionalCharacters.split(',');
    
    addCharactersToTracker();

    characters.forEach((characterKey) => {
      let encodedName = characterKey.split('_')[0].slice(1);
      let characterName = decodeURIComponent(encodedName);

      let actions = document.createElement('div');
      actions.className = 'actions';

      Object.entries(actionTypes).forEach(([abbr, type]) => {
        // action
        let actionCheckbox = document.createElement('input');
        actionCheckbox.type = 'checkbox';
        actionCheckbox.id = characterKey + '_' + type;
        syncActionValues(actionCheckbox);

        let actionLabel = document.createElement('label');
        actionLabel.htmlFor = characterKey + '_' + type;
        actionLabel.innerText = abbr;

        let actionDiv = document.createElement('div');
        actionDiv.className = 'action';
        actionDiv.title = type.slice(0, 1).toUpperCase() + type.slice(1);
        actionDiv.append(actionLabel, actionCheckbox);

        actions.append(actionDiv);
      });

      let character = document.createElement('div');
      character.className = 'character';
      let nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.innerText = characterName;

      character.append(nameSpan, actions);
      characterList.append(character);
    });
  }
});

setInterval(() => {
  if (window.scrollY > window.innerHeight) {
    document.getElementById('top-link-container').style.display = 'flex';
  } else {
    document.getElementById('top-link-container').style.display = 'none';
  }
}, 1000);
