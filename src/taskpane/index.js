import "office-ui-fabric-react/dist/css/fabric.min.css";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { List } from 'office-ui-fabric-react/lib/List';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
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
        this.props.setParentState(resultsList)
    }

      render() {

        return (
          <div className="searchbox">
            <SearchBox
                placeholder="tutaj cos wpisz"
                onChange={(i, newValue) =>
                {
                    var resultsObj = {};
                    var resultsList = [];
                    axios.get(`https://simplify-docs.appspot.com/krs/search/${newValue}`)
                        .then(function (response) {
                            var data = response['data'].results;
                            for (var result in data) {
                                resultsObj["name"] = data[result].name
                                resultsObj["krs"] = data[result].krs
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
                underlined={true}
            />
          </div>
      );
    }
  }


class ResultsList extends React.Component {
      constructor(props){
          super(props);

      this._selection = new Selection({
        onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
        })
      }

      click = (event) => {
        const listIndex = event.target.dataset.listIndex;
        const text = this.props.searchValue[listIndex];
        const krsNo = text.krs
        console.log(krsNo)
        this.getComparareByKrsNo(krsNo)
      }

      getComparareByKrsNo = (krsNo) => {
        axios.get(`http://localhost:5000/get_krs_data/${krsNo}`)
            .then(function (response) {
              var comparare = response['data'].results;
              console.log(comparare);
              return Word.run(async context => {
                // insert a paragraph at the end of the document.
                const paragraph = context.document.body.insertParagraph(String(comparare), Word.InsertLocation.end);
                // change the paragraph color to blue.
                paragraph.font.color = "black";
                await context.sync();
              })
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            // Will execute regardless of the result of the function
            .then(function () {
            });
      }


      render() {
        return (
            <div className={styles.container} data-is-scrollable={true}>
              <List
                  // ref={this._resolveList}
                  items={this.props.searchValue}
                  onClick={event => this.click(event)}
                  onSelect={() => console.log(`onSelect called`)}
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
