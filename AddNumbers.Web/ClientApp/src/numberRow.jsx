import React from 'react';


class NumberRow extends React.Component {

    render() {
        const { number, onSelectClick, isSelected, disabled } = this.props;
        return <tr>
            <td>{number}</td>
            <td>
                <button className={`btn btn-${isSelected ? 'danger' : 'primary'}`}
                    disabled={disabled}
                    onClick={onSelectClick}>{isSelected ? 'Remove From Selected' : 'Add To Selected'}</button>
            </td>
        </tr>
    }
}
export default NumberRow;
