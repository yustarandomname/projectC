<script>
  import Container from "./_components/Containers/container.svelte";
  import Login from "./_components/authentication/Login.svelte";

  import { FirebaseApp, User } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/auth";
</script>

<FirebaseApp {firebase}>
  <User let:user on:user>
    <Container>
      <h1>Welcome {user.uid}</h1>
    </Container>

    <div slot="logged-out">
      <Login />
    </div>
  </User>
</FirebaseApp>
