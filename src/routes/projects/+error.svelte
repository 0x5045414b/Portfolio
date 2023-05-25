<script lang="ts">
  import { page } from "$app/stores";
  import Command from "$components/Command.svelte";

  const path = $page.url.pathname.slice(1);
  let pathString = decodeURIComponent(path);
  if (pathString.includes(" ")) pathString = `"${pathString}"`;
</script>

<svelte:head>
  <title>{$page.status} - Dan Peak</title>
</svelte:head>

<Command
  command={{
    request: "./" + pathString,
    response: {
      text: `zsh: ${$page.error?.message}: ./${decodeURIComponent(path)}`,
      links: [],
    },
  }}
/>
