<script lang="ts">
  interface Command {
    request: string;
    response: {
      text: string;
      technologies?: string[];
      equal_columns?: boolean;
      links: {
        text: string;
        active?: boolean;
        handler: string;
      }[];
    };
  }

  export let command: Command;
</script>

<div style="padding-bottom: 16px">
  {#if command.request}
    <p class="command">{command.request}</p>
  {/if}
  {#if command.response.text}
    <p class="text">{command.response.text}</p>
  {/if}
  {#if command.response.technologies}
    <div class="technologies">
      <p>[{command.response.technologies.join(", ")}]</p>
    </div>
  {/if}
  {#if command.response.links}
    <div class="links" class:equal-columns={command.response.equal_columns}>
      {#each command.response.links as link}
        <p>
          <a
            href={link.handler}
            class:active={link.active}
            target={link.handler.startsWith("http") ? "_blank" : undefined}>{link.text}</a
          >
        </p>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  p {
    cursor: default;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .command {
    &::before {
      content: "> ";
    }
  }

  .links {
    display: flex;
    flex-wrap: wrap;

    &.equal-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(15ch, 1fr));
      gap: 0 2rem;
    }

    a {
      color: white;
      background: none;
      border: none;
      display: inline;
      cursor: pointer;
      font-size: inherit;
      font-family: inherit;
      padding: 0;
      text-decoration: underline;

      &.active,
      &:hover {
        color: #669199;
      }
    }
  }

  .technologies {
    padding: 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0 2rem;
    font-size: 1.2rem;
    font-family: monospace;
    color: #669199;
  }

  @media (max-width: 650px) {
    .technologies {
      font-size: 0.8rem;
    }
  }
</style>
