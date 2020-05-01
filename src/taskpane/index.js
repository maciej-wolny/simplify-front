import "office-ui-fabric-react/dist/css/fabric.min.css";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ResultsList from "./components/ResultsList";
import CommencementSearchBox from "./components/CommencementSearchBox";
import GoogleAuth from "./components/authentication/GoogleAuth";
import FacebookAuth from "./components/authentication/FacebookAuth";
import { SubscriptionType } from "./components/authentication/SubscriptionType";
import MicrosoftAuth from "./components/authentication/MicrosoftAuth";
import { CompoundButton, Stack, IStackTokens } from "office-ui-fabric-react";

Office.onReady();
initializeIcons();

class AddinComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: null,
      sthELse: "bum",
      authenticated: false,
      subscription: null,
      user: null,
      error: null
    };
    this.setParentState = this.setParentState.bind(this);
  }

  setParentState(state) {
    this.setState(state);
  }

  login() {
    Office.context.ui.displayDialogAsync("https://localhost:3000/taskpane2.html", {
      height: 60,
      width: 40,
      displayInIframe: true
    });
  }

  simplify() {
    if (this.state.authenticated) {
      if (this.state.user.subscription == SubscriptionType.ACTIVE) {
        return (
          <div>
            <CommencementSearchBox searchValue={this.state.searchValue} setParentState={this.setParentState} />
            <ResultsList searchValue={this.state.searchValue} />
          </div>
        );
      }
      return (
        <div>
          <p>Witaj {this.state.user.name}!</p>
          <CommencementSearchBox searchValue={this.state.searchValue} setParentState={this.setParentState} />
          <ResultsList searchValue={this.state.searchValue} />
        </div>
      );
    }

    return (
      <div>
        {/* <GoogleAuth setParentState={this.setParentState} />
        <br />
        <MicrosoftAuth setParentState={this.setParentState} />
        <br />
        <FacebookAuth setParentState={this.setParentState} />
        <br /> */}
        <div>
          <div>hello</div>
          <p>
            Open link: <a href="https://www.whatsmybrowser.org/">Google!</a>
          </p>
        </div>
        <CompoundButton onClick={i => this.login()} primary secondaryText="Kliknij tutaj by się zalogować">
          Zaloguj się
        </CompoundButton>
      </div>
    );
  }

  render() {
    return this.simplify();
  }
}

ReactDOM.render(<AddinComponent />, document.getElementById("container"));
