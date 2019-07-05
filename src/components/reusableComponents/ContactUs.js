import React ,{useState} from 'react';

export default function ContactUs(props) {
    const [name,updateName]=useState(props.heading);
    const opend=()=>{
        updateName("dsadsadsa");
    }
    return (
        <div>
            {name}
            <button onClick={opend}>click</button>
        </div>
    )
}
