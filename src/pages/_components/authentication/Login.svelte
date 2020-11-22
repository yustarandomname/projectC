<script>
  import CustomForm from "./../forms/CustomForm.svelte";
  import Container from "./../containers/Container.svelte";

  import { notifications } from "../../_stores/notificationStore.js";

  import firebase from "firebase/app";
  import "firebase/auth";

  const auth = firebase.auth();
  const db = firebase.firestore();

  let isKnownEmail = false;
  let newUser = false;
  let codeValid = false;

  // TODO: move to LoginLogic.js
  let forms = {
    checkEmail: {
      fields: {
        Email: {
          type: "email",
          required: true,
          autoComplete: "email"
        },
        "Sign in": {
          type: "submit",
          onSubmit: () => console.log("submit email")
        }
      }
    }
  };
</script>

{#if !auth.currentUser}
  <Container>
    <!-- if user filled in an email which is registered by our database -->
    {#if isKnownEmail}
      <div class="title">Welcome back</div>
      <p>
        To enhance your project experience please sign in with your credentials.
      </p>

      <!-- <CustomForm form={forms.checkPassword} /> -->
    {:else}
      <div class="title">Nice to meet you</div>
      <p>
        To enhance your project experience please sign in with your credentials.
      </p>

      <CustomForm form={forms.checkEmail} />
    {/if}
  </Container>
{/if}
