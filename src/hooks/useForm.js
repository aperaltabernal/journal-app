import { useMemo } from "react";
import { useEffect, useState } from "react"

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    //Cada vez que cambie el formulario, se ejecuta el createValidators()
    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);
    

    const isFormValid = useMemo(() => {
        
        for (const formField of Object.keys(formValidation)) {
            if(formValidation[formField] !== null) return false;
        }
        
        return true;
    }, [formValidation]);

    const onInputChange = ({target}) => {
        setFormState({
            ...formState,
            [target.name] : target.value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, erroMessage = 'Este campo es requerido'] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : erroMessage;
        }

        setFormValidation(formCheckedValues);
    }

    return {
        formState,
        ...formState,

        ...formValidation,
        isFormValid,

        onInputChange,
        onResetForm
    }
}