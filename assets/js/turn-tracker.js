function addCharacterToModal(characterKey) {
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

  let characterList = document.querySelector('.tracker-characters');
  characterList.append(character);
}

const actions = [ 'action', 'bonus', 'free', 'reaction' ];
function createCharListItem(name) {
  if (name == null || name == '') {
      return;
    }

    let nameId = ''
    if (name.includes('_')) {
      nameId = name;
      name = decodeURIComponent(name.split('_')[0]).slice(1);
    } else {
      nameId = 'x' + encodeURIComponent(name) + '_' + self.crypto.randomUUID().replaceAll('-', '');
    }

    let nameSpan = document.createElement('span');
    nameSpan.classList.add('character-name');
    nameSpan.innerText = name;
    nameSpan.setAttribute('uuid', nameId);

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-character');
    deleteBtn.innerText = '-';
    deleteBtn.setAttribute('uuid', nameId);

    let characterItem = document.createElement('li');
    characterItem.classList.add('character-item');
    characterItem.append(nameSpan, deleteBtn);

    deleteBtn.addEventListener('click', () => {
      characterItem.remove();
      let deleteId = deleteBtn.getAttribute('uuid')
      localStorage.removeItem(deleteId);

      let characterList = localStorage.getItem('additional-characters');
      let characters = characterList ? characterList.split(',') : [];

      const index = characters.indexOf(deleteId);
      if (index > -1) {
        characters.splice(index, 1);
      }

      localStorage.setItem('additional-characters', characters.join());
      actions.forEach((action) => {
        localStorage.removeItem(deleteId + '_' + action);
      });

      let characterModuleEl = document.querySelector('.character:has(input[id^="' + nameId + '"])');
      characterModuleEl.remove();
    });

    let charList = document.querySelector('ul.character-list');
    charList.append(characterItem);

    // default actions to checked
    actions.forEach((action) => {
      let actionId = nameId + '_' + action;
      let x = localStorage.getItem(actionId);
      if (x === null) {
        localStorage.setItem(actionId, 'true');
      }
    });

    return nameId;
}

function addEventAction() {
  let nameInput = document.getElementById('add-character');
  let name = nameInput.value.trim();

  if (name == '') {
    return;
  }

  let nameId = createCharListItem(name);
  let characterList = localStorage.getItem('additional-characters');

  let characters = characterList ? characterList.split(',') : [];
  characters.push(nameId);
  localStorage.setItem('additional-characters', characters.join());

  addCharacterToModal(nameId);

  nameInput.value = '';
}

function initForm() {
  // enable tracker
  let trackerCheckbox = document.getElementById('enable-tracker');
  trackerCheckbox.checked = localStorage.getItem('turn-tracker-enabled') == 'true';
  
  trackerCheckbox.addEventListener('change', () => {
    localStorage.setItem('turn-tracker-enabled', trackerCheckbox.checked);
    
    let trackerContainer = document.querySelector('details.tracker-container');
    if (trackerCheckbox.checked) {
      trackerContainer.classList.remove('hidden');
    } else {
      trackerContainer.classList.add('hidden');
    }

    if (localStorage.getItem('turn-tracker-open') == 'true') {
      trackerContainer.setAttribute('open', '');
    } else {
      trackerDetails.removeAttribute('open');
    }
  });

  // show additional characters
  let additionalCharacters = localStorage.getItem('additional-characters');
  if (additionalCharacters) {
    let charListEl = document.querySelector('ul.character-list');
    let characters = additionalCharacters.split(',');
    characters.forEach((character) => {
      createCharListItem(character);
    });
  }

  // init add character button
  let addBtn = document.querySelector('button.add-character');

  addBtn.addEventListener('click', () => {
    addEventAction();
  });

  document.getElementById('add-character').addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addEventAction();
  } else if (event.key === '_') {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
});
}

window.addEventListener('load', initForm);


