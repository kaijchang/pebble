# pebble

pebble is a tiny component-based Javascript frontend framework, similar to React. It's built completely from scratch, and aims to remain lightweight and clean.

Here's a [quick example](https://kajchang.github.io/pebble/).

pebble sports a React-like API:

```jsx harmony
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
            })
        } else if (event.target.name === 'decrement') {
            this.setState({
                value: this.state.value - 1
            })
        }
    }

    render() {
        return (
            <div>
                Pebble Counter #{ this.props.number }
                <br/>
                <button name={ 'decrement' } onClick={ this.handleClick }>
                    -
                </button>
                { ` ${this.state.value} ` }
                <button name={ 'increment' } onClick={ this.handleClick }>
                    +
                </button>
            </div>
        )
    }
}

App = () => <div>
    <Counter number={ 1 }/>
    <Counter number={ 2 }/>
    <Counter number={ 3 }/>
</div>;

Pebble.mount(document.body, <App/>);
```

You can install pebble from npm or yarn:

```console
npm i @kachang/pebble.js
or
yarn add @kachang/pebble.js
```

Thanks to [ofirdagan](https://github.com/ofirdagan/build-your-own-react) for helping me get the basic structure of React.
