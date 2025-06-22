document.addEventListener("DOMContentLoaded", () => {
    /* Project Card Setup */
    setupProjectCards(); // must run this function before setting up project observers

    /* Intersection Observers */
    setupNavlinkObservers();
    setupProjectObservers();
});

function setupProjectCards() {
    // Set information for projects
    const projectInformationEntries = [];

    const cacheProject = {
        title: "Direct-Mapped Write-Back Trace-Based Cache Simulator",
        description:
            "A trace-driven cache simulator implementing a direct-mapped \n" +
            "write-back cache hierarchy with configurable L1, L2, and L3 \n" +
            "caches. Designed to test the SPEC95 benchmarks.",
        visual_link: "assets/project-icons/window-icon_cache.png",
        github_link: "https://github.com/tp-neal/dev-projects/tree/main/Cache",
    };
    projectInformationEntries.push(cacheProject);

    const rpcProject = {
        title: "RPC System Calls",
        description:
            "A client-server application using RPC to enable remote execution \n" +
            "of file system calls (e.g., open, read, write) on a server. \n" +
            "Focused on network communication protocols and data marshalling \n" +
            "between client and server processes.",
        visual_link: "assets/project-icons/window-icon_server.png",
        github_link: "https://github.com/tp-neal/dev-projects/tree/main/RPCSysCalls",
    };
    projectInformationEntries.push(rpcProject);

    const cmdLineProject = {
        title: "Command-Line Logger",
        description:
            "A command-line utility to execute commands while capturing their \n" +
            "stdin, stdout, and stderr to log files and simultaneously \n" +
            "displaying real-time terminal output. Contains robust file \n" +
            "descriptor management and inter-process data piping.",
        visual_link: "assets/project-icons/window-icon_terminal.png",
        github_link: "https://github.com/tp-neal/dev-projects/tree/main/CommandLog",
    };
    projectInformationEntries.push(cmdLineProject);

    // Create html generator for cards
    function projectHTMLGenerator() {
        let id = 1;
        let isLeft = true;

        const generator = (projectInformation) => {
            let side = isLeft ? "left" : "right";

            const projectCardHTML = /*html*/ `
                <div
                    id="project-${id}"
                    class="project-card project--${side}-aligned"
                >
                    <img
                        class="project-card__container-image"
                        src="${projectInformation.visual_link}"
                        alt="Cache Simulator Project Container"
                    />

                    <div class="project-card__text-content">
                        <h3 class="project-card__title">
                            ${projectInformation.title}
                        </h3>
                        <p class="project-card__description">
                            ${projectInformation.description}
                        </p>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-card__repo-link"
                            href="${projectInformation.github_link}"
                            ><span class="button project-card__repo-button"
                                >github repo</span
                            >
                        </a>
                    </div>
                </div>
            `;

            // handle incremental logic
            id++;
            isLeft = !isLeft;

            return projectCardHTML;
        };

        return generator;
    }

    // Get container for project entries
    const projectCardsContainer = document.querySelector(".projects-section__grid");
    if (!projectCardsContainer) {
        console.error("Could not find project cards container");
    }

    // Insert each project card into parent container
    const generator = projectHTMLGenerator();
    for (const projectInformation of projectInformationEntries) {
        projectCardsContainer.innerHTML += generator(projectInformation);
    }
}

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
        threshold: 0.1,
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
