const INIT_STATE = 
  {
    "Elrick": {
      "action": 1,
      "bonus": 1,
      "free": 1,
      "reaction": 1
    },
    "Gróa": {
      "action": 1,
      "bonus": 1,
      "free": 1,
      "reaction": 1
    },
    "Hákarl": {
      "action": 1,
      "bonus": 1,
      "free": 1,
      "reaction": 1
    },
    "Merrek": {
      "action": 1,
      "bonus": 1,
      "free": 1,
      "reaction": 1
    },
    "Mogli": {
      "action": 1,
      "bonus": 1,
      "free": 1,
      "reaction": 1
    },
    "Myra": {
      "action": 1,
      "bonus": 1,
      "free": 1,
      "reaction": 1
    },
    "Nepnik": {
      "action": 1,
      "bonus": 1,
      "free": 1,
      "reaction": 1
    }
  };

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

  // let resetBtn = document.querySelector('button.reset-turn');

  // let revertBtn = document.querySelector('button.revert-all');
  // revertBtn.addEventListener('click', () => {
  //   localStorage.clear();
  //   localStorage.setItem('defaultCharacters', JSON.stringify(INIT_STATE));
  // });
}

window.addEventListener('load', initForm);


