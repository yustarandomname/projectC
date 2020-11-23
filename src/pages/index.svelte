<script>
  import EmptyContainer from "./../_components/containers/EmptyContainer.svelte";
  import Button from "./../_components/buttons/Button.svelte";
  import Container from "./../_components/Containers/container.svelte";
  import Login from "./../_components/authentication/Login.svelte";

  import { FirebaseApp, User, Doc } from "sveltefire";
  import { url } from "@sveltech/routify";

  import firebase from "firebase/app";
  import "firebase/auth";
</script>

<style>
  .appGrid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  a {
    text-decoration: none;
  }
</style>

<FirebaseApp {firebase}>
  <User let:user on:user>
    <Doc path={`users/${user.uid}`} let:data={user}>
      <EmptyContainer>
        <div class="appGrid">
          {#each Object.entries(user.apps) as [title, app]}
            <a href={$url('/' + app.url)} style="order:{app.order}">
              <Button icon={app.icon || 'X'} toolTip={title} />
            </a>
          {/each}
        </div>
      </EmptyContainer>
    </Doc>

    <div slot="signed-out">
      <Login />
    </div>
  </User>
</FirebaseApp>
