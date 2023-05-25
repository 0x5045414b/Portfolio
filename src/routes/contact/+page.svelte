<script lang="ts">
  import { onMount, afterUpdate } from "svelte";

  let nameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let messageInput: HTMLInputElement;

  let state = 0;
  let name = "";
  let email = "";
  let message = "";

  const nextInput = (e: KeyboardEvent, i: number) => {
    if (e.key === "Enter") state = i;
  };

  onMount(() => nameInput?.focus());

  afterUpdate(() => {
    switch (state) {
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
          state = 1;
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

{#if state >= 0}
  <div class="group">
    <label for="name">Name:</label>
    <input
      bind:this={nameInput}
      id="name"
      autocomplete="off"
      type="text"
      on:focus={() => (state = 0)}
      bind:value={name}
      on:keypress={e => nextInput(e, 1)}
    />
  </div>
{/if}
{#if state >= 1}
  <div class="group">
    <label for="email">Email:</label>
    <input
      bind:this={emailInput}
      id="email"
      autocomplete="off"
      type="email"
      on:focus={() => (state = 1)}
      bind:value={email}
      on:keypress={e => nextInput(e, 2)}
    />
  </div>
{/if}
{#if state >= 2}
  <div class="group">
    <label for="message">Message:</label>
    <input
      bind:this={messageInput}
      id="message"
      autocomplete="off"
      type="text"
      on:focus={() => (state = 2)}
      bind:value={message}
      on:keypress={e => nextInput(e, 3)}
    />
  </div>
{/if}
{#if state >= 3}
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
