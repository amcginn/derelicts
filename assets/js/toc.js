document.addEventListener("DOMContentLoaded", () => {
  let topLevel= 2; // h-level to start parsing
  let botLevel = 6;  // h-level to end parsing
  let hTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  let prev = '';
  let ulTree = [] 
  let root = document.querySelector(".toc"); 
  let rootUl = document.createElement('ul');

  root.append(rootUl);
  ulTree.push(rootUl);

  document.querySelectorAll(hTags.slice(topLevel - 1, botLevel).join(', section ')).forEach((hEl) => {

    let compare = prev.localeCompare(hEl.tagName.toLowerCase());
    prev = hEl.tagName.toLowerCase();

    if (compare < 0) {
      let li = null;
      if (ulTree.at(-1).lastChild) {
        li = ulTree.at(-1).lastChild;
      } else {
        li = document.createElement('li');
        ulTree.at(-1).append(li);
      }

      ul = document.createElement('ul')
      li.append(ul);
      ulTree.push(ul);
    } else if (compare > 0) {
      ulTree.pop();
    }

    let ulNode = ulTree.at(-1);
    let thisLi = document.createElement('li');
    let a = document.createElement('a')
    a.textContent = hEl.innerText;
    a.href = '#' + hEl.innerText.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'');

    thisLi.append(a);

    ulNode.append(thisLi)
  });
});