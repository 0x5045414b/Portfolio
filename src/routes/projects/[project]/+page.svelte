<script lang="ts">
  import Command from "$components/Command.svelte";

  export let data;
  $: project = data.project!;
</script>

<svelte:head>
  <title>{project.title} - Dan Peak</title>
  <meta name="description" content={project.response.text} />
  <meta name="robots" content="noindex" />
</svelte:head>

<Command command={project} />
