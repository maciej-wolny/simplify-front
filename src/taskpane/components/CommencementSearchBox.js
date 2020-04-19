import * as React from "react";

import axios from 'axios';
import config from '../config'
import {SearchBox} from "office-ui-fabric-react";

class CommencementSearchBox extends React.Component {
    constructor(props) {
        super(props);
    }

    updateState(resultsList) {
        this.props.setParentState({
            searchValue: resultsList
        })
    }

    render() {

        return (
            <div className="searchbox">
                <SearchBox
                    placeholder="tutaj cos wpisz"
                    onChange={(i, newValue) => {
                        let resultsObj = {};
                        let resultsList = [];
                        console.log(config.backendURL + `/krs/search/${newValue}`)
                        axios.get(config.backendURL + `/krs/search/${newValue}`)
                            .then(function (response) {
                                let data = response['data'].results;
                                for (let result in data) {
                                    resultsObj["name"] = data[result].name
                                    resultsObj["krs"] = data[result].krs
                                    resultsList.push(resultsObj)
                                    resultsObj = {};
                                }
                            })
                            .catch(function (error) {
                                this.props.setParentState({error: error});
                                console.log(error);
                            })
                            .then(function () {
                            });
                        this.updateState(resultsList)
                    }}
                    underlined={true}
                />
            </div>
        );
    }
}

export default CommencementSearchBox
