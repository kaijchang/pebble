# pebble

pebble is a tiny component-based Javascript frontend framework, similar to React. It's built completely from scratch, and aims to remain lightweight and clean.

pebble is not built with support with JSX and has no need for Webpack or any compilation.

Here's a [quick example](https://kajchang.github.io/pebble/).

pebble sports a React-like API:

```js
class Timer extends Pebble.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0
        };

        setInterval(() => this.setState({
            time: this.state.time + 1
        }), 1000);
    }

    render() {
        return Pebble.createElement('span', {}, [
            `Pebble Timer #${ this.props.number }`,
            Pebble.createElement('br'),
            `${ this.state.time } Second${ this.state.time === 1 ? '' : 's' }`
        ]);
    }
}

class App extends Pebble.Component {
    render() {
        return Pebble.createElement('div', {}, [
            Pebble.createElement(Timer, {
                number: 1
            }),
            Pebble.createElement('br'),
            Pebble.createElement(Timer, {
                number: 2
            })
        ]);
    }
}

Pebble.mount(document.body, Pebble.createElement(App));
```

Thanks to [ofirdagan](https://github.com/ofirdagan/build-your-own-react) for helping me get the basic structure of React.
