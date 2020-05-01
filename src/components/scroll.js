import React, { Component, Fragment } from 'react';
import Cards from './cards';

class Scroll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pageSize: 20,
            page: 1,
            prevY: 0,
        };
    }

    componentDidMount() {
        this.props.getCards(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastPage = this.props.cards.length / this.state.pageSize;
            const curPage = lastPage + 1;
            if ( Number.isInteger(curPage) ) {
                this.props.getCards(curPage);
                this.setState({ page: curPage });
            }
        }
        this.setState({ prevY: y });
    }

    render() {

        const loadingCSS = {
            height: "200px",
            margin: "30px"
        };

        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
        return (
            <div className="container">
                <Cards cards={this.props.cards} />
                <div ref={loadingRef => (this.loadingRef = loadingRef )} style={loadingCSS}>
                    <span className="loading" style={loadingTextCSS}>Loading<span>.</span><span>.</span><span>.</span></span>
                </div>
            </div>
        );
    }

}

export default Scroll;