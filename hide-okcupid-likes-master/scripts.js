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
            case 'changeLabel':
                ratingsElem.className += ' change_label';
                ratingsElem.getElementsByClassName("navbar-link-text")[0].innerText = "Intros";
                ratingsElem.href="/intros";

                ratingsElem.onclick = function() {
                  window.onunload = function() {
                    alert("You're leaving this page.");
                  };
                  window.location.href="https://www.okcupid.com/intros";
                };
                break;
            case 'default':
                ratingsElem.className += ' do_nothing';
                break;
            default:
                // Do nothing
        }

        observer.disconnect();
    }
}
