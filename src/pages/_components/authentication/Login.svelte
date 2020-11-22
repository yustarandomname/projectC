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
          onSubmit: () => checkEmail()
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
    }
  };

  function checkEmail() {
    const email = loginForms.checkEmail.fields["Email"].value || "";

    //validate if email exist in database
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then(users => {
        users.forEach(userDoc => {
          if (userDoc.data().email == email) {
            isKnownEmail = email;
          }
        });

        // if User is not known => then user is a new User
        isNewUser = !isKnownEmail;
      });
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
