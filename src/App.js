import React, { Component } from 'react';
import Scroll from './components/scroll';
import Search from './components/search';
import './css/App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            pageSize: 20,
            input: '',
            loading: false,
            page: 1,
            prevY: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.getCards = this.getCards.bind(this);
    }

    handleClick(input){
        this.setState({ input: input }, this.getCards);

    }

    getCards(page) {
        if ( this.state.input ) {
            this.setState({ loading: true });
            fetch('https://api.elderscrollslegends.io/v1/cards?name='+this.state.input+'&pageSize='+this.state.pageSize)
                .then(res => res.json())
                .then(res => {
                    this.setState({ cards: res.cards });
                    this.setState({ loading: false });
                })
        } else if ( Number.isInteger(page) ) {
            this.setState({ loading: true });
            fetch('https://api.elderscrollslegends.io/v1/cards?page='+page+'&pageSize='+this.state.pageSize)
                .then(res => res.json())
                .then(res => {
                    this.setState({ cards: [...this.state.cards, ...res.cards] });
                    this.setState({ loading: false });
                })
        }
    }

  render() {
    return (
        <div className="library">
            <h1>Elder Scrolls: Legends</h1>
            <Search
                onClick={this.handleClick}
                input={this.state.input}
            />
            <Scroll cards={this.state.cards} getCards={this.getCards} />
        </div>
    );
  }
}

export default App;
