<script>
  export let attributes; // All field properties
</script>

<input
  type="text"
  bind:value={attributes.value}
  required={attributes.required}
  autocomplete={attributes.autoComplete}
  on:keyup />
