function add_quickref_item(parent, data, type) {
  var icon = data.icon || "perspective-dice-six-faces-one";
  var subtitle = data.subtitle || "";
  var title = data.title || "[no title]";

  var item = document.createElement("div");
  item.className += "item itemsize"
  item.innerHTML =
  '\
  <div class="item-icon iconsize icon-' + icon + '"></div>\
  <div class="item-text-container text">\
    <div class="item-title">' + title + '</div>\
    <div class="item-desc">' + subtitle + '</div>\
  </div>\
  ';

  var style = window.getComputedStyle(parent.parentNode.parentNode);
  var color = style.backgroundColor;

  item.onclick = function () {
    show_modal(data, color, type);
  }

  parent.appendChild(item);
}

function show_modal(data, color, type) {
  var title = data.title || "[no title]";
  var subtitle = data.description || data.subtitle || "";
  var bullets = data.bullets || [];
  var reference = data.reference || "";
  type = type || "";
  color = color || "black"

  $("#modal-container").css("background-color", color).css("border-color", color);
  $("#modal-title-title").text(title);
  $("#modal-title-type").text(type);
  $("#modal-title-icon").addClass("icon-" + data.icon);
  $("#modal-subtitle").text(subtitle);
  $("#modal-reference").text(reference);
  $("body").addClass("modal-open");
  $("#modal").addClass("modal-visible");

  var bullets_html = bullets.map(function (item) { return "<p class=\"fonstsize\">" + item + "</p>"; }).join("\n<hr>\n");
  $("#modal-bullets").html(bullets_html);
}

function hide_modal() {
  $("body").removeClass("modal-open");
  $("#modal").removeClass("modal-visible");
  $("#modal-title-icon").removeClass().addClass("item-icon");
}

function fill_section(data, parentname, type) {
  var parent = document.getElementById(parentname);
  data.forEach(function (item) {
    add_quickref_item(parent, item, type);
  });
}

function init() {
  fill_section(data_characters, "basic-characters", "Character");
  fill_section(data_movement, "basic-movement", "Move");
  fill_section(data_action, "basic-actions", "Action");
  fill_section(data_bonusaction, "basic-bonus-actions", "Bonus action");
  fill_section(data_reaction, "basic-reactions", "Reaction");
  fill_section(data_condition, "basic-conditions", "Condition");
  fill_section(data_environment_obscurance, "environment-obscurance", "Environment");
  fill_section(data_environment_light, "environment-light", "Environment");
  fill_section(data_environment_vision, "environment-vision", "Environment");
  fill_section(data_environment_cover, "environment-cover", "Environment");

  var modal = document.getElementById("modal");
  modal.onclick = hide_modal;

  $("#modal-container").click(
    function(e){e.stopPropagation()}
  );
  $('.modal .type-container img').click(
    function() {hide_modal()}
  );
}

$(window).load(init);
