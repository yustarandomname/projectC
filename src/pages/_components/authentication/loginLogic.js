import firebase from "firebase/app";
import "firebase/auth";

export let loginData = {
  isKnownEmail: false,
  newUser: false,
  codeValid: false
}

export let isKnownEmail = false

export let loginForms = {
  checkEmail: {
    fields: {
      Email: {
        type: "email",
        required: true,
        autoComplete: "email"
      },
      "Sign in": {
        type: "submit",
        onSubmit: () => checkEmail()
      }
    }
  }
};

const db = firebase.firestore();

function checkEmail() {
  const email = loginForms.checkEmail.fields["Email"].value || "";

  // validate if email exist in database
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then((users) => {
      users.forEach((userDoc) => {
        if (userDoc.data().email == email) {
          isKnownEmail = email;
          console.log(email)
        }
      });

      // if User is not known => then user is a new User
      loginData.newUser = !loginData.isKnownEmail;
    });
}
