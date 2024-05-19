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

function create_navbar_html(json, role) {
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

function create_questions_html(json, includeSolutions) {
    let html = "";

    for (const li of json["questions"]) {
        if (li["text"]) {
            html += `<hr><br> <h3> ${li["text"]} </h3>`;

        }
        html += `<li>`;

        if (li["question"]) {
            html += `<br> ${li["question"]} `;
            if (includeSolutions && li["solution_code"]) {
                html += `<code class="max_width_600"> ${li["solution_code"]} </code>`;
            }
        }

        html += `</li>`;
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
                listNavBars[index].innerHTML = create_navbar_html(json, role);
            });
        }
    }

    const listLoadData = document.querySelectorAll(".load_data");
    if (listLoadData.length > 0) {
        for (let index = 0; index < listLoadData.length; index++) {
            const elemLoadData = listLoadData[index];
            //<ol class="question load_data" data-src="northwindsqlexer1.json" show-solutions="no">
            const data_src_filename = elemLoadData.getAttribute("data-src");
            const includeSolutions = (elemLoadData.getAttribute("show-solutions") === "yes");
            load_json(data_src_filename, (json) => {
                elemLoadData.innerHTML = create_questions_html(json, includeSolutions);
            });
        }
    }
}

load_included_html();
