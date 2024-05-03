function initFilters() {
  // objects
  let objectsFilter = document.querySelector('.item-filters input.objects');

  objectsFilter.addEventListener('click', () => {
    let objectItems = document.querySelectorAll('.item.type-object');

    objectItems.forEach((item) => {
      item.classList.toggle('hidden')
    });

    objectsFilter.classList.toggle('filtered');
  });

  // features
  let featuresFilter = document.querySelector('.item-filters input.features');

  featuresFilter.addEventListener('click', () => {
    let featureItems = document.querySelectorAll('.item.type-feature');

    featureItems.forEach((item) => {
      item.classList.toggle('hidden')
    });

    featuresFilter.classList.toggle('filtered');
  });

  // maneuvers
  let maneuversFilter = document.querySelector('.item-filters input.maneuvers');

  maneuversFilter.addEventListener('click', () => {
    let maneuverItems = document.querySelectorAll('.item.type-maneuver');

    maneuverItems.forEach((item) => {
      item.classList.toggle('hidden')
    });

    maneuversFilter.classList.toggle('filtered');
  });

  // spells
  let spellsFilter = document.querySelector('.item-filters input.spells');

  spellsFilter.addEventListener('click', () => {
    let spellItems = document.querySelectorAll('.item.type-spell');

    spellItems.forEach((item) => {
      item.classList.toggle('hidden')
    });

    spellsFilter.classList.toggle('filtered');
  });
}

// window.addEventListener('load', initFilters);
