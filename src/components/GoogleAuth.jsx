// Reference for step-by-step approach https://blog.logrocket.com/guide-adding-google-login-react-app/#packages-needed-add-google-login-react-app
// npm install gapi-script: an npm package that loads Google API scripts and initializes some functions.
// npm install gapi-script: an npm package that allows us to integrate the Google login feature into our React app. Also allows us to obtain the access tokens we need to access all Google APIs both quickly and safely.

/*
Before/after installing the above packages:
1. Acquire a Google client ID for your project. https://console.cloud.google.com/

2. Configure a Google login consent screen for your React app. [A consent screen, as the name suggests, is a consent page that prompts the user to use an external or third-party library to log in. Gives more information about your app to the user too.]

3. Create your web client ID

4. Save credentials generated for you web client ID
*/

/**
 * import GoogleLogin and gapi packages
 *
 * initialize your clientId using gapi, which is Google’s client library for browser-side JavaScript.
 *
 * add GoogleLogin button from react-google-login package. Read here for attributes/props the button can have https://www.npmjs.com/package/react-google-login
 */
import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const clientId =
  "1083388506222-p935iqdq548suhtmi3fom4u7vffo6hlj.apps.googleusercontent.com";

export default function GoogleAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const initializeClient = () => {
      gapi.client.init({
        clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initializeClient);
  }, [clientId]);

  const onSuccess = (res) => {
    // destructure email, googleId and user's firstname (givenName) from profile object returned by Google
    const { email, givenName, googleId } = res.profileObj;

    fetch("/db/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: givenName.toLowerCase(),
        email,
        googleId,
      }),
    })
      .then((res) => {
        if (res.ok && res.status === 200) return res.json();
        throw new Error("Some other thing went wrong.");
      })
      .then((data) => {
        console.log(data, "google signup/in data");
        return navigate("/home", { state: data.user_info });
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Signup/Login with Google"
        onSuccess={onSuccess}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false} //will call onSuccess callback on load to keep the user signed in.
      />
    </>
  );
}
