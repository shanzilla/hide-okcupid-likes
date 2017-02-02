// Saves options to chrome.storage
function save_options() {
  if (
  var state = document.querySelector('input[name=state]:checked').value;
  chrome.storage.sync.set({
    state: state
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores radio button selection using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    state: 'hide'
  }, function(items) {
    document.forms["stateSelection"][items.state].checked=true;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
