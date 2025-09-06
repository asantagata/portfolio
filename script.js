const applications = {
    BROWSER: 'browser',
    FILES: 'files',
    TERMINAL: 'terminal'
}

const applicationTemplates = {
    browser: () => {
        return {
            children: ['wiki page, etc']
        }
    },
    files: () => {
        return {
            children: ['files, etc']
        }
    },
    terminal: () => {
        return {
            children: ['terminal, etc']
        }
    }
}

const launch = (application, data) => {
    const PID = nProcesses++;
    document.getElementById('footer').appendChild(render(templates.FOOTER_ENTRY(application, PID)));
    document.getElementById('windows').appendChild(render({
        ...templates.WINDOW(PID, applicationTemplates[application](data)),
    }));
    desktop.windows.push(PID)
}

const icons = {
    browser: '🌐',
    files: '📂',
    settings: '⚙️',
    text: '📄',
    terminal: '>_',
    chat: '💬',
    recycle: '🗑️'
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
                templates.ICONS(),
                templates.WINDOWS()
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
    WINDOWS: () => {
        return {
            id: 'windows'
        }
    },
    DESKTOP_ICON: (icon) => {
        return {
            style: `grid-area: calc(1 + round(down, calc(${icon.index} / var(--cols))))
            / calc(1 + rem(${icon.index}, var(--cols)))`,
            className: 'desktop-icon center',
            children: [
                {
                    className: `desktop-icon-icon ${icon.icon}-icon`,
                    children: [icons[icon.icon]]
                },
                icon.name
            ],
            listeners: [
                {
                    type: 'dblclick',
                    listener: () => {
                        launch(icon.launchApplication, icon.launchData);
                    }
                }
            ]
        }
    },
    FOOTER_ENTRY: (application, PID, open) => {
        return {
            id: `footer-entry-${PID}`,
            className: `footer-entry ${open ? 'open' : ''} footer-entry-${application}`,
            children: [
                icons[application]
            ]
        }
    },
    WINDOW: (PID, content) => {
        return {
            className: 'window',
            children: [
                '_ o x',
                content
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
        {index: 0, icon: 'browser', name: 'Browser', launchApplication: applications.BROWSER, launchData: null},
        {index: 126, icon: 'terminal', name: 'Command line', launchApplication: applications.TERMINAL, launchData: null},
        {index: 127, icon: 'recycle', name: 'Recycle bin', launchApplication: applications.FILES, launchData: '/recycle'}
    ],
    windows: []
}

document.getElementById('viewport').replaceChildren(render(templates.DESKTOP_WRAPPER(desktop)));
