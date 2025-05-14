document.addEventListener("DOMContentLoaded", () => {
    setupNavlinkObservers();
    setupProjectObservers();
});

function setupNavlinkObservers() {
    const home = document.getElementById("home");
    const about = document.getElementById("about");
    const contact = document.getElementById("contact");
    const projects = document.getElementById("projects");

    const homeNav = document.querySelector(".navbar__link--home");
    const aboutNav = document.querySelector(".navbar__link--about");
    const contactNav = document.querySelector(".navbar__link--contact");
    const projectsNav = document.querySelector(".navbar__link--projects");

    const navs = new Map();
    navs.set(home, homeNav);
    navs.set(about, aboutNav);
    navs.set(contact, contactNav);
    navs.set(projects, projectsNav);

    const homeOptions = {
        root: null,
        threshold: 0.6,
    };

    const aboutOptions = {
        root: null,
        threshold: 0.2,
    };

    const projectOptions = {
        root: null,
        threshold: 0.3,
    };

    const contactOptions = {
        root: null,
        threshold: 0.8,
    };

    function handleIntersection(entries, observer) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                navs.get(entry.target).classList.add("navbar__link--active");
            } else {
                navs.get(entry.target).classList.remove("navbar__link--active");
            }
        }
    }

    const homeObserver = new IntersectionObserver(handleIntersection, homeOptions);
    const aboutObserver = new IntersectionObserver(handleIntersection, aboutOptions);
    const projectObserver = new IntersectionObserver(handleIntersection, projectOptions);
    const contactObserver = new IntersectionObserver(handleIntersection, contactOptions);

    homeObserver.observe(home);
    aboutObserver.observe(about);
    projectObserver.observe(projects);
    contactObserver.observe(contact);
}

function setupProjectObservers() {
    const projectList = [];

    const project1 = document.getElementById("project-1");
    const project2 = document.getElementById("project-2");
    const project3 = document.getElementById("project-3");

    projectList.push(project1);
    projectList.push(project2);
    projectList.push(project3);

    const projectsOptions = {
        root: null,
        threshold: 0.71,
    };

    function handleIntersection(entries, observer) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                console.log(`${entry.target.id} is visible`);
                if (entry.target.classList.contains("project--left-aligned")) {
                    entry.target.classList.add("project--left-active");
                } else if (entry.target.classList.contains("project--right-aligned")) {
                    entry.target.classList.add("project--right-active");
                }
            } else {
                entry.target.classList.remove("project--left-active");
                entry.target.classList.remove("project--right-active");
            }
        }
    }

    const projectObserver = new IntersectionObserver(handleIntersection, projectsOptions);

    for (const project of projectList) {
        projectObserver.observe(project);
    }
}
