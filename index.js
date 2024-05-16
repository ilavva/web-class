function load_html(list_url, callback) {
    fetch(list_url)
        .then((response) => response.text())
        .then((text) => callback(text));
}
function load_included_html() {
    if (document.querySelectorAll("#this-page-url")) {
        let filename = window.location.pathname;
        filename = filename.replace('.html', '');
        filename = filename.replace('-', ' ');
        filename = filename.replace('/', ' ').trim();
        if (filename === "index") {
            filename = "HTML 5";
        }
        document.querySelector("#this-page-url").innerHTML = filename;
    }
    const listNodesToUpdate = document.querySelectorAll(".source_html");
    if (listNodesToUpdate.length > 0) {
        for (let index = 0; index < listNodesToUpdate.length; index++) {
            const element = listNodesToUpdate[index];
            const filename = element.getAttribute("data-src");
            load_html(`./${filename}`, (html) => {
                element.innerHTML = html;
            });
        }

    }
}

load_included_html();
