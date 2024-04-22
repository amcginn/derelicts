// parse page for hTags and create an unordered list automatically. 
$(function() {
  let topLevel= 2; // the h-level to start parsing
  let botLevel = 6; // the h-level to end parsing
  let hTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  let prev = '';
  let ulTree = [] // track nested lists to return to the correct level
  let root = $('.toc'); // element where the TOC is displayed
  let rootUl = $('<ul>');

  root.append(rootUl);
  ulTree.push(rootUl);

  $(hTags.slice(topLevel - 1, botLevel).join(', section ')).each(function(){

    let compare = prev.localeCompare(this.nodeName.toLowerCase());
    prev = this.nodeName.toLowerCase();

    if (compare < 0) {
      let li = null;
      if (ulTree.at(-1).lastChild) {
        li = ulTree.at(-1).lastChild;
      } else {
        li = $('<li>');
        ulTree.at(-1).append(li);
      }

      ul = $('<ul>')
      li.append(ul);
      ulTree.push(ul);
    } else if (compare > 0) {
      ulTree.pop();
    }

    let ulNode = ulTree.at(-1);
    let thisLi = $('<li>');
    let a = $('<a>', {
      text: $(this).text(),
      href: '#' + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'')
    });

    thisLi.append(a);

    ulNode.append(thisLi)
  });
});
