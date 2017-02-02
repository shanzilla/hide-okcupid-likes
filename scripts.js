chrome.storage.sync.get("state", function (obj) {
    var ratingsElem = document.getElementById('nav_ratings');

    switch (obj.state) {
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
});
