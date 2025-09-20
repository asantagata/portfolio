const parseTerminalInstruction = (inst) => {
    const casedCommand = inst.split(' ')[0];
    const command = casedCommand.toLowerCase();
    switch (command) {
        case 'help':
            return {
                children: [
                    {
                        children: [`You are accessing PortfoliOS's command-line interface (CLI.)`]
                    },
                    {
                        children: [`Refer to the following list for help writing commands.`]
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
                                                children: [c.name]
                                            },
                                            {
                                                tag: 'td',
                                                children: [c.desc]
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
                children: [`"${casedCommand}" is not a valid command. Type "help" for help.`]
            };
    }
}

const GAMES = [
    {name: 'Flip 7', icon: '🎴', className: 'flip7'},
    {name: 'One Night Ultimate Werewolf', icon: '🐺', className: 'onuw'},
    {name: 'Wandering Towers', icon: '🏯', className: 'wandy'},
]

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
                                {tag: 'span', className: 'green', children: ['Alex@PortfoliOS']},
                                ':',
                                {tag: 'span', className: 'blue', children: ['Desktop']},
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
                                {className: 'gamebox-icon', children: [game.icon]},
                                {className: 'gamebox-name', children: [game.name]}
                            ]
                        })),
                        {
                            className: `gamebox-lid`,
                            children: percent === 0 ? [
                                {className: 'gamebox-icon', children: [game.icon]},
                                {className: 'gamebox-name', children: [game.name]}
                            ] : []
                        }
                    ]
                }
            ],
            listeners: [
                {
                    type: 'click',
                    listener: () => {
                        getWindowElementByPID(PID).querySelector('.gamebox-wrapper.selected')?.classList.remove('selected');
                        document.getElementById(`gamebox-${PID}-${game.className}`).classList.add('selected');
                        document.getElementById(`game-blurb-${PID}`).replaceChildren(render({
                            className: 'center',
                            children: [game.name]
                        }));
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
    WORK: 'work'
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
    [applicationTypes.WORK]: {name: 'Work', icon: '💼'}
}

const applicationTemplates = {
    [applicationTypes.WORK]: () => {
        return {
            className: 'window-light padded'
        }
    },
    [applicationTypes.GAMES]: (PID) => {
        return {
            className: 'window-light padded center-row gap',
            children: [
                {
                    className: 'gamebox-stack',
                    children: GAMES.map((game, index) => appAuxTemplates.GAMEBOX(PID, game, index / (GAMES.length - 1)))
                },
                {
                    className: 'game-blurb',
                    id: `game-blurb-${PID}`,
                    children: [{
                        className: 'center outlined-color',
                        children: ['Select a game...']
                    }]
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
                                    href: 'mailto:ajsantagata@wpi.edu',
                                    children: ['ajsantagata@wpi.edu']
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
                                    href: 'https://www.linkedin.com/in/alex-santagata/',
                                    children: ['alex-santagata']
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
                                    href: 'https://github.com/asantagata',
                                    children: ['asantagata']
                                }
                            ]
                        }
                    ].map(message => {
                        return {
                            className: 'message lightgrey rounded',
                            children: [message]
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
                                    children: [recyclable.icon]
                                },
                                {
                                    className: 'recyclable-label',
                                    children: [recyclable.name]
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
                                            children: [theme.icon]
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

const launch = (launchType) => {
    const PID = nProcesses++;
    const application = applications[launchType]
    document.getElementById('footer-entries').appendChild(render(templates.FOOTER_ENTRY(launchType, PID, true)));
    document.getElementById('arena').appendChild(render({
        ...templates.WINDOW(PID, application.name, applicationTemplates[launchType](PID), launchType),
    }));
}

const SVGs = {
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    right: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    battery: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-battery-medium-icon lucide-battery-medium"><path d="M10 14v-4"/><path d="M22 14v-4"/><path d="M6 14v-4"/><rect x="2" y="6" width="16" height="12" rx="2"/></svg>',
    weather: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sun-rain-icon lucide-cloud-sun-rain"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"/><path d="M11 20v2"/><path d="M7 19v2"/></svg>',
    wifi: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-icon lucide-wifi"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>'
}

const componentTemplates = {
    ACTION_ICON: (svgId) => {
        return {
            className: 'icon',
            innerHTML: SVGs[svgId]
        };
    },
    TEXT_INPUT: () => {
        return {
            tag: 'input',
            type: 'text',
            autocomplete: 'off',
            value: '',
            size: '20'
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
                    children: [{
                        tag: 'span',
                        className: 'red',
                        children: ['CRITICAL FAILURE']
                    }, ': Internet connection lost.']
                },
                {
                    className: 'infocard-button padded',
                    id: 'reconnection',
                    children: ['Attempt reconnection'],
                    listeners: [
                        {
                            type: 'click',
                            listener: () => {
                                document.getElementById('reconnection').replaceWith(render({
                                    className: 'ellipsis detail',
                                    children: ['Attempting reconnection.']
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
            className: 'center gap',
            id: 'login',
            children: [
                {...componentTemplates.ACTION_ICON('user'), className: 'large-icon'},
                {...componentTemplates.TEXT_INPUT(),
                    id: 'username',
                    readonly: 'true',
                    placeholder: 'Username'},
                {
                    tag: 'span',
                    listeners: [
                        {
                            type: 'mouseenter',
                            listener: () => {
                                document.getElementById('password').type = 'text';
                            }
                        },
                        {
                            type: 'mouseleave',
                            listener: () => {
                                document.getElementById('password').type = 'password';
                            }
                        },
                    ],
                    children: [
                        {...componentTemplates.TEXT_INPUT(),
                            type: 'password',
                            id: 'password',
                            readonly: 'true',
                            placeholder: 'Password',
                        },
                    ]
                },
                {...componentTemplates.ACTION_ICON('right'),
                    className: 'large-icon hidden pointer',
                    id: 'log-in-button',
                    listeners: [
                        {
                            type: 'click',
                            listener: () => {
                                document.getElementById('login').style.opacity = '0';
                                window.setTimeout(() => {
                                    document.getElementById('login').style.display = 'none';
                                }, 200);
                            }
                        }
                    ]
                },
                {
                    className: 'bottom-left',
                    children: ['Booting PortfoliOS.']
                }
            ],
            onMount: () => {
                window.setTimeout(() => {
                    const username = 'Alex Santagata', password = 'Web developer';
                    const typeSpeed = 40
                    typeInElement(document.getElementById('username'), username, typeSpeed);
                    window.setTimeout(() => {
                        typeInElement(document.getElementById('password'), password, typeSpeed);
                        window.setTimeout(() => {
                            document.getElementById('log-in-button').classList.remove('hidden');
                        }, (password.length + 10) * typeSpeed);
                    }, (username.length + 10) * typeSpeed);
                }, 200);
            }
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
                templates.ICONS()
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
                            children: ['3:00 PM • 9/6/2025'],
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
                    children: [applications[icon.type].icon]
                },
                {
                    className: `desktop-icon-name`,
                    children: [applications[icon.type].name]
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
                                        className: 'toggle',
                                        listener: (e) => {
                                            e.stopPropagation();
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
                                    },
                                    {
                                        className: 'min',
                                        listener: (e) => {
                                            e.stopPropagation();
                                            getWindowElementByPID(PID).style.display = 'none';
                                            getFooterEntryByPID(PID).classList.remove('open');
                                        }
                                    },
                                    {
                                        className: 'close',
                                        listener: (e) => {
                                            e.stopPropagation();
                                            getWindowElementByPID(PID).remove();
                                            getFooterEntryByPID(PID).remove();
                                        }
                                    },

                                ].map(button => {
                                    return {
                                        className: `circular-button ${button.className}`,
                                        listeners: [
                                            {
                                                type: 'click',
                                                listener: button.listener
                                            }
                                        ]
                                    }
                                })
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

const typeInElement = (element, text, speed) => {
    let index = 0;
    const interval = window.setInterval(() => {
        element.value = (element.value || '') + text[index];
        index++;
        if (index === text.length)
            window.clearInterval(interval);
    }, speed);
}

const getWindowElementByPID = (pid) => {
    return document.getElementById(`window-${pid}`);
}

const getFooterEntryByPID = (pid) => {
    return document.getElementById(`footer-entry-${pid}`);
}

const render = (template) => {
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
    if (template.children && template.children.length > 0) {
        element.replaceChildren(...template.children.map(render));
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
                            children: [datetimeStr]
                        },
                        {
                            className: 'small detail',
                            children: [`Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`]
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
                            children: [`Today's weather is: tactically ambiguous`],
                        },
                        {
                            className: 'small detail',
                            children: ['The weather might be any of cloudy, sunny, rainy, or other.']
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
                            children: [`Battery status: 66.666...% remaining`],
                        },
                        {
                            className: 'small detail',
                            children: ['You don\'t have to re-charge just yet.']
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
                            children: ['Disconnect'],
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
