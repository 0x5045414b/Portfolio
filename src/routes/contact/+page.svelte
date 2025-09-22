<script lang="ts">
  import { onMount } from "svelte";

  let nameInput = $state<HTMLInputElement>();
  let emailInput = $state<HTMLInputElement>();
  let messageInput = $state<HTMLInputElement>();

  let formState = $state(0);
  let name = $state("");
  let email = $state("");
  let message = $state("");

  const nextInput = (e: KeyboardEvent, i: number) => {
    if (e.key === "Enter") formState = i;
  };

  onMount(() => nameInput?.focus());

  $effect(() => {
    switch (formState) {
      case 0:
        nameInput?.focus();
        break;
      case 1:
        emailInput?.focus();
        break;
      case 2:
        messageInput?.focus();
        break;
      case 3:
        const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
        if (!emailRegex.test(email)) {
          formState = 1;
          alert("Email Invalid.");
          emailInput?.focus();
          break;
        }

        document.querySelectorAll("input").forEach(input => (input.disabled = true));
        fetch("/contact/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        })
          .then(r => r.json())
          .then(console.log);
        break;
    }
  });
</script>

<svelte:head>
  <title>Contact - Dan Peak</title>
  <meta name="description" content="Full-Stack Developer Portfolio" />
</svelte:head>

<p>&gt; ./contact</p>
<p>Please fill in this form, and I will try my best to get back to you.</p>

{#if formState >= 0}
  <div class="group">
    <label for="name">Name:</label>
    <input
      bind:this={nameInput}
      id="name"
      autocomplete="off"
      type="text"
      onfocus={() => (formState = 0)}
      bind:value={name}
      onkeypress={e => nextInput(e, 1)}
    />
  </div>
{/if}
{#if formState >= 1}
  <div class="group">
    <label for="email">Email:</label>
    <input
      bind:this={emailInput}
      id="email"
      autocomplete="off"
      type="email"
      onfocus={() => (formState = 1)}
      bind:value={email}
      onkeypress={e => nextInput(e, 2)}
    />
  </div>
{/if}
{#if formState >= 2}
  <div class="group">
    <label for="message">Message:</label>
    <input
      bind:this={messageInput}
      id="message"
      autocomplete="off"
      type="text"
      onfocus={() => (formState = 2)}
      bind:value={message}
      onkeypress={e => nextInput(e, 3)}
    />
  </div>
{/if}
{#if formState >= 3}
  <p>Message sent.</p>
  <p>&gt; <span id="cursor">_</span></p>
{/if}

<style lang="scss">
  .group {
    display: flex;

    input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      color: white;
      font-size: inherit;
      font-family: inherit;
      padding: 0;
      margin: 0;
      margin-left: 1rem;

      @media (max-width: 650px) {
        margin-left: 0.5rem;
      }
    }
  }

  #cursor {
    animation: blink 0.8s step-end infinite;
  }

  @keyframes blink {
    from,
    to {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
</style>
