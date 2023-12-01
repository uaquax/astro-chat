<script>
  import "../../assets/styles/index.css";
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  const STATE = {
    USERNAME: "username",
    CHAT: "chat",
  };

  /**
   * @type {any[]}
   */
  $: messages = [];
  $: text = "";
  $: state = STATE.USERNAME;
  $: username = "";

  const socket = io("ws://localhost:3000");
  socket.connect();

  function sendMessage() {
    console.log(username);
    if (text.length < 1) return;
    socket.emit("chatMsg", text);
    text = "";
    messages = messages;
  }

  function loadChat() {
    const savedMessages = window.localStorage.getItem("messages");

    if (savedMessages) {
      messages = JSON.parse(savedMessages);
    }

    let us = window.localStorage.getItem("username");
    if (us) {
      username = us;
      state = STATE.CHAT;

      socket.on("connection", () => {
        console.log("Connected to WS");
      });
      socket.emit("join", { username: username });

      socket.on("message", (data) => {
        messages.push(data);
        if (browser) {
          window.localStorage.setItem("messages", JSON.stringify(messages));
        }
        messages = messages;
      });
    }
  }

  onMount(() => {
    loadChat();
  });
</script>

{#if state == STATE.CHAT}
  <div class="container">
    <div class="chat-window">
      <div class="messages">
        {#each messages as message}
          <div class="message-wrapper">
            <img
              class="avatar"
              src={message.avatar || "default.png"}
              alt="Avatar"
            />
            <div class="message">
              <span class="username">{message.username}</span>
              <p class="text">{message.text}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="input">
        <textarea bind:value={text} placeholder="Type a message..."></textarea>
        <button on:click={sendMessage}>Send</button>
      </div>
    </div>
  </div>
{/if}

{#if state == STATE.USERNAME}
  <div class="container">
    <div class="inner">
      <input
        bind:value={username}
        id="username-input"
        type="text"
        placeholder="Enter your username..."
      />
      <button
        id="#continue"
        on:click={() => {
          if (browser) {
            window.localStorage.setItem("username", username);
            state = STATE.CHAT;
            loadChat();
          }
        }}>Continue</button
      >
    </div>
  </div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

  .container {
    font-family: "Montserrat", "sans-serif";
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f0f0f0;
  }

  .chat-window {
    width: 90%;
    max-width: 500px;
    height: 80%;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background: #e7e7e7;
  }

  .avatar {
    -webkit-user-drag: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .message-wrapper {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .message {
    display: inline-flex;
    flex-direction: column;
    background: #6f6685;
    color: #fff;
    padding: 5px 10px;
    border-radius: 0px 10px 10px 10px;
    word-wrap: break-word;
    max-width: 80%;
  }

  .username {
    font-weight: bold;
  }

  .text {
    margin-top: 5px;
  }

  .input {
    display: flex;
    padding: 10px;
    background: #e7e7e7;
  }

  textarea {
    flex-grow: 1;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    resize: none;
    overflow: auto;
    min-height: 50px;
  }

  button {
    background-color: #6f6685;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #807795;
  }

  /* USERNAME */
  .inner {
    width: 90%;
    max-width: 500px;
    height: 80%;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  #username-input {
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    resize: none;
    overflow: auto;
    min-height: 50px;
  }
</style>
