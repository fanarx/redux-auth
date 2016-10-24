import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ type, field, value, label, error, onChange }) => {
    return (
        <div className={classnames("form-group", { 'has-error': error })} >
            <label className="control-label">{label}</label>
            <input 
                value={value}
                onChange={onChange}
                type={type}
                name={field}
                className="form-control"
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;