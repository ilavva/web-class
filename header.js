function load_html(list_url, callback) {
    fetch(list_url)
        .then((response) => response.text())
        .then((text) => callback(text));
}
function load_header() {
    load_html('./nav_links.html', (html) => {
        document.querySelector("#navbar").innerHTML = html;
    });
}

load_header();