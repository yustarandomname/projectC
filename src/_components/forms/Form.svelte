<script>
  import Radio from "./../inputs/Radio.svelte";
  import Input from "../inputs/Input.svelte";

  import { url } from "@sveltech/routify";
  import { notifications } from "../../_stores/NotificationStore.js";

  export let form = {};

  const handleSubmit = onSubmit => {
    let isAllValid = true;

    // if any attribute is required but is not valid =>
    // whole form is not valid
    Object.entries(form.fields).forEach(([title, attributes]) => {
      if (attributes.required && !attributes.isValid) {
        isAllValid = false;

        // TODO: Replace with notifications
        console.warn(title + " is not formated properly");
      }
    });

    if (isAllValid) onSubmit();
  };
</script>

<style>
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  input[type="submit"] {
    width: fit-content;
    cursor: pointer;
    border-radius: 0.3rem;
    background: var(--green);
    padding: 0.5rem;
  }

  .positionSubmit {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
  }

  .title {
    margin-bottom: 1rem;
  }

  .radioContainer {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
</style>

<form>
  <slot />
  {#each Object.entries(form.fields) as [title, attributes], index}
    <!-- type: Header -->
    {#if attributes.type == 'header'}
      <div class="title">{title}</div>

      <!-- type: Info -->
    {:else if attributes.type == 'info'}
      <p>{attributes.value}</p>

      <!-- type: Radio -->
    {:else if attributes.type == 'radio'}
      <div class="radioContainer">
        <div style="width:100%">{title}</div>
        <Radio {attributes} {title} />
      </div>

      <!-- type: Submit -->
    {:else if attributes.type == 'submit'}
      <div class="positionSubmit">
        <input
          type="submit"
          value={title}
          on:click|preventDefault={() => handleSubmit(attributes.onSubmit)} />
      </div>
    {:else}
      <Input {title} {attributes} {form} />
    {/if}
  {/each}
</form>
