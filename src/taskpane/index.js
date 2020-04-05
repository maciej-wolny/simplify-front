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

    updateState() {
        // Note: this will *not* work as intended.
        this.setState({searchValue: [
                {name: "ABC1"},
                {name: "ABC2"}
            ]})
    }

      render() {
        return (
            <div className="searchbox">
              <SearchBox
                  placeholder="tutaj cos wpisz"
                  // onSearch={newValue => console.log('value is ' + newValue)}
                  onChange={(i, newValue) =>
                  {
                      console.log(newValue)
                      this.updateState()
                      console.log(this.props.searchValue)
                      var resultsObj = {};
                      var resultsList = [];
                      axios.get(`https://simplify-docs.appspot.com/krs/search/${newValue}`)
                          .then(function (response) {
                              var data = response['data'].results;
                              for (var result in data) {
                                  // console.log(`dupcia: ${data[result].name}`);
                                  // resultsObj[data[result].nip] = data[result].name
                                  resultsObj["name"] = data[result].name
                                  resultsList.push(resultsObj)
                                  resultsObj = {};
                              }
                              this.setState({searchValue: [
                                      {name: "ABC1"},
                                      {name: "ABC2"}
                                  ]})
                          })
                          .catch(function (error) {
                              // handle error
                              // console.log(error);
                          })
                          .then(function () {
                          });
                      this.setState({searchValue: [
                              {name: "ABC1"},
                              {name: "ABC2"}
                          ]})
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
          searchValue: [
              {name: "Lorem ipsum dolor sit amet,"},
              {name: "huzia na juzia"}
          ],
          sthELse: 'bum'
      }
  }


  render() {
    const searchValue = this.state.searchValue;
    return (
        <div>
        <SearchBoxClass
            searchValue={searchValue}
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




function getSearchResultsById(prefix) {
    var resultsObj = {};
    var resultsList = [];
    axios.get(`https://simplify-docs.appspot.com/krs/search/${prefix}`)
        .then(function (response) {
            var data = response['data'].results;
            for (var result in data) {
                // console.log(`dupcia: ${data[result].name}`);
                // resultsObj[data[result].nip] = data[result].name
                resultsObj["name"] = data[result].name
                resultsList.push(resultsObj)
                resultsObj = {};
            }
            console.log(resultsList)
            return resultsList
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

