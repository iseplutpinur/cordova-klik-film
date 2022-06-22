const config = {
    app_name: 'spa',
    base_url: window.location.protocol + "//" + window.location.host + window.location.pathname,
    home: 'home',
};

const menus = [
    {
        name: 'home',
        title: 'Home',
        url: './page/home.html',
        icon: `
            <svg class="bi bi-house" width="20" height="20" viewBox="0 0 16 16" fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z">
            </path>
            <path fill-rule="evenodd"
                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z">
            </path>
            </svg>
        `,
    },
    {
        name: 'favorite',
        title: 'Favorite',
        url: './page/favorite.html',
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
        `,
    },
    {
        name: 'settings',
        title: 'Settings',
        url: './page/setting.html',
        icon: `
            <svg class="bi bi-gear" width="20" height="20" viewBox="0 0 16 16" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z">
                </path>
                <path fill-rule="evenodd"
                    d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z">
                </path>
            </svg>
        `,
    },
];
let page_now = {};

$(document).ready(function (jquery_e) {
    function app() {
        renderMenuBottom();
        if (params().page) {
            const page = getNavigation(params().page);
            if (!page) return;
            callPage(page.url, page.name);
        } else {
            const default_home = getNavigation(config.home);
            callPage(default_home.url, default_home.name);
        }
    }

    app();

    $(window).on('popstate', function (event) {
        const page = getNavigation(params().page);
        // cek apakah halaman nya sama
        if (page_now.name != page.name) {
            callPage(page.url, page.name, {}, false);
        }
    });
})


function callPage(page, name, props = {}, history = true) {
    locStrSet('props', props);
    $.ajax({
        url: page,
        dataType: "text",
        type: "GET",
        success: function (data) {
            setLoader(false);
            const data_nav = getNavigation(name);
            if (!data_nav) return;
            if (history) window.history.pushState(data_nav, data_nav.title, `${config.base_url}?page=${data_nav.name}`);
            $('#content-master').html(data);
            setTitle(data_nav.title);
            renderMenuBottom(data_nav.name);
            renderMenuSide(data_nav.name);
            page_now = data_nav;
        },
        error: function (data) {
            console.log('the page was NOT loaded', data);
        },
        complete: function (xhr, status) {
            console.log('The request is complete!');
        }
    });
}


function setTitle(title) {
    document.title = (title ? `${title} | ` : '') + config.app_name;
}

function renderMenuBottom(active = false) {
    const container = $('#footerNav');
    container.html('');
    menus.forEach(e => {
        const active_class = e.name == active ? ' class="active" ' : '';
        const onclick = e.url == '#' ? '' : `onclick="callPage('${e.url}', '${e.name}')"`;
        container.append(`
        <li${active_class}>
            <a href="javascript:;" ${onclick}>
                ${e.icon}
                <span ${active_class ? '' : 'class="text-white"'}>${e.title}</span>
            </a>
        </li>
        `);
    })
}

function renderMenuSide(active = false) {
    const container = $('#siderNav');
    container.html('');
    menus.forEach(e => {
        const active_class = e.name == active ? ' class="text-warning" ' : '';
        const onclick = e.url == '#' ? '' : `onclick="callPage('${e.url}', '${e.name}')"`;
        container.append(`
        <li><a ${active_class} ${onclick} href="javascript:;">${e.icon} <span class="ms-2">${e.title}</span></a></li>
        `);
    })
}

function params() {
    return parseQueryString(String(window.location.search).replaceAll('?', ''));
}

function parseQueryString(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair.shift());
        var value = decodeURIComponent(pair.join("="));
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = value;
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], value];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(value);
        }
    }
    return query_string;
}

function getNavigation(name) {
    let result = false;
    menus.forEach(e => {
        if (e.name == name) result = e;
    });
    return result;
}


function setLoader(show = true) {
    if (show) {
        $('#loader').fadeIn();
    } else {
        $('#loader').fadeOut();
    }
}

setLoader(false);