import * as React from "react";
import {config} from "../../config";
import {AxiosInstance as axios} from "axios";
import FacebookLogin from 'react-facebook-login';

const FACEBOOK_APP_ID = "";

class FacebookAuth extends React.Component {

    constructor(props) {
        super(props);
    }

    responseFacebook = (response) => {
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
        return <FacebookLogin
            appId={FACEBOOK_APP_ID}
            autoLoad={true}
            fields="name,email,picture"
            callback={this.responseFacebook}/>
    }
}

export default FacebookAuth
