import dashboard from "./views/dashboard";

const router = async () => {
    const routes = [
        { path: "/", view: dashboard},
        { path: "/posts", view: () => console.log("Posts")},
        { path: "/", view: () => console.log("Settings")}
    ];

    //Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname == route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate",router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.marches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
});