<script lang="ts">
  import { afterUpdate } from "svelte";
  import Menubar from "./Menubar.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import terminalIcon from "$lib/assets/terminal.png";
  import githubIcon from "$lib/assets/github.png";

  let terminal: HTMLDivElement;
  let showTerminal = true;

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      terminal.classList.remove("fullscreen");
      document.exitFullscreen();
    } else {
      terminal.classList.add("fullscreen");
      terminal.requestFullscreen();
    }
  };

  const closeTerminal = () => (showTerminal = false);

  afterUpdate(() => {
    if (document.body.offsetWidth > 650 && terminal) terminal.scrollTop = terminal.scrollHeight;
  });
</script>

<div class="terminal" bind:this={terminal} style:display={showTerminal ? "grid" : "none"}>
  <Menubar {closeTerminal} {toggleFullscreen} />
  <div class="content">
    <slot />
    {#if !$page.url.pathname.startsWith("/contact")}
      <p class="command"><span id="cursor">_</span></p>
    {/if}
  </div>
</div>

<div class="desktop" style:display={!showTerminal ? "flex" : "none"}>
  <button on:click={() => (showTerminal = true)}>
    <img src={terminalIcon} alt="Terminal Icon" />
    <span>Terminal</span>
  </button>
  <button on:click={() => goto("https://github.com/0x5045414b")}>
    <img src={githubIcon} alt="GitHub Icon" />
    <span>GitHub</span>
  </button>
</div>

<style lang="scss">
  .terminal {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 36px 36px 1fr;

    user-select: none;
    font-family: "Source Code Pro", monospace;
    font-size: 1.5rem;
    background: #1e1e1eee;
    color: white;

    border-radius: 12px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);

    &:global(.fullscreen) {
      border-radius: 0;

      :global(.menu) {
        border-radius: 0;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 5px 1rem 1rem;
      overflow-y: scroll;
    }

    .command {
      &::before {
        content: "> ";
      }
    }

    #cursor {
      animation: blink 0.8s step-end infinite;
    }

    @media (max-width: 650px) {
      font-size: 1rem;
    }
  }

  .desktop {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    button {
      color: white;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
      font-size: 1rem;
      padding: 0;
      margin: 0;

      img {
        width: 75px;
      }
    }
  }

  // prettier-ignore
  @keyframes blink {
    from, to { opacity: 0; }
    50% { opacity: 1; }
  }
</style>
