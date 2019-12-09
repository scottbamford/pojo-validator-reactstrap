import * as React from 'react';
import { FormFeedback } from 'reactstrap';
import { ValidationErrors } from 'pojo-validator';

export interface ValidatedFormFeedbackProps {
    name: string | undefined,
    validationErrors: ValidationErrors | Array<string> | string | undefined | null,
}

/**
 * Show validation errors inside a FormFeedback.
 * @param props
 */
export const ValidatedFormFeedback = (props: ValidatedFormFeedbackProps) => {
    // Use the ...rest technique to remove our own props from those we need to pass on to FormFeedback.
    const { validationErrors, ...rest } = props;

    // Find the errors based on the types we support.
    let errors: Array<string> = [];
    if (!validationErrors) {
        // Errors can stay as an empty array.
    } else if (typeof validationErrors === 'string') {
        errors = [validationErrors];
    } else if (Array.isArray(validationErrors)) {
        errors = validationErrors;
    } else {
        // We have ValidationErrors from Validator.errors()
        errors = validationErrors[(props.name ? props.name : '')] || [];
    }

    let hasErrors = (errors && errors.length ? true : false);

    if (!hasErrors || !errors) {
        return (<></>);
    }

    return (
        <FormFeedback>
            {
                errors.map(item => (
                    <div key={item}>
                        {item}
                    </div>
                ))
            }
        </FormFeedback>
    );
};