import React from 'react';
import { fetchGet } from '../api/tmdb';
import { setPopular } from '../actions/actions';
import { connect } from 'react-redux';
import Movie from './Movie';

class Home extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.getPopular();
    }

    getPopular = () => {
        this.props.setPopular(fetchGet("/movie/popular", {}));
    }

    render() {
        const { popular } = this.props;
        console.log(popular);

        return (
            <>
                <h1>Popular Movies</h1>
                {/* {popular.map(m => (
                    <Movie movie={m} />
                ))} */}
            </ >
        )
    }
};

let mapStateToProps = state => {
    return {
        popular: state.popular,
    }
}

export default connect(mapStateToProps, { setPopular })(Home);