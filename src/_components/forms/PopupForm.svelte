<script>
  import PopUpContainer from "./../containers/PopUpContainer.svelte";
  import Form from "./Form.svelte";

  export let form = {};
  export let onClose = () => (form = {});
</script>

{#if Object.keys(form).length}
  <PopUpContainer title={form.header} {onClose}>
    <Form {form} />
  </PopUpContainer>
{/if}
