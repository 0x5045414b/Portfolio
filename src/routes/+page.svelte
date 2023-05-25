<script lang="ts">
  import Command from "$components/Command.svelte";

  const commands = {
    note: {
      request: "cat note.txt",
      response: {
        text: "Note: This site is still a work in progress. Please check back soon for more updates!",
        links: [],
      },
    },
    base: {
      request: "cat welcome.txt",
      response: {
        text: "Hello! I'm Dan Peak, a passionate full-stack developer with a love for creating exceptional digital experiences.\n\nI thrive on turning complex ideas into elegant solutions and am always eager to learn and grow as a developer.\n\nWith experience in front-end and back-end technologies, I enjoy exploring innovative projects that push the boundaries of user interactivity.",
        links: [],
      },
    },
  };
</script>

<svelte:head>
  <script type="application/ld+json">
    {
      "@context" : "https://schema.org",
      "@type" : "WebSite",
      "name" : "Dan Peak",
      "alternateName": ["DanPeak", "danpeak.co.uk"],
      "url" : "https://www.danpeak.co.uk/"
    }
  </script>
  <title>Dan Peak</title>
  <meta name="description" content="Full-Stack Developer Portfolio" />
</svelte:head>

<Command command={commands.note} />
<Command command={commands.base} />
