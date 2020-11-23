<script>
  import Input from "./../inputs/Input.svelte";

  export let form = {};

  const handleSubmit = onSubmit => {
    let isAllValid = true;

    // if any attribute is required but is not valid =>
    // whole form is not valid
    Object.entries(form.fields).forEach(([title, attributes]) => {
      if (attributes.required && !attributes.isValid) {
        isAllValid = false;

        // TODO: Replace with notifications
        console.log(title + " is not formated properly");
      }
    });

    if (isAllValid) onSubmit();
  };
</script>

<form>
  {#each Object.entries(form.fields) as [title, attributes], index}
    <!-- type: Hidden -->
    {#if attributes.type == 'hidden'}
      <input
        type="hidden"
        value={attributes.value}
        autocomplete={attributes.autoComplete} />
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
