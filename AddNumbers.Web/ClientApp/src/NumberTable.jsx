import React from 'react';
import { v4 as uuidv4 } from "uuid";
import NumberRow from './NumberRow';
import NumberForm from './NumberForm';
import { produce } from 'immer';


class NumberTable extends React.Component {
    state = {
        numbers: [],
            number: '',
        SelectedNumbers: [],
        lockedNumbers: []
    }

    onAddClick = () => {
        const num = Math.floor(Math.random() * 100) + 1;
        const nextState = produce(this.state, draft => {
            draft.numbers.push({ num, id: uuidv4() });
        });
        this.setState(nextState);
    }

    onSelectClick = (num) => {
        if (this.state.SelectedNumbers.includes(num.numId)) {
            const filtered = this.state.SelectedNumbers.filter(id => id !== num.numId);
            this.setState({ SelectedNumbers: filtered })
        }
        else {
            const copy = [...this.state.SelectedNumbers, num.numId];
            this.setState({ SelectedNumbers: copy });
        }
    }


    onLockedClick = (n) => {
        const nextState = produce(this.state, draft => {
            const isLocked = draft.lockedNumbers.some(x => num.numId === n.numId);

            if (isLocked) {
                draft.lockedNumbers = draft.lockedNumbers.filter(x => num.numId !== n.numId);
            } else {
                draft.lockedNumbers.push(n);
            }
        });
        this.setState(nextState);
    }

    getSelectedNum = () => {
        const { SelectedNumbers, numbers, lockedNumbers } = this.state;
        
        if (!SelectedNumbers.length) return null;
        
        const selected = numbers.filter(n => SelectedNumbers.includes(n.numId));
        
        return (
            <div className="row p-5 rounded">
                <div className="col-md-6 col-md-offset-3">
                    <h3>Selected Numbers</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Lock/Unlock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selected.map((n) => {
                                const isLocked = lockedNumbers.some(l => l.numId === n.numId);
                                return (
                                    <tr key={n.numId}>
                                        <td>{n.number}</td>
                                        <td>
                                            <button
                                                className={`btn btn-${isLocked ? 'primary' : 'danger'}`}
                                                onClick={() => this.onLockedClick(n)}
                                            >
                                                {isLocked ? 'Unlock' : 'Lock'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    getContent = () => {
        return (
            <div style={{ maxHeight: 500, overflowY: 'scroll' }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.numbers.map((n) => {
                            const isLocked = this.state.lockedNumbers.some(l => l.numId === n.numId);
                            return (
                                <NumberRow
                                    key={n.numId}
                                    number={n.number}
                                    onSelectClick={() => this.onSelectClick(n)}
                                    isSelected={this.state.SelectedNumbers.includes(n.numId)}
                                    disabled={isLocked}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 60 }} >
                <NumberForm
                    onAddClick={this.onAddClick}>
                </NumberForm>
                <div>
                    {this.getContent()}
                    {this.getSelectedNum()}
                </div>

            </div>
        );
    }
}

export default NumberTable;