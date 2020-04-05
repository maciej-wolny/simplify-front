import "office-ui-fabric-react/dist/css/fabric.min.css";
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { List } from 'office-ui-fabric-react/lib/List';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { mergeStyleSets, getTheme, normalize } from 'office-ui-fabric-react/lib/Styling';
/* global AppCpntainer, Component, document, Office, module, React, require */

initializeIcons();

const theme = getTheme();
const axios = require('axios');

const styles = mergeStyleSets({
  container: {
    overflow: 'auto',
    maxHeight: 500,
    marginTop: 20,
    selectors: {
      '.ms-List-cell:nth-child(odd)': {
        height: 50,
        lineHeight: 50,
        background: theme.palette.neutralLighter,
      },
      '.ms-List-cell:nth-child(even)': {
        height: 25,
        lineHeight: 25,
      },
    },
  },
  itemContent: [
    theme.fonts.medium,
    normalize,
    {
      position: 'relative',
      display: 'block',
      borderLeft: '3px solid ' + theme.palette.themePrimary,
      paddingLeft: 27,
    },
  ],
});



class SearchBoxClass extends React.Component {
    constructor(props){
        super(props);
    }

    updateState(resultsList) {
        // Note: this will *not* work as intended.
        this.props.setParentState(resultsList)
    }


      render() {

        return (
            <div className="searchbox">
              <SearchBox
                  placeholder="tutaj cos wpisz"
                  // onSearch={newValue => console.log('value is ' + newValue)}
                  onChange={(i, newValue) =>
                  {
                      var resultsObj = {};
                      var resultsList = [];
                      axios.get(`https://simplify-docs.appspot.com/krs/search/${newValue}`)
                          .then(function (response) {
                              var data = response['data'].results;
                              for (var result in data) {
                                  resultsObj["name"] = data[result].name
                                  resultsList.push(resultsObj)
                                  resultsObj = {};
                              }
                          })
                          .catch(function (error) {
                              // handle error
                              // console.log(error);
                          })
                          .then(function () {
                          });
                      this.updateState(resultsList)
                  }}

                  // onFocus={() => console.log(`onFocus called`)}
                  // onBlur={() => console.log(`onBlur called`)}
                  underlined={true}
              />
            </div>
        );
      }
    }



class ResultsList extends React.Component {
      constructor(props){
          super(props);
    }

      render() {

        return (

            <div className={styles.container} data-is-scrollable={true}>
              <List
                  // ref={this._resolveList}
                  items={this.props.searchValue}
                  //
                  // getPageHeight={this._getPageHeight}
                  // onRenderCell={this._onRenderCell}
              />
            </div>
        );
      }
}


class AddinComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          searchValue: null,
          sthELse: 'bum'
      }

      this.updateParentState = this.updateParentState.bind(this)
  }

    updateParentState(resultsList) {
        this.setState({searchValue: resultsList
        })
    }

  render() {
    const searchValue = this.state.searchValue;
    return (
        <div>
        <SearchBoxClass
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

// ========================================

ReactDOM.render(
<AddinComponent />,
    document.getElementById('container')
);

