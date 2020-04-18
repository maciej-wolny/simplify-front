import * as React from "react";
import axios from 'axios';
import {Selection} from 'office-ui-fabric-react/lib/DetailsList';
import {List} from 'office-ui-fabric-react/lib/List';
import {mergeStyleSets, getTheme} from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();

const styles = mergeStyleSets({
    container: {
      overflow: 'auto',
      maxHeight: 500,
      marginTop: 20,
      selectors: {
        '.ms-List-cell': {
          height: 50,
          lineHeight: 50,
          overflow: 'hidden',
        },  
        '.ms-List-cell:nth-child(odd)': {
          background: theme.palette.neutralLighter,
        },
        '.ms-List-cell:nth-child(even)': {
        },
        '.ms-List-cell:hover': {
          background: theme.palette.neutralTertiaryAlt,
        },  
      },
    },
  });

class ResultsList extends React.Component {
    constructor(props) {
        super(props);

        this._selection = new Selection({
            onSelectionChanged: () => this.setState({selectionDetails: this._getSelectionDetails()}),
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
                />
            </div>
        );
    }
}

export default ResultsList
