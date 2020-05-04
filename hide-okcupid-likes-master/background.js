var state;

chrome.storage.sync.get({state: true}, function(data) {
    state = data.state;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace == 'sync' && 'state' in changes) {
        state = changes.state.newValue;
    }
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'listenForReady') {
        sendResponse({action: 'addClasses', state: state});
    }
});

chrome.webNavigation.onCommitted.addListener(function(navDetails) {
    var repetitions = 20;
    var delayMs = 20;

    send();

    function send() {
        chrome.tabs.sendMessage(
            navDetails.tabId,
            {action: 'addClasses', data: state},
            {frameId: navDetails.frameId}
        );

        if (--repetitions) {
            setTimeout(send, delayMs);
        }
      }
});
