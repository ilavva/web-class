function load_html(list_url, callback) {
    fetch(list_url)
        .then((response) => response.text())
        .then((text) => callback(text));
}
function load_json(list_url, callback) {
    fetch(list_url)
        .then((response) => response.json())
        .then((text) => callback(text));
}

function create_html(json, role) {
    let html = "";
    if (role == "navbar") {
        html += `<nav  role="navigation" class="sites-header-nav-container">
    <ul class="sites-header-nav">`;
    }
    else {
        html += ` <ul class="links">`;
    }
    for (const li of json["web"]) {
        html += `<li>`;
        html += `<a href="${li["href"]}">${li["text"]}</a>`;
        if (li["links"]) {
            if (role == "navbar") {
                html += `<ul class="dropdown">`;
            } else {
                html += `<ul>`;
            }
            for (const dli of li["links"]) {
                html += `<li>`;
                html += `<a id="${dli["id"]}" href="${dli["href"]}">${dli["text"]}</a>`;
                html += `</li>`;
            }
            html += `</ul>`;
        }
        html += `</li>`;
    }
    html += ` </ul>`;
    if (role == "navbar") {
        html += `    </nav >`;
    }
    return html;
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
    const listNavBars = document.querySelectorAll(".nav_links");
    if (listNavBars.length > 0) {
        for (let index = 0; index < listNavBars.length; index++) {
            const nav_links_json = "./nav_links.json";
            const role = listNavBars[index].getAttribute("role");
            load_json(nav_links_json, (json) => {
                listNavBars[index].innerHTML = create_html(json, role);
            });
        }
    }
}

load_included_html();
