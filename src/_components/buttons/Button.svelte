<script>
  import Icon from "./../icons/icon.svelte";

  export let icon = "";
  export let toolTip = "";
  export let toolSide = "bottom";
</script>

<style>
  .button {
    height: 3rem;
    width: 3rem;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    position: relative;
    cursor: pointer;
  }

  .button:hover {
    border-color: var(--green);
  }

  .toolTip {
    position: absolute;
    display: none;
    font-size: 0.8rem;
    color: var(--unset);
    width: max-content;
  }

  .leftTip {
    right: 3.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .bottomTip {
    top: 3.5rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .button:hover .toolTip {
    display: block;
  }
</style>

<div class="button" on:click>
  <Icon {icon} size="1.5rem" />
  <div class="toolTip {toolSide}Tip">{toolTip}</div>
</div>
