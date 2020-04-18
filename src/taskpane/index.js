import "office-ui-fabric-react/dist/css/fabric.min.css";
import {initializeIcons} from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ResultsList from "./components/ResultsList";
import CommencementSearchBox from "./components/CommencementSearchBox";

initializeIcons();

class AddinComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
            sthELse: 'bum'
        };
        this.updateParentState = this.updateParentState.bind(this)
    }

    updateParentState(resultsList) {
        this.setState({
            searchValue: resultsList
        })
    }

    render() {
        const searchValue = this.state.searchValue;
        return (
            <div>
                <CommencementSearchBox
                    searchValue={searchValue}
                    setParentState={this.updateParentState}
                />
                <div>
                    <ResultsList
                        searchValue={searchValue}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <AddinComponent/>,
    document.getElementById('container')
);
