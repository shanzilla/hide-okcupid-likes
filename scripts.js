var hasData = false;

chrome.runtime.sendMessage({action: 'listenForReady'}, addClasses);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'addClasses') {
        addClasses(msg);
    }
});

function addClasses(data) {
    if (hasData || !data || !data.state) return;

    hasData = true;

    new MutationObserver(onMutation).observe(document, {
        childList: true, // report added/removed nodes
        subtree: true,   // observe any descendant elements
    });

    function onMutation(mutations, observer) {
        var ratingsElem = document.getElementById('nav_ratings');

        if (!ratingsElem) return;

        switch (data.state) {
            case 'hide':
                ratingsElem.className += ' hide_count';
                break;
            case 'color':
                ratingsElem.className += ' disable_color';
                break;
            case 'hideBtn':
                ratingsElem.className += ' hide_btn';
                break;
            default:
                // Do nothing
        }

        observer.disconnect();
    }
}
