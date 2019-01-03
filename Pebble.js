(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Pebble = factory();
    }
}(this, () => {
    let root, rootComponent;

    let componentCounter = 0;
    let componentMap = [];

    const PEBBLE = 'PEBBLE';

    class Component {
        constructor(props) {
            this.props = props;
            this.state = Object();
        }

        setState(newState) {
            Object.assign(this.state, newState);
            reRender();
        }

        render() {
            throw new Error('Components should override the render function');
        }
    }

    function createElement(element, attributes = {}, children = []) {
        let el;

        if (!Array.isArray(children)) {
            children = [children];
        }

        if (typeof element === 'string') {
            el = document.createElement(element);

            Object.keys(attributes).forEach(attr => {
                if (attr === 'className') {
                    el.setAttribute('class', attributes[attr]);
                } else if (attr === 'style') {
                   el.setAttribute('style', Object.keys(attributes[attr]).map(style =>
                       `${style}: ${attributes[attr][style]};`
                   ).join(''));
                } else if (/^on[A-Z][a-z]+$/.test(attr)) {
                    el.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
                } else {
                    el.setAttribute(attr, attributes[attr])
                }
            });

            children.forEach(child => {
                if (typeof child === 'string' || typeof child === 'number') {
                    el.appendChild(document.createTextNode(child));
                } else if (child instanceof Node) {
                    el.appendChild(child);
                } else if (child.type === PEBBLE) {
                    el.appendChild(child.render());
                }
            });
        } else if (typeof element === 'function' && /^class\s/.test(Function.prototype.toString.call(element))) {
            el = handleComponent(element, attributes, children);
        } else if (typeof element === 'function') {
            attributes.children = children;
            el = element.bind(element, attributes);
        }

        return el;
    }

    function handleComponent(component, attributes = {}, children = []) {
        componentCounter++;

        if (!componentMap[componentCounter]) {
            const newElement = new component(attributes);

            children.forEach(child => {
                if (typeof child === 'string' || typeof child === 'number') {
                    child = document.createTextNode(child);
                }
            });

            newElement.children = children;
            newElement.type = PEBBLE;

            componentMap[componentCounter] = newElement;
        }

        return componentMap[componentCounter];
    }

    function mount(mountNode, componentElement) {
        root = mountNode;
        rootComponent = componentElement;

        render();
    }

    function render() {
        root.innerHTML = '';

        if (rootComponent.type === PEBBLE) {
            root.appendChild(rootComponent.render());
        } else if (typeof rootComponent === 'function') {
            root.appendChild(rootComponent());
        } else if (rootComponent instanceof Node) {
            root.appendChild(rootComponent);
        }

        componentMap.splice(componentCounter);
    }

    function reRender() {
        if (rootComponent.type === PEBBLE) {
            componentCounter = 1;
        } else {
            componentCounter = 0;
        }

        render();
    }

    return {
        createElement: createElement,
        Component: Component,
        mount: mount
    };
}));
