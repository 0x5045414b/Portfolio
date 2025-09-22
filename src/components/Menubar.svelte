<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import GitHub from "./GitHub.svelte";

  export let closeTerminal: () => void;
  export let toggleFullscreen: () => void;
  let tabBar: HTMLDivElement;

  $: tabs = [
    {
      title: "Home",
      slug: "/",
      active: $page.url.pathname === "/",
    },
    {
      title: "Projects",
      slug: "/projects",
      active: $page.url.pathname === "/projects" || $page.url.pathname.includes("/projects/"),
    },
    {
      title: "Contact",
      slug: "/contact",
      active: $page.url.pathname === "/contact" || $page.url.pathname === "/contact/",
    },
  ];

  let othertab = "";
  $: activeTab = tabs.some(tab => tab.active);
  $: if (!activeTab) othertab = $page.url.pathname;

  onMount(() => {
    if ($page.url.pathname === othertab) {
      const active = document.querySelector(".tabs > a.active") as HTMLAnchorElement;
      tabBar?.scrollTo({ behavior: "instant", left: active.offsetLeft });
    }
  });
</script>

<div class="menu">
  <div class="buttons">
    <button on:click={closeTerminal} aria-label="Close Terminal"></button>
    <button aria-disabled="true" aria-label="Minimize Terminal"></button>
    <button on:click={toggleFullscreen} aria-label="Toggle Fullscreen"></button>
  </div>
  <div class="title">
    <a href="https://github.com/0x5045414b" target="_blank">
      <GitHub />
      <h1>Dan Peak</h1>
    </a>
  </div>
  <div style="width: 72px; flex-shrink: 0"></div>
</div>
<div class="tabs" class:scroll={!!othertab} bind:this={tabBar}>
  {#each tabs as tab (tab.title)}
    <a class:active={tab.active} href={tab.slug}>{tab.title}</a>
  {/each}
  {#if othertab}
    <a class:active={$page.url.pathname === othertab} href={othertab}>ls {othertab.slice(1)}</a>
  {/if}
  <span class="newTab">+</span>
</div>

<style lang="scss">
  :root {
    --barheight: 36px;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: var(--barheight);
    background: #37383a;
    border-radius: 12px 12px 0 0;

    h1 {
      font-size: 1rem;
      margin: 0;
      padding: 0;
      line-height: 28px;
    }

    .title a {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 9px;
      padding: 0 9px;
      color: white;
      text-decoration: none;
    }

    .buttons {
      display: flex;
      width: 72px;
      height: 100%;
      padding: 0 9px;
      gap: 9px;
      justify-content: space-evenly;
      align-items: center;

      button {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;

        &:nth-of-type(1) {
          background: #ff5f56;
        }
        &:nth-of-type(2) {
          background: #ffbd2e;
        }
        &:nth-of-type(3) {
          background: #27c93f;
        }
      }
    }
  }

  .tabs {
    width: 100%;
    height: var(--barheight);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr)) var(--barheight);
    border-bottom: 1px solid black;
    background: #1e1e1e;

    a {
      display: inline-block;
      padding: 8px;
      text-align: center;
      font-size: 1rem;
      color: #929292;
      text-decoration: none;
      border-right: 1px solid #454444;
      width: 100%;
      white-space: nowrap;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        background: #2d2d2f;
      }

      &.active {
        color: white;
        background: #37383a;
      }
    }

    @media (max-width: 650px) {
      &.scroll {
        position: relative;
        grid-template-columns: repeat(4, 155px) var(--barheight);
        overflow-x: scroll;
        overflow-y: hidden;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    .newTab {
      grid-column: -2 / -1;
      display: grid;
      place-items: center;
      color: #929292;
    }
  }
</style>
