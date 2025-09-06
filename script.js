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
    DESKTOP_WRAPPER: (desktopId) => {
        return {
            className: 'screen',
            children: [
                {
                    className: 'desktop-wrapper',
                    children: [
                        templates.DESKTOP(desktopId),
                        templates.LOGIN(desktopId)
                    ],
                    desktopId: desktopId
                }
            ]
        }
    },
    LOGIN: (desktopId) => {
        return {
            className: 'login center gap',
            children: [
                {...componentTemplates.ACTION_ICON('user'), className: 'large-icon'},
                {...componentTemplates.TEXT_INPUT(),
                    className: 'username',
                    readonly: 'true',
                    placeholder: 'Username'},
                {
                    tag: 'span',
                    listeners: [
                        {
                            type: 'mouseenter',
                            listener: () => {
                                desktopQuery(desktopId, '.password').type = 'text';
                            }
                        },
                        {
                            type: 'mouseleave',
                            listener: () => {
                                desktopQuery(desktopId, '.password').type = 'password';
                            }
                        },
                    ],
                    children: [
                        {...componentTemplates.TEXT_INPUT(),
                            type: 'password',
                            className: 'password',
                            readonly: 'true',
                            placeholder: 'Password',
                        },
                    ]
                },
                {...componentTemplates.ACTION_ICON('right'),
                    className: 'large-icon hidden pointer log-in-button',
                    listeners: [
                        {
                            type: 'click',
                            listener: () => {
                                desktopQuery(desktopId, '.login').style.opacity = '0';
                                window.setTimeout(() => {
                                    desktopQuery(desktopId, '.login').style.display = 'none';
                                }, 200);
                            }
                        }
                    ]
                }
            ],
            onMount: () => {
                window.setTimeout(() => {
                    const desktopElement = getDesktopElement(desktopId);
                    const username = 'Alex Santagata', password = 'Web developer';
                    const typeSpeed = 40
                    typeInElement(desktopQuery(desktopId, '.username'), username, typeSpeed);
                    window.setTimeout(() => {
                        typeInElement(desktopQuery(desktopId, '.password'), password, typeSpeed);
                        window.setTimeout(() => {
                            desktopElement.querySelector('.log-in-button').classList.remove('hidden');
                        }, (password.length + 10) * typeSpeed);
                    }, (username.length + 10) * typeSpeed);
                }, 200);
            }
        };
    },
    DESKTOP: (desktopId) => {
        return {
            className: 'desktop',
            children: [
                templates.HEADER(desktopId),
                templates.ARENA(desktopId),
                templates.FOOTER(desktopId)
            ]
        };
    },
    HEADER: (desktopId) => {
        return {
            className: 'if-mobile header'
        };
    },
    ARENA: (desktopId) => {
        return {
            className: 'arena',
            children: [
                templates.ICONS(desktopId),
                templates.WINDOWS(desktopId)
            ]
        };
    },
    FOOTER: (desktopId) => {
        return {
            className: 'footer'
        };
    },
    ICONS: (desktopId) => {
        desktop = desktops.get(desktopId);
        return {
            className: 'icons',
            children: desktop.icons.map(icon => templates.DESKTOP_ICON(desktopId, icon))
        };
    },
    WINDOWS: (desktopId) => {
        return {
            className: 'windows'
        }
    },
    DESKTOP_ICON: (desktopId, icon) => {
        return {
            style: `grid-area: calc(1 + round(down, calc(${icon.index} / var(--cols))))
            / calc(1 + rem(${icon.index}, var(--cols)))`,
            children: [icon.name]
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

const getDesktopElement = (desktopId) => {
    return document.querySelector(`div.desktop-wrapper[desktopid='${desktopId}']`);
}

const desktopQuery = (desktopId, query) => {
    return document.querySelector(`div.desktop-wrapper[desktopid='${desktopId}'] ${query}`);
}

const render = (template) => {
    if (typeof template == 'string') {
        return document.createTextNode(template);
    }
    if (template.id) {
        element.id = template.id;
    }
    const element = document.createElement(template.tag || 'div');
    if (template.className && template.className.length > 0) {
        element.className = template.className;
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

const createDesktop = (id) => {
    return {
        id: id,
        icons: [
            {index: 0, icon: 'user', name: 'Browser'},
            {index: 126, icon: 'user', name: 'Command line'},
            {index: 127, icon: 'user', name: 'Recycle bin'}
        ]
    }
}

let desktopID = 0;
const desktops = new Map();
desktops.set(desktopID, createDesktop(desktopID));
document.getElementById('viewport').replaceChildren(render(templates.DESKTOP_WRAPPER(0)));
