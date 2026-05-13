import React from 'react';

class NumberForm extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-success btn-lg w-120"
                        onClick={this.props.onAddClick}
                    >
                        Add Number
                    </button>
                </div>
            </div>
        );
    }
}

export default NumberForm;