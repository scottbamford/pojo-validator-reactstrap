import * as React from 'react';
import { Input, InputProps } from 'reactstrap';
import { ValidatedFormFeedback } from './ValidatedFormFeedback';
import { ValidationErrors } from 'pojo-validator';

export interface ValidatedInputProps extends InputProps {
    validationErrors: ValidationErrors | Array<string> | string
    hideFormFeedback?: boolean,
    component?: React.ComponentClass | React.StatelessComponent | React.FunctionComponent
}

/**
 * Wrapper around Input that will set invalid="true" if we have any errors passed in for our name.
 * @param props
 */
export const ValidatedInput = (props: ValidatedInputProps) => {
    // Use the ...rest technique to remove our own props from those we need to pass on to Input.
    const { component, validationErrors, hideFormFeedback, ...rest } = props;

    // Find the errors based on the types we support.
    let errors: Array<string> = [];
    if (typeof validationErrors === 'string') {
        errors = [validationErrors];
    } else if (Array.isArray(validationErrors)) {
        errors = validationErrors;
    } else {
        // We have ValidationErrors from Validator.errors()
        errors = validationErrors[(props.name ? props.name : '')] || [];
    }

    const hasErrors = errors.length ? true : false;

    const Component: any = component || Input;

    return (
        <>
            <Component {...rest} invalid={hasErrors} />
            {
                hideFormFeedback ? (
                    <React.Fragment></React.Fragment>
                )
                    : (
                        <ValidatedFormFeedback name={props.name} validationErrors={props.validationErrors} />
                    )
            }
        </>
    );
};