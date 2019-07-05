import React, { Component } from 'react';
import { myContext } from '../../App';
export default class AboutUs extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <myContext.Consumer>
                    {
                        (data) => (
                            <h1>{data}</h1>
                        )
                    }
                </myContext.Consumer>
                
            </div>
        )
    }
}
