

function populateActivations() {
  if (!charLoc) { return; }

  fetch(charLoc)
      .then((rawData) =>
        rawData.json()
      )
    .then((charData) => {
      let itemEls = document.querySelectorAll('.character .items li.item:not(.item-placeholder)');

      itemEls.forEach((itemEl) => {
        let itemId = itemEl.dataset.id;
        let classAdded = false;
        let itemData = charData.items.filter((item) => item._id === itemId)[0];
        // console.log(itemData);

        let actionsData = Object.values(itemData.system.actions);
        if (actionsData && actionsData.length > 0) {
          let activationTypes = [];
          Object.values(actionsData).forEach((action) => {
            if (action.activation && action.activation.type) {
              activationTypes.push(action.activation.type);
            }
          });

          new Set(activationTypes).forEach((type) => {
            itemEl.classList.add('activation-' + type);
            classAdded = true;
          });
        }
        if (!classAdded) {
          itemEl.classList.add('activation-none');
        }
      });
    });
}

window.addEventListener('load', populateActivations);
