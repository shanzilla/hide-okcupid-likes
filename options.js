function save_options() {
  var state = document.querySelector('input[name=state]:checked').value;
  chrome.storage.sync.set({
    state: state
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    status.style.display = 'block';
    setTimeout(function() {
      status.textContent = '';
      status.style.display = 'none';
    }, 3000);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    state: 'hide'
  }, function(items) {
    document.forms["stateSelection"][items.state].checked=true;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
