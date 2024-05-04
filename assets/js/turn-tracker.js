function createCharListItem(name) {
  if (name == null || name == '') {
      return;
    }

    let nameId = ''
    if (name.includes('&')) {
      nameId = name;
      name = name.split('&')[0];
    } else {
      nameId = encodeURIComponent(name) + '&' + self.crypto.randomUUID();
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

      let characterList = localStorage.getItem('custom-characters');
      let characters = characterList ? characterList.split(',') : [];

      const index = characters.indexOf(deleteId);
      if (index > -1) {
        characters.splice(index, 1);
      }

      localStorage.setItem('custom-characters', characters.join());
    });

    let charList = document.querySelector('ul.character-list');
    charList.append(characterItem);

    return nameId;
}

function initForm() {
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

  let existingCharacters = localStorage.getItem('custom-characters');
  if (existingCharacters) {
    let charListEl = document.querySelector('ul.character-list');
    let characters = existingCharacters.split(',');
    characters.forEach((character) => {
      createCharListItem(character);
    });
  }


  let addBtn = document.querySelector('button.add-character');

  addBtn.addEventListener('click', () => {
    let nameInput = document.getElementById('add-character');
    let uuid = self.crypto.randomUUID();

    let name = nameInput.value.trim();

    if (name == '') {
      return;
    }

    let nameId = createCharListItem(name);

    let characterList = localStorage.getItem('custom-characters');

    let characters = characterList ? characterList.split(',') : [];
    characters.push(nameId);
    localStorage.setItem('custom-characters', characters.join());

    nameInput.value = '';
  });
}

window.addEventListener('load', initForm);


