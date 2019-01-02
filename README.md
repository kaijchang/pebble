# pebble

pebble is a tiny component-based Javascript frontend framework, similar to React. It's built completely from scratch, and aims to remain lightweight and clean.

pebble is not built with support with JSX and has no need for Webpack or any compilation.

Here's a [quick example](https://kajchang.github.io/pebble/).

pebble sports a React-like API:

```js
class Counter extends Pebble.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (event.target.name === 'increment') {
            this.setState({
                value: this.state.value + 1
            });
        } else if (event.target.name === 'decrement') {
            this.setState({
                value: this.state.value - 1
            });
        }
    }

    render() {
        return Pebble.createElement('div', {}, [
            `Pebble Counter #${ this.props.number }`,
            Pebble.createElement('br'),
            Pebble.createElement('button', {
                name: 'decrement',
                onClick: this.handleClick
            }, '-'),
            ` ${ this.state.value } `,
            Pebble.createElement('button', {
                name: 'increment',
                onClick: this.handleClick
            }, '+')
        ]);
    }
}

App = () => Pebble.createElement('div', {}, [
    Pebble.createElement(Counter, {
        number: 1
    }),
    Pebble.createElement(Counter, {
        number: 2
    }),
    Pebble.createElement(Counter, {
        number: 3
    })
]);

Pebble.mount(document.body, Pebble.createElement(App));
```

Thanks to [ofirdagan](https://github.com/ofirdagan/build-your-own-react) for helping me get the basic structure of React.
