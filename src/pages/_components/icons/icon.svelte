<script>
  export let icon = "⋰";
  export let tooltip = "";
  export let toolSide = "bottom";
  export let size = "1rem";
</script>

<style>
  .icon {
    position: relative;
    cursor: pointer;
    padding: 0.5rem;
    transition: 0.3s;
    font-size: 0.8rem;
  }

  .tooltip {
    position: absolute;
    display: none;
    font-size: 0.8rem;
    left: 50%;
    bottom: -0.5rem;
    color: #999;
    transform: translateX(-50%);
  }

  .tooltip.toolTop {
    bottom: unset;
    top: -0.5rem;
  }

  .icon:hover .tooltip {
    display: block;
  }
</style>

<div class="icon" on:click>
  <div
    style="height:{size}; width:{size}; font-size:{'calc(' + size + '* 0.8)'};
    text-align:center">
    {icon}
  </div>

  <!-- TODO: Animate this	 -->
  {#if tooltip}
    <div class="tooltip" class:toolTop={toolSide == 'top'}>{tooltip}</div>
  {/if}
</div>
