import React, {useState} from 'react'
import { myContext } from '../../App';
function AboutUs() { 
    // const [count, setCount]=useState(0);
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

export default AboutUs
