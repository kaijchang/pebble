(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Pebble = factory();
    }
}(this, () => {
    function createElement(tagName, attributes = [], children = []) {
        const el = document.createElement(tagName);

        Object.keys(attributes).forEach(attr =>
            el.setAttribute(attr, attributes[attr])
        );

        children.forEach(child => {
            if (typeof child === 'string' || typeof child === 'number') {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child);
            } else {
                throw new TypeError('Child must be String, Number or Node');
            }
        });

        return el;
    }

    class Component {
        constructor() {
            this.state = Object();
        }

        setUpdateEvent(updateEvent) {
            this.updateEvent = updateEvent;
        }

        setState(newState) {
            if (this.updateEvent === undefined) throw new Error('Components cannot update state when not mounted');

            Object.assign(this.state, newState);
            this.updateEvent();
        }

        render() {
            throw new Error('Components should override the render function');
        }
    }

    function mount(mountNode, component) {
        if (!mountNode instanceof Node) throw new Error('mountNode must be a Node');
        if (!component instanceof Component) throw new Error('component must be a Component');

        function updateEvent() {
            mountNode.innerHTML = '';

            const res = component.render();

            if (!res instanceof Node) throw new Error('The return of the render function must be a Component');

            mountNode.appendChild(res);
        }

        component.setUpdateEvent(updateEvent);
        updateEvent();
    }

    return {
        createElement: createElement,
        Component: Component,
        mount: mount
    };
}));
