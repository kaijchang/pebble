# pebble

pebble is a tiny component-based Javascript frontend framework, similar to React. It's built completely from scratch, and aims to remain lightweight and clean.

pebble is not built with support with JSX and has no need for Webpack or any compilation.

Here's a [quick example](https://kajchang.github.io/pebble/).

pebble sports a React-like API:

```js
class Timer extends Pebble.Component {
    constructor() {
        super();
        
        this.state = {
            time: 0
        };
        
        setInterval(() => this.setState({
            time: this.state.time + 1
        }), 1000);
    }
            
    render() {
        return Pebble.createElement('span', [], [
            'Pebble Timer',
            Pebble.createElement('br'),
            `${ this.state.time } Second${ this.state.time === 1 ? '' : 's' }`
        ]);
    }
}
        
Pebble.mount(document.body, new Timer);
```
