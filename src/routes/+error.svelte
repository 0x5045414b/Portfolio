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
    request: "ls " + pathString,
    response: {
      text: `ls: ${decodeURIComponent(path)}: ${
        $page.status === 404 ? "No such file or directory" : $page.error?.message
      }`,
      links: [],
    },
  }}
/>
