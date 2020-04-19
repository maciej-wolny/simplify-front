import * as React from "react";
import axios from "axios";
import {config} from "../../config";
import {GoogleLogin} from "react-google-login";

const GOOGLE_CLIENT_ID = "580560711588-j2oalj996ncpdor4ap3afba0pificq22.apps.googleusercontent.com";

class GoogleAuth extends React.Component {

    constructor(props) {
        super(props);
    }

    responseGoogle = (response) => {
        axios.post(config.backendURL + `/user/tokenSign`,
            {
                "token": response.tokenId,
                "provider": "GOOGLE"
            })
            .then(response => {
                    this.props.setParentState(
                        {
                            authenticated: true,
                            user: response.data
                        });
                }
            ).catch(function (error) {
            this.props.setParentState({error: error});
            console.log(error);
        });
    };

    render() {
        return <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    }
}

export default GoogleAuth
