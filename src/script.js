const parseTerminalInstruction = (inst) => {
    const casedCommand = inst.split(' ')[0];
    const command = casedCommand.toLowerCase();
    switch (command) {
        case 'help':
            return {
                children: [
                    {
                        children: `You are accessing PortfoliOS's command-line interface (CLI.)`
                    },
                    {
                        children: `Refer to the following list for help writing commands.`
                    },
                    {
                        tag: 'table',
                        children: [
                            {
                                tag: 'tbody',
                                children: [
                                    {name: 'Name', desc: 'Description'},
                                    {name: 'help', desc: 'View this very menu'},
                                    {name: '...', desc: '...'}
                                ].map(c => {
                                    return {
                                        tag: 'tr',
                                        children: [
                                            {
                                                tag: 'td',
                                                children: c.name
                                            },
                                            {
                                                tag: 'td',
                                                children: c.desc
                                            }
                                        ]
                                    };
                                })
                            }
                        ]
                    }
                ]
            };
        default:
            return {
                className: 'red',
                children: `"${casedCommand}" is not a valid command. Type "help" for help.`
            };
    }
}

const BADGES = {
    html: {name: 'HTML', color: 'red'},
    css: {name: 'CSS', color: 'yellow'},
    js: {name: 'JavaScript', color: 'blue'},
    fakereact: {name: 'Object-to-DOM', color: 'blue', tooltip: {
        children: [
            {
                tag: 'p',
                children: [
                    {tag: 'b', className: 'blue', children: 'Object-to-DOM'},
                    ' (or less formally "',
                    {tag: 'b', className: 'blue', children: 'Fake React'},
                    '") is a customizable web programming paradigm in which a JavaScript object such as:',
                ]
            },
            {
                tag: 'ul',
                style: 'list-style-type: none',
                className: 'lightgrey padded',
                children: [
                    {
                        tag: 'li',
                        children: [
                            '{',
                            {
                                tag: 'ul',
                                style: 'list-style-type: none',
                                children: [
                                    {
                                        tag: 'li',
                                        children: [
                                            {tag: 'span', className: 'blue', children: 'tag'},
                                            ': ',
                                            {tag: 'span', className: 'green', children: '"span"'},
                                            ','
                                        ]
                                    },
                                    {
                                        tag: 'li',
                                        children: [
                                            {tag: 'span', className: 'blue', children: 'style'},
                                            ': ',
                                            {tag: 'span', className: 'green', children: '"color: green"'},
                                            ','
                                        ]
                                    },
                                    {
                                        tag: 'li',
                                        children: [
                                            {tag: 'span', className: 'blue', children: 'children'},
                                            ': ',
                                            {tag: 'span', className: 'green', children: '"Hello world"'}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'li',
                        children: '}'
                    }
                ]
            },
            {
                tag: 'p',
                children: [
                    ' can be rendered as a corresponding HTML element, i.e., ',
                    {tag: 'span', className: 'green', children: 'Hello world'},
                    '.'
                ]
            },
            {
                tag: 'p',
                children: 'This parallels React\'s notion of "components" using just native JavaScript.',
            },
            {
                tag: 'p',
                children: [
                    'I have been experimenting with this model as an alternative to React for functional web programming. I utilize a recursive ',
                    {tag: 'span', className: 'blue', children: 'render'},
                    '() method which I tweak from project to project.'
                ]
            },
            {
                tag: 'p',
                className: 'gentle',
                children: [
                    'This page was built using the ',
                    {
                        tag: 'span', className: 'blue', children: 'Object-to-DOM'
                    },
                    ' model!'
                ]
            }
        ]
        }},

    react: {name: 'React', color: 'blue'},
    typescript: {name: 'TypeScript', color: 'blue'},
    node: {name: 'Node.JS', color: 'green'},
    postgres: {name: 'Postgres', color: 'green'},
    socketio: {name: 'Socket.IO', color: 'white'},
    dbmgmt: {name: 'Database management', color: 'red'},

    astro: {name: 'Astro', color: 'red'},
    gsap: {name: 'GSAP', color: 'green'},

    cpp: {name: 'C++', color: 'yellow'},
    c: {name: 'C', color: 'yellow'},
    python: {name: 'Python', color: 'yellow'},
    java: {name: 'Java', color: 'blue'},

    ml: {name: 'Machine learning', color: 'red'},
    ai: {name: 'AI', color: 'white'},

    solo: {name: 'Solo development', color: 'green'},
    agile: {name: 'Agile management', color: 'yellow'},
    mosaiq: {name: 'Mosaiq project', color: 'red'},
    team: {name: 'Large team', color: 'red'},
    leadership: {name: 'Leadership', color: 'white'}

}

const PROJECTS = [
    {
        name: 'Card Domain',
        icon: '🃏',
        subtitle: 'Card gaming web app',
        timeframe: 'July–September 2025',
        badges: [BADGES.react, BADGES.typescript, BADGES.node, BADGES.socketio, BADGES.mosaiq, BADGES.leadership],
        images: [
            {path: './assets/projects/crdconfig.png', alt: 'The card configs menu of a Card Domain room.'},
            {path: './assets/projects/crdaction.png', alt: 'A Card Domain room in action, with one card being moved between players\' hands.'},
        ],
        url: 'https://carddomain.mosaiq.dev/',
        description: [
            'Card Domain is a platform for online multiplayer card-based gameplay. It has a powerful breadth of features for user-driven card games; users can create decks from scratch and have total control over key game state elements such as card visibility and distribution. This powerful customization allows for a large variety of card games to be easily emulated.',
            'Card Domain was developed with the team at Mosaiq Software. I was initially the solo developer for Card Domain but later became project manager as the team grew. I designed its Socket.IO-based event architecture as well as the configs and gameplay UI, which uses the Mantine components library and a versatile drag-and-drop system developed in-house.',
            'This project was the result of my first time acting as project manager for a project which was truly my own from conception to production. Card Domain is the only online multiplayer card gaming platform with full deck visibility and built-in features for shuffling, flipping and moving selections of cards.'
        ]
    },
    {
        name: 'PerfFlowAspect',
        icon: '📊',
        subtitle: 'HPC profiling tool',
        timeframe: 'August 2025–Present',
        badges: [BADGES.cpp, BADGES.python, BADGES.team],
        images: [
            {path: './assets/projects/pfaperfetto.png', alt: 'A Perfetto view of a PerfFlowAspect output file.'}
        ],
        url: 'https://github.com/flux-framework/PerfFlowAspect/',
        urlIsGit: true,
        description: [
            'PerfFlowAspect is a project in development by High Performance Computing (HPC) researchers at Lawrence Livermore National Laboratory (LLNL). It is an LLVM-based profiler for multi-process HPC applications in Python or C++ and records performance information in the Chrome Trace Format which can be visualized using tools like Perfetto.',
            'PerfFlowAspect is based on the design paradigm of aspect-oriented programming, a modularization approach that allows it to separate data measurement from source code.',
            'For my senior year project at WPI, I am developing several enhancements for this tool, including identifying and fixing LLVM bugs, porting to newer versions of Clang, and developing benchmarks.'
        ]
    },
    {
        name: 'mosaiq.dev',
        icon: '💠',
        subtitle: 'Stylish online portfolio',
        timeframe: 'September–October 2025',
        badges: [BADGES.astro, BADGES.gsap, BADGES.mosaiq, BADGES.agile],
        images: [
            {path: './assets/projects/msqhome.png', alt: 'The snazzy Mosaiq portfolio homepage.'},
            {path: './assets/projects/msqprojs.png', alt: 'The Mosaiq portfolio projects and contact menus.'},
        ],
        url: 'https://mosaiq.dev/',
        description: [
            'mosaiq.dev is the homepage of Mosaiq Software, a collective of WPI-based web developers of which I have been a proud member since May 2025. Its sleek, fluid design was made with the GSAP animation platform and the Astro framework. I contributed design and functionality to several pages of the site including the home and contact pages.'
        ]
    },
    {
        name: 'Terrazzo',
        icon: '🗃️',
        subtitle: 'Feature-packed kanban platform',
        timeframe: 'May–August 2025',
        badges: [BADGES.react, BADGES.typescript, BADGES.node, BADGES.socketio, BADGES.mosaiq],
        images: [
            {path: './assets/projects/trzusage.png', alt: 'Terrazzo in use, with one task being moved to the \'Done\' column.'},
            {path: './assets/projects/trzspace.png', alt: 'Terrazzo\'s main menu, with a list of organizations, boards and projects.'},
        ],
        url: 'https://terrazzo.mosaiq.dev/',
        description: [
            'Terrazzo is a kanban-style project management application originally built to streamline internal operations at Mosaiq Software. It quickly grew into a more robust platform complete with a professional suite of features, including real-time updates and fully customizable boards.',
            'I developed and enhanced various features, including the markdown system utilized by Terrazzo\'s task description editor and the ability for tasks to list other tasks as \'blockers.\''
        ]
    },
    {
        name: 'Brigham & Women\'s Hospital Web App',
        icon: '🏥',
        subtitle: 'Healthcare & navigation tool',
        timeframe: 'March–May 2025',
        badges: [BADGES.react, BADGES.typescript, BADGES.node, BADGES.postgres, BADGES.team, BADGES.leadership],
        images: [
            {path: './assets/projects/bwhhome.png', alt: 'The home page of the Brigham & Women\'s Hospital web app.'},
            {path: './assets/projects/bwhmap.png', alt: 'The map page, which utilizes Google Maps for display and navigation.'},
            {path: './assets/projects/bwheditor.png', alt: 'The editor for the floor plan navigation system.'},
            {path: './assets/projects/bwhrequest.png', alt: 'The service requests form, filled out with a sanitation request.'},
            {path: './assets/projects/bwhdataviz.png', alt: 'Data visualization components for logged service requests.'},
            {path: './assets/projects/bwhforum.png', alt: 'The forum page, populated with posts from BWH frequenters.'}
        ],
        url: 'https://github.com/asantagata/cs3733-team-p',
        urlIsGit: true,
        description: [
            `A robust, full-stack web platform for healthcare and navigation. The Brigham & Women's Hospital web app includes an Auth0-based login system, a Google Maps-based directory and navigation page including a full suite of voice controls, a service requests system for hospital staff, and a live forum.`,
            `Over an intensive five-week term, I led a team of ten software developers in an Agile environment, coordinating weekly sprint planning and daily stand-up meetings. I was responsible for several key features, including the navigation system, the editor of the floor plan, and command parsing for the voice-activated navigation UI.`
        ]
    },
    {
        name: 'Amazon Rating ML Model',
        icon: '⭐',
        subtitle: 'Business-facing AI service',
        timeframe: 'September 2025–Present',
        badges: [BADGES.python, BADGES.ml],
        url: 'https://github.com/esthermao/CS4342_finalproject',
        urlIsGit: true,
        description: [
            'A Python-based machine learning model which estimates the average star rating of an Amazon product given various data, including its description, price, and the text content of reviews. The model uses word2vec encodings for natural language processing and scikit-learn for machine learning utilities.',
            'This model is being developed in a team of 5 as part of a course at WPI.'
        ]
    },
    {
        name: 'Lasker Morris AI',
        icon: '♟️',
        subtitle: 'Game-playing AI models',
        timeframe: 'February–March 2025',
        badges: [BADGES.java, BADGES.ai, BADGES.ml],
        images: [
            {path: './assets/projects/Gabor.png', alt: 'A game between two instances of Gabor, visualized with Jake Molnia\'s Lasker Morris Referee program.'},
        ],
        url: 'https://github.com/asantagata/lasker-morris-player-gabor',
        urlIsGit: true,
        description: [
            [`A Java-based AI model which uses the minimax game-playing algorithm with alpha-beta pruning and iterative descent to play the ancient strategy game of Lasker Morris using `,
                {tag: 'a', className: 'blue', href: 'https://jake-molnia.github.io/CS4341-referee/', target: '_blank', children: `Jake Molnia's Lasker Morris Referee Program`},
            `.`],
            'A second model which decides its moves using the Google Gemini LLM API is also included, allowing for comparison between minimax and LLM-driven gameplay.'
        ]
    },
    {
        name: 'Nantucket Tree Inventory',
        icon: '🗺️',
        subtitle: 'Database and GIS tool',
        timeframe: 'August–December 2024',
        badges: [BADGES.leadership, BADGES.dbmgmt],
        images: [
            {path: './assets/projects/treemap.png', alt: 'A \'Google My Maps\' visualization of the Nantucket tree data.'},
            {path: './assets/projects/treegis.png', alt: 'The collected Nantucket tree data as visualized on the Nantucket MapGeo GIS layer.'},
            {path: './assets/projects/treedata.png', alt: 'Creative data visualization representing species of Nantucket trees.'},
        ],
        url: 'https://nantucketma.mapgeo.io/',
        description: [
            `A database and GIS layer representing the town-owned trees of Nantucket, Massachusetts, developed in collaboration with Nantucket's Department of Public Works. I led a four-student team in organizing and filling gaps in a large dataset and converting data into a GIS-compatible format. The resulting layer is now live on Nantucket's GIS system and sees regular use by its local government.`,
        ]
    },
    {
        name: 'Memory Management Unit',
        icon: '💿',
        subtitle: 'Computing simulation',
        timeframe: 'February 2024',
        badges: [BADGES.c, BADGES.solo],
        images: [
            {path: './assets/projects/mmu.png', alt: 'The output from the memory management unit given a sequence of instructions.'},
        ],
        url: 'https://github.com/asantagata/memory-manager-unit',
        urlIsGit: true,
        description: [
            'A C-based simulation of a memory management unit which can systematically allocate and deallocate virtual memory for several simulated processes. It also simulates reading to and writing from disk using a text file.',
            'This project was developed for Operating Systems at WPI.'
        ]
    }
]

const GAMES = [
    {
        name: 'Flip 7',
        icon: '🎴',
        className: 'flip7',
        description: [
            'In this high-risk, high-reward, blackjack-like card game, players compete to accumulate high cards while trying to avoid duplicates.',
            'This project takes the form of one page with smooth animations and simple UI, which a host can stream or display to friends for remote or in-person gameplay.'
        ],
        badges: [BADGES.html, BADGES.css, BADGES.fakereact, BADGES.solo],
        images: [
            {path: './assets/games/flip7.png', alt: 'The main Flip 7 gameplay UI.'}
        ],
        timeframe: 'June 2025',
        url: 'https://boardgames.alexsantagata.dev/flip7/flip7.html'
    },
    {
        name: 'One Night Ultimate Werewolf',
        icon: '🐺',
        className: 'onuw',
        description: [
            'In this hidden-role game, players complete secret tasks over the course of the night and must strategically identify the secret werewolves.',
            'This project takes the form of one page with smooth animations and a terminal-like UI. The project includes over 20 functional roles with individual and cumulative actions. Players are given encrypted "action codes" representing their secret actions over the course of the night, which can be transferred seamlessly using easy copy-paste functionality.'
        ],
        badges: [BADGES.html, BADGES.css, BADGES.js, BADGES.solo],
        images: [
            {path: './assets/games/onuwconfig.png', alt: 'The One Night Ultimate Werewolf configs menu.'},
            {path: './assets/games/onuwgameplay.png', alt: 'One Night Ultimate Werewolf gameplay with cards in motion.'},
            {path: './assets/games/onuwvotes.png', alt: 'The climactic turnout of a One Night Ultimate Werewolf game.'}
        ],
        timeframe: 'February–March 2025',
        url: 'https://boardgames.alexsantagata.dev/ONUW/client.html'
    },
    {
        name: 'Wandering Towers',
        icon: '🏯',
        className: 'wandy',
        description: [
            'In this strategy board game, players manipulate both a team of wizards and the towers on which they stand to try to move all of their own wizards into the Ravenskeep.',
            'This project takes the form of two pages, a "server" page and a "client" page. The "server" page, which a host can stream or display to friends, includes rich 3d animations and an easy-to-use UI for controls over a large 3d game board. The mobile-compatible "client" page shows individual players their action cards.'
        ],
        badges: [BADGES.html, BADGES.css, BADGES.js, BADGES.solo],
        images: [
            {path: './assets/games/wandering.png', alt: 'The main Wandering Towers gameplay UI.'}
        ],
        timeframe: 'July 2025',
        url: 'https://boardgames.alexsantagata.dev/wandering%20towers/server.html'
    },
]

const selectProj = (PID, index, resetSeekbar = false) => {
    const list = document.getElementById(`proj-stack-${PID}`);
    const selected = document.querySelector(`#proj-stack-${PID} .proj-stack-entry.selected`);
    const selectedIndex = Array.from(list.children).indexOf(selected);
    if (index === 'next') index = (selectedIndex + 1) % PROJECTS.length;
    if (index === 'prev') index = (selectedIndex - 1 + PROJECTS.length) % PROJECTS.length;
    const entry = list.children[index];
    if (entry.classList.contains('selected')) return;
    selected.classList.remove('selected');
    entry.classList.add('selected');
    entry.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
    document.getElementById(`proj-blurb-${PID}`).replaceChildren(
        render(appAuxTemplates.BLURB(PROJECTS[index], false))
    );
    document.getElementById(`current-track-${PID}`).replaceChildren(
        render(appAuxTemplates.CURRENT_TRACK(PROJECTS[index]))
    );
    if (resetSeekbar) {
        document.getElementById(`seekbar-${PID}`).style.animationName = 'none';
        document.getElementById(`seekbar-${PID}`).offsetHeight;
        document.getElementById(`seekbar-${PID}`).style.animationName = null;
    }
}

const appAuxTemplates = {
    TRANSMISSION: (PID) => {
        return {
            className: 'transmission-wrapper',
            children:
                [
                    {
                    className: 'transmission',
                    children: [
                        {
                            tag: 'span',
                            className: 'transmission-prefix',
                            children: [
                                {tag: 'span', className: 'green', children: 'Alex@PortfoliOS'},
                                ':',
                                {tag: 'span', className: 'blue', children: 'Desktop'},
                                ' $'
                            ]
                        },
                        {
                            tag: 'span',
                            className: 'transmission-editable',
                            contenteditable: 'plaintext-only',
                            spellcheck: 'false',
                            listeners: [
                                {
                                    type: 'click',
                                    listener: e => e.stopPropagation()
                                },
                                {
                                    type: 'keydown',
                                    listener: (e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            const transmission = document.querySelector(`#terminal-${PID} .transmission-wrapper:last-child`);
                                            transmission.children[0].children[1].setAttribute('contenteditable', 'false');
                                            transmission.children[1].replaceChildren(render(parseTerminalInstruction(transmission.children[0].children[1].innerText)));
        
                                            const terminal = document.getElementById(`terminal-${PID}`);
                                            terminal.appendChild(render(appAuxTemplates.TRANSMISSION(PID)));
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    onMount: () => {
                        document.querySelector(`#terminal-${PID} .transmission-wrapper:last-child .transmission-editable`).focus();
                    }
                },
                {
                    className: 'answer',
                }
            ]
        };
    },
    GAMEBOX: (PID, game, percent) => {
        return {
            className: `gamebox-wrapper`,
            style: `--percent: ${percent}`,
            id: `gamebox-${PID}-${game.className}`,
            children: [
                {
                    className: `gamebox ${game.className}`,
                    children: [
                        ...(new Array(4).fill({
                            className: `gamebox-tile`,
                            children: [
                                {className: 'gamebox-icon', children: game.icon},
                                {className: 'gamebox-name', children: game.name}
                            ]
                        })),
                        {
                            className: `gamebox-lid`,
                            children: percent === 0 ? [
                                {className: 'gamebox-icon', children: game.icon},
                                {className: 'gamebox-name', children: game.name}
                            ] : []
                        }
                    ]
                }
            ],
            listeners: [
                {
                    type: 'click',
                    listener: () => {
                        getWindowElementByPID(PID).querySelector(`#gamebox-stack-${PID} .gamebox-wrapper.selected`)?.classList.remove('selected');
                        document.getElementById(`gamebox-${PID}-${game.className}`).classList.add('selected');
                        document.getElementById(`game-blurb-${PID}`).replaceChildren(render(appAuxTemplates.BLURB(game, true)));
                    }
                }
            ]
        }
    },
    BLURB: (game, isGame) => {
        return {
            className: 'margin-auto flex-col gap',
            children: [
                {
                    className: 'between',
                    children: [
                        {
                            children: [
                                {tag: 'h2', children: `${game.icon ? `${game.icon} ` : ''}${game.name}`},
                                {className: 'gentle', children: game.timeframe},
                            ]
                        },
                        {
                            children: [
                                {
                                    tag: 'a',
                                    href: game.url,
                                    className: 'visit-button center-row gap',
                                    children: [
                                        ...(game.urlIsGit ? [{
                                            tag: 'span',
                                            innerHTML: SVGs.github
                                        }] : []),
                                        isGame ? 'Play' : 'Visit'
                                    ]
                                }
                            ]
                        }
                    ]
                },
                appAuxTemplates.BADGESET(game.badges),
                ...(game.images ? [
                    componentTemplates.CAROUSEL(game.images)
                ] : []),
                ...game.description.map(p => {
                    return {
                        tag: 'p',
                        children: p
                    }
                })
            ]
        };
    },
    BADGESET: (badges) => {
        return {
            className: 'flex badgeset',
            children: badges.map(badge => {
                return {
                    className: `badge ${badge.color} lightgrey ${badge.tooltip ? 'tooltip-badge' : ''}`,
                    children: badge.name,
                    ...(badge.tooltip ? {
                        listeners: [
                            {
                                type: 'click',
                                listener: () => summonModal(badge.tooltip)
                            }
                        ]
                    } : {})
                }
            })
        }
    },
    PROJ_ENTRY: (PID, proj, index, isSelected) => {
        return {
            className: `proj-stack-entry padded rounded-if-not-hacker ${isSelected ? 'selected' : ''}`,
            children: [
                {
                    className: 'flex gap',
                    style: 'font-weight: bold; align-items: center',
                    children: [
                        {
                            className: 'x-large',
                            children: proj.icon
                        },
                        {
                            children: proj.name
                        }
                    ]
                },
                {
                    className: 'gentle',
                    children: proj.subtitle
                }
            ],
            listeners: [
                {
                    type: 'click',
                    listener: () => {
                        selectProj(PID, index, true);
                    }
                }
            ]
        };
    },
    CURRENT_TRACK: (proj) => {
        return {
            className: 'flex gap',
            style: 'align-items: center',
            children: [
                {
                    className: 'trackicon',
                    children: proj.icon
                },
                {
                    className: 'trackname-wrapper',
                    children: {
                        className: 'trackname',
                        children: proj.name
                    }
                }
            ]
        }
    }
}

const applicationTypes = {
    BROWSER: 'browser',
    FILES: 'files',
    TERMINAL: 'terminal',
    SETTINGS: 'settings',
    TEXT: 'text',
    CHAT: 'chat',
    RECYCLE: 'recycle',
    GAMES: 'games',
    WORK: 'work',
    MODAL: 'modal'
}

const applications = {
    [applicationTypes.BROWSER]: {name: 'Browser', icon: '🌐'},
    [applicationTypes.FILES]: {name: 'Files', icon: '📂'},
    [applicationTypes.TERMINAL]: {name: 'Terminal', icon: '>_'},
    [applicationTypes.SETTINGS]: {name: 'Settings', icon: '⚙️'},
    [applicationTypes.TEXT]: {name: 'Text Editor', icon: '📄'},
    [applicationTypes.CHAT]: {name: 'Chat', icon: '💬'},
    [applicationTypes.RECYCLE]: {name: 'Recycle Bin', icon: '🗑️'},
    [applicationTypes.GAMES]: {name: 'Games', icon: '🎮'},
    [applicationTypes.WORK]: {name: 'Work', icon: '💼'},
    [applicationTypes.MODAL]: {name: 'Info', icon: 'ℹ️'}
}

const applicationTemplates = {
    [applicationTypes.WORK]: (PID) => {
        return {
            className: 'window-light padded flex gap',
            children: [
                {
                    className: 'proj-sidebar',
                    children: [
                        {
                            className: 'proj-stack',
                            id: `proj-stack-${PID}`,
                            children:
                                PROJECTS.map((proj, index) =>
                                    appAuxTemplates.PROJ_ENTRY(PID, proj, index, index === 0))
                        },
                        {
                            className: 'proj-listener padded flex-col gap',
                            children: [
                                {
                                    id: `current-track-${PID}`,
                                    children: appAuxTemplates.CURRENT_TRACK(PROJECTS[0])
                                },
                                {
                                    className: 'seekbar',
                                    id: `seekbar-${PID}`,
                                    listeners: [
                                        {
                                            type: 'animationiteration',
                                            listener: () => {
                                                selectProj(PID, 'next');
                                            }
                                        }
                                    ]
                                },
                                {
                                    className: 'center-row gap',
                                    children: [
                                        {
                                            className: 'music-button center padded rounded-if-not-hacker',
                                            innerHTML: SVGs.skipb,
                                            listeners: [
                                                {
                                                    type: 'click',
                                                    listener: () => {
                                                        selectProj(PID, 'prev', true);
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            className: 'music-button center padded rounded-if-not-hacker',
                                            id: `pause-${PID}`,
                                            innerHTML: SVGs.pause,
                                            listeners: [
                                                {
                                                    type: 'click',
                                                    listener: () => {
                                                        const playing = !document.getElementById(`pause-${PID}`).classList.contains('paused');
                                                        document.getElementById(`pause-${PID}`).classList.toggle('paused');
                                                        if (playing) {
                                                            document.getElementById(`pause-${PID}`).innerHTML = SVGs.play;
                                                            document.getElementById(`seekbar-${PID}`).style.animationPlayState = 'paused';
                                                        } else {
                                                            document.getElementById(`pause-${PID}`).innerHTML = SVGs.pause;
                                                            document.getElementById(`seekbar-${PID}`).style.animationPlayState = null;
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            className: 'music-button center padded rounded-if-not-hacker',
                                            innerHTML: SVGs.skipf,
                                            listeners: [
                                                {
                                                    type: 'click',
                                                    listener: () => {
                                                        selectProj(PID, 'next', true);
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    className: 'proj-blurb-wrapper',
                    children: {
                        className: 'proj-blurb margin-auto',
                        id: `proj-blurb-${PID}`,
                        children: appAuxTemplates.BLURB(PROJECTS[0], false)
                    }
                }
            ],
            onMount: () => selectProj(PID, 0, true)
        }
    },
    [applicationTypes.GAMES]: (PID) => {
        return {
            className: 'window-light padded flex gap',
            children: [
                {
                    className: 'gamebox-stack-wrapper flex',
                    children: [
                        {
                            className: 'gamebox-stack margin-auto',
                            id: `gamebox-stack-${PID}`,
                            children: GAMES.map((game, index) => appAuxTemplates.GAMEBOX(PID, game, index / (GAMES.length - 1)))
                        }
                    ]
                },
                {
                    className: 'game-blurb-wrapper',
                    children: {
                        className: 'game-blurb margin-auto',
                        id: `game-blurb-${PID}`,
                        children: {
                            className: 'center text-center gentle',
                            children: 'Select a game...'
                        }
                    }
                }
            ]
        }
    },
    [applicationTypes.CHAT]: () => {
        return {
            className: 'window-light padded',
            children: [
                {
                    className: 'center',
                    children: [
                        {innerHTML: SVGs.user},
                        'Alex Santagata'
                    ]
                },
                {
                    style: 'border-top: 2px solid var(--outline); margin-bottom: 1ch'
                },
                {
                    className: 'messages',
                    children:
                    [
                        `Hi, you've reached Alex Santagata.`,
                        `It looks like I'm not available to reply right now.`,
                        `To reach out, please contact me via one of the following:`,
                        {
                            children: [
                                `✉️: `,
                                {
                                    tag: 'a',
                                    className: 'blue',
                                    href: 'mailto:ajsantagata@wpi.edu',
                                    children: 'ajsantagata@wpi.edu'
                                }
                            ]
                        },
                        {
                            children: [
                                {
                                    tag: 'span',
                                    className: 'blue svg-container',
                                    innerHTML: SVGs.linkedin
                                },
                                ': ',
                                {
                                    tag: 'a',
                                    className: 'blue',
                                    href: 'https://www.linkedin.com/in/alex-santagata/',
                                    children: 'alex-santagata'
                                }
                            ]
                        },
                        {
                            children: [
                                {
                                    className: 'svg-container',
                                    innerHTML: SVGs.github
                                },
                                ': ',
                                {
                                    tag: 'a',
                                    className: 'blue',
                                    href: 'https://github.com/asantagata',
                                    children: 'asantagata'
                                }
                            ]
                        }
                    ].map(message => {
                        return {
                            className: 'message lightgrey rounded',
                            children: message
                        }
                    })
                }
            ]
        }
    },
    [applicationTypes.BROWSER]: () => {
        return {
            className: 'window-light padded',
            innerHTML: document.getElementById('wiki-template').innerHTML
        }
    },
    [applicationTypes.RECYCLE]: () => {
        return {
            className: 'window-light padded',
            children: [
                {
                    className: 'recyclables padded',
                    children: [
                        {icon: '📦', name: 'Cardboard box'},
                        {icon: '🥫', name: 'Tin can'},
                        {icon: '📰', name: 'Newspaper'}
                    ].map(recyclable => {
                        return {
                            className: 'recyclable center',
                            children: [
                                {
                                    className: 'recyclable-icon',
                                    children: recyclable.icon
                                },
                                {
                                    className: 'recyclable-label',
                                    children: recyclable.name
                                }
                            ]
                        }
                    })
                }
            ]
        }
    },
    [applicationTypes.TERMINAL]: (PID) => {
        return {
            className: 'window-dark padded',
            id: `terminal-${PID}`,
            children: [
                appAuxTemplates.TRANSMISSION(PID)
            ],
            listeners: [
                {
                    type: 'click',
                    listener: () => {
                        document.querySelector(`#terminal-${PID} .transmission-wrapper:last-child .transmission-editable`).focus();
                    }
                }
            ]
        }
    },
    [applicationTypes.SETTINGS]: (PID) => {
        return {
            className: 'window-light grid-2x2 gap padded',
            children: [
                'Theme',
                {
                    className: 'fullwidth around padded',
                    children: [
                        {name: 'Default', icon: '🖥️'},
                        {name: 'Hacker', icon: '🕶️'},
                        {name: 'Glass', icon: '🪟'}
                    ].map(theme => {
                        return {
                            tag: 'label',
                            'for': `theme-${theme.name}-${PID}`,
                            className: 'center gap',
                            children: [
                                {
                                    className: 'center',
                                    children: [
                                        {
                                            className: 'x-large',
                                            children: theme.icon
                                        },
                                        theme.name
                                    ]
                                },
                                {
                                    tag: 'input',
                                    type: 'radio',
                                    name: `theme-${PID}`,
                                    className: `theme-${theme.name}`,
                                    id: `theme-${theme.name}-${PID}`,
                                    value: theme.name,
                                    ...(desktop.theme === theme.name ? {checked: true} : {}),
                                    listeners: [
                                        {
                                            type: 'change',
                                            listener: (e) => {
                                                const theme = e.target.value;
                                                desktop.theme = theme;
                                                document.getElementById('viewport').classList.remove('default-theme', 'hacker-theme', 'glass-theme');
                                                document.getElementById('viewport').classList.add(`${theme.toLowerCase()}-theme`);
                                                for (const button of document.getElementsByClassName(`theme-${theme}`)) {
                                                    button.checked = true;
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    })
                },
                'Retro detail',
                {
                    tag: 'label',
                    className: 'fullwidth fullheight center padded',
                    'for': `retro-${PID}`,
                    children: [
                        {
                            tag: 'input',
                            type: 'checkbox',
                            id: `retro-${PID}`,
                            className: 'retro-checkbox',
                            ...(desktop.retro ? {checked: true} : {}),
                            listeners: [
                                {
                                    type: 'change',
                                    listener: (e) => {
                                        const checked = e.target.checked;
                                        desktop.retro = checked;
                                        if (checked) {
                                            document.getElementById('viewport').classList.add('retro');
                                        } else {
                                            document.getElementById('viewport').classList.remove('retro');
                                        }
                                        for (const checkbox of document.getElementsByClassName('retro-checkbox')) {
                                            checkbox.checked = checked;
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}

const launch = (launchType, template = null) => {
    const PID = nProcesses++;
    const application = applications[launchType];
    document.getElementById('footer-entries').appendChild(render(templates.FOOTER_ENTRY(launchType, PID, true)));
    if (template) {
        document.getElementById('arena').appendChild(render({
            ...templates.WINDOW(PID, application.name, {
                className: 'window-light padded flex',
                children: [
                    {
                        className: 'margin-auto',
                        children: template
                    }
                ]
            }, launchType),
        }));
    } else {
        document.getElementById('arena').appendChild(render({
            ...templates.WINDOW(PID, application.name, applicationTemplates[launchType](PID), launchType),
        }));
    }
}

const summonModal = (template) => launch(applicationTypes.MODAL, template)

const SVGs = {
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    right: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    battery: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-battery-medium-icon lucide-battery-medium"><path d="M10 14v-4"/><path d="M22 14v-4"/><path d="M6 14v-4"/><rect x="2" y="6" width="16" height="12" rx="2"/></svg>',
    weather: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sun-rain-icon lucide-cloud-sun-rain"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"/><path d="M11 20v2"/><path d="M7 19v2"/></svg>',
    wifi: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-icon lucide-wifi"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
    chevleft: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>',
    chevright: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
    portfolios: '<svg viewBox="0 0 82 32" xmlns="http://www.w3.org/2000/svg" fill="transparent" stroke="currentColor"><g transform="translate(1,1)" stroke-linecap="round" stroke-linejoin="round"><path d="M 0 30 V 10 l 8 4 V 21 L 0 17" /><path d="M 10 17 V 10 l 8 4 V 21 L 10 17" /><path d="M 20 21 V 10 l 8 4" /><path d="M 30 1 V 21 l 2 1" /><path d="M 38 25 l 2 1 V 1 l 2 1" /><path d="M 28 5 l 14 7" /><path d="M 44 17 V 10 l 8 4 V 21 l -8 -4" /><path d="M 52 1 l 2 1 V 21.5 l 2 1" /><path d="M 56 10 l 2 1" /><path d="M 56 12 l 2 1 V 21" /><path d="M 61 17 V 1 l 8 4 V 21 l -8 -4" /><path d="M 71 17 l 8 4 v -8 l -8 -4 v -8 l 8 4" /></g></svg>',
    skipf: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-skip-forward-icon lucide-skip-forward"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg>',
    skipb: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-skip-back-icon lucide-skip-back"><path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/></svg>',
    pause: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>',
    play: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>'
}

const componentTemplates = {
    ACTION_ICON: (svgId) => {
        return {
            className: 'icon',
            innerHTML: SVGs[svgId]
        };
    },
    OPENABLE_IMAGE: (path, alt = 'Image') => {
        return {
            tag: 'img',
            src: path,
            className: 'openable-image',
            alt: alt,
            listeners: [
                {
                    type: 'click',
                    listener: () => summonModal({
                        tag: 'img',
                        src: path,
                        className: 'modal-image',
                        alt: alt
                    })
                }
            ]
        }
    },
    CAROUSEL: (images) => {
        if (images.length === 1) {
            const image = images[0];
            return {
                className: 'carousel-entry',
                children: [
                    componentTemplates.OPENABLE_IMAGE(image.path, image.alt),
                    {
                        className: 'gentle',
                        children: image.alt
                    }
                ]
            };
        }
        return {
            className: `carousel gap`,
            cindex: '0',
            children: [
                {
                    ...componentTemplates.ACTION_ICON('chevleft'),
                    listeners: [
                        {
                            type: 'click',
                            listener: (e) => {
                                const carousel = e.target.closest('.carousel');
                                carousel.setAttribute('cindex', `${(images.length + parseInt(carousel.getAttribute('cIndex')) - 1) % images.length}`)
                            }
                        }
                    ]
                },
                {
                    className: 'carousel-inner',
                    children: images.map((image, index) => {
                        return {...componentTemplates.OPENABLE_IMAGE(image.path, image.alt), myindex: index}
                    })
                },
                {
                    ...componentTemplates.ACTION_ICON('chevright'),
                    listeners: [
                        {
                            type: 'click',
                            listener: (e) => {
                                const carousel = e.target.closest('.carousel');
                                carousel.setAttribute('cindex', `${(parseInt(carousel.getAttribute('cIndex')) + 1) % images.length}`)
                            }
                        }
                    ]
                },
                {
                    className: 'carousel-inner',
                    style: 'grid-column: 1 / 4',
                    children: images.map((image, index) => {
                        return {
                            className: 'gentle text-center',
                            style: 'justify-content: center',
                            children: image.alt,
                            myindex: index
                        }
                    })
                },
            ]
        }
    }
}

const templates = {
    DESKTOP_WRAPPER: () => {
        return {
            id: 'desktop-wrapper',
            children: [
                templates.DESKTOP(),
                templates.LOGIN(),
                templates.CRITICAL_ERROR()
            ],
            listeners: [
                {
                    type: 'mousemove',
                    listener: handleWindowDrag
                }
            ]
        }
    },
    CRITICAL_ERROR: () => {
        return {
            id: 'critical-error',
            className: 'padded center gap fullwidth fullheight',
            children: [
                {
                    children: [
                        {
                            tag: 'span',
                            className: 'red',
                            children: 'CRITICAL FAILURE'
                        },
                        ': Internet connection lost.'
                    ]
                },
                {
                    className: 'infocard-button padded',
                    id: 'reconnection',
                    children: 'Attempt reconnection',
                    listeners: [
                        {
                            type: 'click',
                            listener: () => {
                                document.getElementById('reconnection').replaceWith(render({
                                    className: 'ellipsis detail',
                                    children: 'Attempting reconnection.'
                                }));
                                window.setTimeout(() => {
                                    document.getElementById('desktop').style.display = 'block';
                                    document.getElementById('critical-error').style.display = 'none';
                                }, 1000)
                            }
                        }
                    ]
                }
            ]
        }
    },
    LOGIN: () => {
        return {
            className: 'padded center',
            id: 'login',
            children: [
                {
                    id: 'portfolio-login',
                    className: 'fullwidth',
                    children: [
                        {
                            className: 'fullwidth',
                            style: 'opacity: 0.8',
                            children: [
                                {
                                    tag: 'span',
                                    className: 'gentle',
                                    children: '> '
                                },
                                'Booting PortfoliOS',
                                {
                                    tag: 'span',
                                    id: 'booting-ellipsis',
                                    className: 'gentle ellipsis-slow',
                                    children: '.'
                                },
                            ]
                        },
                        {
                            className: 'padded center-row',
                            children: [
                                '[',
                                {
                                    tag: 'span',
                                    className: 'blue',
                                    style: 'transition: color 1s ease-in-out',
                                    id: 'login-loading-blue',
                                    children: ''
                                },
                                {
                                    tag: 'span',
                                    className: 'gentle',
                                    id: 'login-loading-gentle',
                                    children: '................',
                                },
                                ']'
                            ],
                            onMount: () => {
                                window.setTimeout(() => {
                                    document.getElementById('login-loading-blue').className = 'green';
                                    const load = window.setInterval(() => {
                                        if (document.getElementById('login-loading-gentle').innerText.length === 0) {
                                            window.setTimeout(() => {
                                                document.getElementById('portfolio-entry').style.height =
                                                    `${document.getElementById('portfolio-entry').scrollHeight}px`;
                                                document.getElementById('portfolio-logo').className = 'flicker';
                                                window.setTimeout(() => {
                                                    document.getElementById('portfolio-entry').style.height = 'auto';
                                                }, 1000)
                                            }, 250);
                                            window.clearInterval(load);
                                        } else {
                                            document.getElementById('login-loading-blue').innerHTML += '#';
                                            document.getElementById('login-loading-gentle').innerHTML =
                                                document.getElementById('login-loading-gentle').innerText.slice(0, -1);
                                        }
                                    }, 60);
                                }, 200);
                            }
                        },
                    ]
                },
                {
                    className: 'halfwidth zeroheight',
                    id: 'portfolio-entry',
                    children: [
                        {
                            className: 'nowrap text-center',
                            children: 'Welcome to'
                        },
                        {
                            id: 'portfolio-logo',
                            innerHTML: SVGs.portfolios
                        },
                        {
                            className: 'padded',
                            children: [
                                {
                                    className: 'text-center',
                                    children: [
                                        {
                                            tag: 'i',
                                            className: 'gentle',
                                            children: 'The web portfolio of ',
                                        },
                                        {
                                            tag: 'i',
                                            className: 'green',
                                            children: 'Alex Santagata'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            className: 'center',
                            children: {
                                className: 'infocard-button padded center-row gap',
                                style: 'width: fit-content',
                                children: [
                                    'Enter ',
                                    {
                                        tag: 'span',
                                        className: 'h-oscillator',
                                        innerHTML: SVGs.chevright
                                    }
                                ],
                                listeners: [
                                    {
                                        type: 'click',
                                        listener: () => {
                                            document.getElementById('login').style.opacity = '0';
                                            document.getElementById('login').style.pointerEvents = 'none';
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        };
    },
    DESKTOP: () => {
        return {
            id: 'desktop',
            children: [
                templates.ARENA(),
                templates.FOOTER(),
                templates.INFOCARD()
            ]
        };
    },
    INFOCARD: () => {
        return {
            id: 'infocard',
            listeners: [
                {
                    type: 'click',
                    listener: (e) => e.stopPropagation()
                }
            ]
        }
    },
    ARENA: () => {
        return {
            id: 'arena',
            children: [
                templates.ICONS(),
                {
                    id: 'back-logo',
                    innerHTML: SVGs.portfolios
                }
            ]
        };
    },
    FOOTER: () => {
        return {
            id: 'footer',
            children: [
                {
                    id: 'footer-entries'
                },
                {
                    id: 'footer-details',
                    children: [
                        {
                            innerHTML: SVGs['weather'],
                            listeners: [
                                {
                                    type: 'click',
                                    listener: (e) => {
                                        summonInfoCard(e, 'weather');
                                    }
                                }
                            ]
                        },
                        {
                            innerHTML: SVGs['wifi'],
                            listeners: [
                                {
                                    type: 'click',
                                    listener: (e) => {
                                        summonInfoCard(e, 'wifi');
                                    }
                                }
                            ]
                        },
                        {
                            innerHTML: SVGs['battery'],
                            listeners: [
                                {
                                    type: 'click',
                                    listener: (e) => {
                                        summonInfoCard(e, 'battery');
                                    }
                                }
                            ]
                        },
                        {
                            id: 'datetime',
                            className: 'center',
                            children: '3:00 PM • 9/6/2025',
                            onMount: () => {
                                const now = new Date();
                                updateTime();
                                window.setTimeout(() => {
                                    updateTime();
                                    window.setInterval(() => {
                                        updateTime();
                                    }, 60 * 1000)
                                }, 1000 * (60 - now.getSeconds()))
                            },
                            listeners: [
                                {
                                    type: 'click',
                                    listener: (e) => {
                                        summonInfoCard(e, 'datetime');
                                    }
                                }
                            ]
                        },
                        {
                            className: 'close-all center',
                            listeners: [
                                {
                                    type: 'click',
                                    listener: () => {
                                        for (const window of document.getElementsByClassName('window')) {
                                            window.style.display = 'none';
                                        }
                                        for (const entry of document.getElementsByClassName('footer-entry')) {
                                            entry.classList.remove('open');
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    ICONS: () => {
        return {
            id: 'icons',
            children: desktop.icons.map(templates.DESKTOP_ICON),
            listeners: [
                {
                    type: 'dragover',
                    listener: (e) => {e.preventDefault();}
                },
                {
                    type: 'drop',
                    listener: (e) => {
                        e.preventDefault();
                        const item = JSON.parse(e.dataTransfer.getData('text/plain'));
                        if (!item.fromPortfoliOS) return
                        const icons = document.getElementById('icons');
                        const rect = icons.getBoundingClientRect();
                        const colWidth = rect.width / 16, rowHeight = rect.height / 8;
                        const x = e.clientX - rect.x, y = e.clientY - rect.y;
                        const col = Math.floor(x / colWidth), row = Math.floor(y / rowHeight);
                        const index = row * 16 + col;
                        const blockingIcon = desktop.icons.find(i => i.index === index);
                        if (index === item.icon.index) {
                            return
                        } else if (!blockingIcon) {
                            desktop.icons = desktop.icons.filter(x => x.index !== item.icon.index);
                            desktop.icons.push({...item.icon, index});
                        }
                        document.getElementById('icons').replaceWith(render(templates.ICONS()));
                    }
                }
            ]
        };
    },
    DESKTOP_ICON: (icon) => {
        return {
            style: `top: calc(${Math.floor(icon.index / 16)} * (100% / 8)); left: calc(${icon.index % 16} * (100% / 16))`,
            className: 'desktop-icon center',
            draggable: 'true',
            index: icon.index,
            children: [
                {
                    className: `desktop-icon-icon ${icon.type}-icon`,
                    children: applications[icon.type].icon
                },
                {
                    className: `desktop-icon-name`,
                    children: applications[icon.type].name
                }
            ],
            listeners: [
                {
                    type: 'dblclick',
                    listener: () => {
                        launch(icon.type);
                    }
                },
                {
                    type: 'dragstart',
                    listener: (e) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify({
                            fromPortfoliOS: true,
                            icon: icon
                        }));
                        const element = e.target;
                        const rect = element.getBoundingClientRect();
                        e.dataTransfer.setDragImage(document.querySelector(`.desktop-icon[index='${icon.index}']`), rect.width / 2, rect.height / 2);
                    }
                }
            ]
        }
    },
    FOOTER_ENTRY: (displayType, PID, open) => {
        return {
            id: `footer-entry-${PID}`,
            pid: PID,
            className: `center footer-entry ${open ? 'open' : ''} footer-entry-${displayType}`,
            children: [
                applications[displayType].icon
            ],
            listeners: [
                {
                    type: 'click',
                    listener: () => {
                        const footerEntry = getFooterEntryByPID(PID);
                        const window = getWindowElementByPID(PID);
                        if (footerEntry.classList.contains('open')) {
                            footerEntry.classList.remove('open');
                            window.style.display = 'none';
                        } else {
                            footerEntry.classList.add('open');
                            window.style.display = 'flex';
                            window.style.zIndex = `${windowZIndex++}`;
                        }
                    }
                }
            ]
        }
    },
    WINDOW: (PID, name, content, className = '') => {
        return {
            id: `window-${PID}`,
            className: `window mini ${className}`,
            pid: PID,
            style: `z-index: ${windowZIndex++}`,
            listeners: [
                {
                    type: 'mousedown',
                    listener: () => {
                        getWindowElementByPID(PID).style.zIndex = `${windowZIndex++}`;
                    }
                }
            ],
            children: [
                {
                    className: 'window-heading between',
                    children: [
                        name,
                        {
                            className: 'window-buttons center-row',
                            children:
                                [
                                    {
                                        className: 'circular-button toggle',
                                        listeners: [
                                            {
                                                type: 'click',
                                                listener: () => {
                                                    const element = getWindowElementByPID(PID);
                                                    if (element.classList.contains('fullscreen')) {
                                                        element.classList.remove('fullscreen');
                                                        element.classList.add('mini');
                                                        element.style.top = '25%';
                                                        element.style.left = '25%';
                                                    } else {
                                                        element.classList.add('fullscreen');
                                                        element.classList.remove('mini');
                                                        element.style.top = '0px';
                                                        element.style.left = '0px';
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        className: 'circular-button min',
                                        listeners: [
                                            {
                                                type: 'click',
                                                listener: (e) => {
                                                    e.stopPropagation();
                                                    getWindowElementByPID(PID).style.display = 'none';
                                                    getFooterEntryByPID(PID).classList.remove('open');
                                                }
                                            },
                                            {
                                                type: 'mousedown', listener: (e) => e.stopPropagation()
                                            }
                                        ]
                                    },
                                    {
                                        className: 'circular-button close',
                                        listeners: [
                                            {
                                                type: 'click',
                                                listener: (e) => {
                                                    e.stopPropagation();
                                                    getWindowElementByPID(PID).remove();
                                                    getFooterEntryByPID(PID).remove();
                                                }
                                            },
                                            {
                                                type: 'mousedown', listener: (e) => e.stopPropagation()
                                            }
                                        ]
                                    }
                                ]
                        }
                    ],
                    listeners: [
                        {
                            type: 'mousedown',
                            listener: (e) => {
                                const windowRect = getWindowElementByPID(PID).getBoundingClientRect();
                                globalWindowDragInfo = {
                                    pid: PID,
                                    x0: e.clientX - windowRect.x,
                                    y0: e.clientY - windowRect.y
                                }
                            }
                        }
                    ]
                },
                {
                    className: 'window-body',
                    children: [
                        content
                    ]
                }
            ]
        }
    }
}

const getWindowElementByPID = (pid) => {
    return document.getElementById(`window-${pid}`);
}

const getFooterEntryByPID = (pid) => {
    return document.getElementById(`footer-entry-${pid}`);
}

const render = (template) => {
    console.log(template);
    if (typeof template == 'string') {
        return document.createTextNode(template);
    }
    const element = document.createElement(template.tag || 'div');
    if (template.tag === 'a') {
        element.setAttribute('target', '_blank');
    }
    if (template.className && template.className.length > 0) {
        element.className = template.className;
    }
    if (template.id) {
        element.id = template.id;
    }
    if (template.listeners && template.listeners.length > 0) {
        template.listeners.forEach((listener) => {
            element.addEventListener(listener.type, listener.listener);
        });
    }
    if (template.onMount) {
        setTimeout(template.onMount, 0);
    }
    if (template.style) {
        element.setAttribute('style', template.style);
    }
    if (template.children) {
        if (Array.isArray(template.children)) {
            element.replaceChildren(...template.children.map(render));
        } else {
            element.replaceChildren(render(template.children));
        }
    } else if (template.innerHTML) {
        element.innerHTML = template.innerHTML;
    }
    for (const property in template) {
        if (!['tag', 'id', 'style', 'className', 'children', 'innerHTML', 'onMount', 'listeners'].includes(property)) {
            element.setAttribute(property, template[property]);
        }
    }
    return element;
}

let globalWindowDragInfo = null;
const handleWindowDrag = (e) => {
    if (globalWindowDragInfo) {
        const element = getWindowElementByPID(globalWindowDragInfo.pid);
        const x = e.clientX, y = e.clientY;
        const arenaRect = document.getElementById('arena').getBoundingClientRect();
        element.style.top = `${y - arenaRect.y - globalWindowDragInfo.y0}px`;
        if (element.classList.contains('fullscreen')) {
            const elementWidth = element.getBoundingClientRect().width;
            globalWindowDragInfo.x0 = elementWidth / 4;
            element.classList.remove('fullscreen');
            element.classList.add('mini');
        }
        element.style.left = `calc(${x - arenaRect.x - globalWindowDragInfo.x0}px`;
    }
}

const handleEndDrag = () => {
    if (globalWindowDragInfo) {
        globalWindowDragInfo = null;
    }
}

const updateTime = () => {
    const now = new Date();

    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()} ${now.getHours() < 12 ? 'AM' : 'PM'}`;
    const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    document.getElementById('datetime').innerHTML = `${timeStr} • ${dateStr}`;

    const weekdayify = (n) => {
        return `Sunday Monday Tuesday Wednesday Thursday Friday Saturday`.split(' ')[n];
    }

    const monthify = (n) => {
        return `January February March April May June July August September October November December`.split(' ')[n]
    }

    const fancyDateStr = `${weekdayify(now.getDay())}, ${monthify(now.getMonth())} ${now.getDate()}, ${now.getFullYear()}`;
    const fancyDateTimeStr = `${timeStr} • ${fancyDateStr}`;
    const datetimeInfoCard = document.querySelector('#infocard-datetime');
    if (datetimeInfoCard) {
        datetimeInfoCard.innerHTML = fancyDateTimeStr;
    }
    return fancyDateTimeStr;
}

const summonInfoCard = (e, type) => {
    e.stopPropagation();
    document.getElementById('infocard').style.display = 'block';
    switch (type) {
        case 'datetime': {
            const datetimeStr = updateTime();
            document.getElementById('infocard').replaceChildren(render(
                {
                    children: [
                        {
                            id: '#infocard-datetime',
                            children: datetimeStr
                        },
                        {
                            className: 'small detail',
                            children: `Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
                        }
                    ]
                }
            ));
            break;
        }
        case 'weather': {
            document.getElementById('infocard').replaceChildren(render(
                {
                    children: [
                        {
                            children: `Today's weather is: tactically ambiguous`,
                        },
                        {
                            className: 'small detail',
                            children: 'The weather might be any of cloudy, sunny, rainy, or other.'
                        }
                    ]
                }
            ));
            break;
        }
        case 'battery': {
            document.getElementById('infocard').replaceChildren(render(
                {
                    children: [
                        {
                            children: `Battery status: 66.666...% remaining`,
                        },
                        {
                            className: 'small detail',
                            children: 'You don\'t have to re-charge just yet.'
                        }
                    ]
                }
            ));
            break;
        }
        case 'wifi': {
            document.getElementById('infocard').replaceChildren(render(
                {
                    className: 'center-row gap',
                    children: [
                        `Internet status: connected`,
                        {
                            className: 'infocard-button padded',
                            children: 'Disconnect',
                            listeners: [
                                {
                                    type: 'click',
                                    listener: () => {
                                        document.getElementById('desktop').style.display = 'none';
                                        document.getElementById('critical-error').replaceWith(render(templates.CRITICAL_ERROR()));
                                        document.getElementById('critical-error').style.display = 'flex';
                                    }
                                }
                            ]
                        }
                    ]
                }
            ));
            break;
        }
        default: break;
    }
}

let windowZIndex = 2;

let nProcesses = 0;
let desktop = {
    icons: [
        {index: 0, type: applicationTypes.BROWSER},
        {index: 112, type: applicationTypes.SETTINGS},
        {index: 126, type: applicationTypes.TERMINAL},
        {index: 127, type: applicationTypes.RECYCLE},
        {index: 16, type: applicationTypes.CHAT},
        {index: 14, type: applicationTypes.GAMES},
        {index: 15, type: applicationTypes.WORK}
    ],
    theme: 'Default',
    retro: true
}

document.getElementById('viewport').replaceChildren(render(templates.DESKTOP_WRAPPER(desktop)));
