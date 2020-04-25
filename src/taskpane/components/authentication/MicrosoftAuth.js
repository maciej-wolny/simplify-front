import * as React from "react";
import axios from "axios";
import {config} from "../../config";
import MicrosoftLogin from "react-microsoft-login";

const MICROSOFT_CLIENT_ID = "";

class MicrosoftAuth extends React.Component {

    constructor(props) {
        super(props);
    }

    responseMicrosoft = (response) => {
        axios.post(config.backendURL + `/user/tokenSign`, {"token": response.tokenId})
            .then(response => {
                    console.log(response);
                    this.props.setParentState({authenticated: true});
                }
            ).catch(function (error) {
            this.props.setParentState({error: error});
            console.log(error);
        });
    };

    render() {
        return <MicrosoftLogin
            clientId={MICROSOFT_CLIENT_ID}
            authCallback={this.responseMicrosoft}/>
    }
}

export default MicrosoftAuth
