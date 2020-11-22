<script>
  import CustomForm from "./../forms/CustomForm.svelte";
  import Container from "./../containers/Container.svelte";

  import { notifications } from "../../_stores/notificationStore.js";

  import firebase from "firebase/app";
  import "firebase/auth";

  const db = firebase.firestore();
  const auth = firebase.auth();

  let isKnownEmail = false;
  let isNewUser = false;
  let isCodeValid = false;

  let loginForms = {
    checkEmail: {
      fields: {
        Email: {
          type: "email",
          required: true,
          autoComplete: "email"
        },
        "Sign in": {
          type: "submit",
          onSubmit: () =>
            checkEmail(loginForms.checkEmail.fields["Email"].value)
        }
      }
    },
    checkPassword: {
      fields: {
        Email: {
          type: "email",
          required: true,
          autoComplete: "email",
          value: isKnownEmail
        },
        Password: {
          type: "password",
          required: true,
          autoComplete: "old-password"
        },
        "Sign in": { type: "submit", onSubmit: () => checkPassword() }
      }
    },
    checkCode: {
      fields: {
        Code: {
          type: "text",
          required: true,
          fullWidth: false
        },
        "Register code": { type: "submit", onSubmit: () => checkCode() }
      }
    },
    createUser: {
      fields: {
        Email: {
          type: "hidden",
          autoComplete: "username"
        },
        Password: {
          title: "Password",
          required: true,
          fullWidth: false,
          autoComplete: "new-password"
        },
        Register: { type: "submit", onSubmit: () => createUser() }
      }
    }
  };

  function checkEmail(email) {
    email = email || "";

    //validate if email exist in database
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then(users => {
        users.forEach(userDoc => {
          if (userDoc.data().email == email) {
            loginForms.checkPassword.fields["Email"].value = email;
            isKnownEmail = true;
          }
        });

        // if User is not known => then user is a new User
        isNewUser = !isKnownEmail;
      });
  }

  function checkPassword() {
    const email = loginForms.checkPassword.fields["Email"].value || "";
    const pass = loginForms.checkPassword.fields["Password"].value || "";

    // fix for the case that where user new-password is also filled in
    loginForms.createUser.fields["Password"].value = pass;

    // first check if email is still valid
    checkEmail(loginForms.checkPassword.fields.Email.value);

    if (isKnownEmail) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .catch(function(error) {
          notification.error(error.message);
        });
    }
  }

  function checkCode() {
    const code = loginForms.checkCode.fields["Code"].value || "";
    const email = loginForms.checkEmail.fields["Email"].value || "";

    db.doc(`/verification/${code}`)
      .get()
      .then(code => {
        const data = code.data();

        // if verification code is not yet used or verification code is bound to email
        if (!data.inUse || data.email == email) {
          isCodeValid = code;

          // set email (hidden)
          loginForms.createUser.fields["Email"].value = email;

          // set verification code to inUse and bound email to code
          code.ref.update({
            inUse: true,
            email: email
          });
        } else {
          notification.error("This verification code is already in use");
        }
      })
      .catch(e =>
        notification.error(
          "This varification code is not valid, have you entered the correct one?"
        )
      );
  }

  function createUser() {
    const email = loginForms.checkEmail.fields["Email"].value || "";
    const pass = loginForms.createUser.fields["Password"].value || "";

    // remove submit button so users wont double click
    loginForms.createUser.fields["Register"] = { type: "hidden" };

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(async function(res) {
        const uid = await res.user.uid;

        // setup database for user
        db.collection("users")
          .doc(uid)
          .set({
            email: email,
            apps: firstCommands
          })
          .then(succes => notification.succes("Succesfully created account"));
      })
      .catch(error => notification.error(error.message));
  }
</script>

<Container>
  {isKnownEmail}
  <!-- if user filled in an email which is registered by our database -->
  {#if !isKnownEmail}
    <div class="title" on:click={checkEmail}>Nice to meet you</div>
    <p>
      To enhance your project experience please sign in with your credentials.
    </p>

    <CustomForm form={loginForms.checkEmail} />
  {:else}
    <div class="title" on:click={() => (isKnownEmail = true)}>Welcome back</div>
    <p>
      To enhance your project experience please sign in with your credentials.
    </p>

    <CustomForm form={loginForms.checkPassword} />
  {/if}
</Container>

{#if isNewUser}
  <Container>
    {#if !isCodeValid}
      <div class="title">Welcome new user</div>
      <p>
        An email has been send to {loginForms.checkEmail.fields['Email'].value}.
        Please fill in the code received by email to activate your account.
      </p>

      <CustomForm form={loginForms.checkCode} />
    {:else}
      <div class="title">Welcome new user</div>
      <p>
        {loginForms.checkEmail.fields['Email'].value} is succesfully verified.
        Please enter a strong password to complete your register proces.
      </p>

      <CustomForm form={loginForms.createUser} />
    {/if}
  </Container>
{/if}
