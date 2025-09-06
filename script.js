const applicationTypes = {
    BROWSER: 'browser',
    FILES: 'files',
    TERMINAL: 'terminal',
    SETTINGS: 'settings',
    TEXT: 'text',
    CHAT: 'chat',
    RECYCLE: 'recycle'
}

const applications = {
    [applicationTypes.BROWSER]: {name: 'Browser', icon: '🌐'},
    [applicationTypes.FILES]: {name: 'Files', icon: '📂'},
    [applicationTypes.TERMINAL]: {name: 'Terminal', icon: '>_'},
    [applicationTypes.SETTINGS]: {name: 'Settings', icon: '⚙️'},
    [applicationTypes.TEXT]: {name: 'Text Editor', icon: '📄'},
    [applicationTypes.CHAT]: {name: 'Chat', icon: '💬'},
    [applicationTypes.RECYCLE]: {name: 'Recycle Bin', icon: '🗑️'}
}

const applicationTemplates = {
    [applicationTypes.BROWSER]: () => {
        return {
            children: ['wiki page, etc']
        }
    },
    [applicationTypes.FILES]: () => {
        return {
            children: ['files, etc']
        }
    },
    [applicationTypes.TERMINAL]: () => {
        return {
            children: ['terminal, etc']
        }
    }
}

const launch = (launchType, data) => {
    const PID = nProcesses++;
    const application = applications[launchType]
    document.getElementById('footer').appendChild(render(templates.FOOTER_ENTRY(launchType, PID)));
    document.getElementById('arena').appendChild(render({
        ...templates.WINDOW(PID, application.name, applicationTemplates[launchType](data)),
    }));
    desktop.windows.push(PID)
}

const SVGs = {
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    right: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
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
                templates.LOGIN()
            ],
            listeners: [
                {
                    type: 'mousemove',
                    listener: handleWindowDrag
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
                templates.FOOTER()
            ]
        };
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
            id: 'footer'
        };
    },
    ICONS: () => {
        return {
            id: 'icons',
            children: desktop.icons.map(templates.DESKTOP_ICON)
        };
    },
    DESKTOP_ICON: (icon) => {
        return {
            style: `grid-area: calc(1 + round(down, calc(${icon.index} / var(--cols))))
            / calc(1 + rem(${icon.index}, var(--cols)))`,
            className: 'desktop-icon center',
            children: [
                {
                    className: `desktop-icon-icon ${icon.displayType}-icon`,
                    children: [applications[icon.displayType].icon]
                },
                applications[icon.displayType].name
            ],
            listeners: [
                {
                    type: 'dblclick',
                    listener: () => {
                        launch(icon.launchType, icon.launchData);
                    }
                }
            ]
        }
    },
    FOOTER_ENTRY: (displayType, PID, open) => {
        return {
            id: `footer-entry-${PID}`,
            pid: PID,
            className: `footer-entry ${open ? 'open' : ''} footer-entry-${displayType}`,
            children: [
                applications[displayType].icon
            ]
        }
    },
    WINDOW: (PID, name, content) => {
        return {
            id: `window-${PID}`,
            className: 'window mini',
            pid: PID,
            children: [
                {
                    className: 'window-heading between',
                    children: [
                        name,
                        {
                            children: [
                                '_',
                                'o',
                                'x'
                            ]
                        }
                    ],
                    listeners: [
                        {
                            type: 'mousedown',
                            listener: (e) => {
                                globalWindowDragInfo = {pid: PID, x0: e.clientX, y0: e.clientY}
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

const render = (template) => {
    if (typeof template == 'string') {
        return document.createTextNode(template);
    }
    const element = document.createElement(template.tag || 'div');
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

let nProcesses = 0;
let desktop = {
    icons: [
        {index: 0, displayType: applicationTypes.BROWSER, launchType: applicationTypes.BROWSER, launchData: null},
        {index: 126, displayType: applicationTypes.TERMINAL, launchType: applicationTypes.TERMINAL, launchData: null},
        {index: 127, displayType: applicationTypes.RECYCLE, launchType: applicationTypes.FILES, launchData: '/recycle'}
    ],
    windows: []
}

let globalWindowDragInfo = null;
const handleWindowDrag = (e) => {
    if (globalWindowDragInfo) {
        const element = getWindowElementByPID(globalWindowDragInfo.pid);
        element.classList.remove('fullscreen');
        element.classList.add('mini');
        element.style.left = `calc(0.5 * (100% - 100dvw) + ${e.clientX}px - 25%)`;
        element.style.top = `calc(0.5 * (100% - 100dvh) + ${e.clientY}px - 0.5em)`;
    }
}

document.getElementById('viewport').replaceChildren(render(templates.DESKTOP_WRAPPER(desktop)));
