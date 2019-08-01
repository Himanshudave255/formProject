import React,{useState} from 'react'
import RUCforms from '../RUCformsComponent/RUCforms';
let data=
            {name: {
                value: '',
                id: 'name',
                type: 'text',
                label: 'Enter you name',
                placeholder: 'Enter Name',
                className: 'text-field',
                margin: 'normal',
                helperText: { success: 'Enter you name', fail: 'Invalid name' },
                status: false,
                validators: { required: false, minLength: 2, maxLength: 10 },
                variant: 'outlined',
            },
            email: {
                id: 'email',
                helperText: { success: 'Enter you name', fail: 'Invalid name' },
            }};
function WriteToUs() {
    let customValidation = {
        email: { function: customEmailvalidation },
    };
    const [formState,updateFormState]=useState(data);
    setTimeout(()=>{
        // alert("hi")
        updateFormState({name: {
            value: '',
            id: 'name',
            type: 'text',
            label: 'Enter you father name',
            placeholder: 'Enter father Name',
            className: 'text-field',
            margin: 'normal',
            helperText: { success: 'Enter you father name', fail: 'Invalid name' },
            status: false,
            validators: { required: false, minLength: 2, maxLength: 10 },
            variant: 'outlined',
        }
        });
    },5000);
    function signupFormData(status,value){

    }

    function customEmailvalidation(value){
        if(value.includes(".co.in")){
            return false
        }else{
            return true
        }
    }
    return (
        <div>
            <RUCforms
					// submitButtonText="Add Your FeedBack"
					// formClass="sign-up-class"
					// custom={customValidation}
					form={formState}
					// formOutput={signupFormData}
			/>
        </div>
    )
}

export default WriteToUs
