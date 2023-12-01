<script>
  import "../assets/styles/index.css";
</script>

<svelte:head>
  <title>AstroChat - Anonymous chat</title>
</svelte:head>

<div class="container">
  <div class="inner">
    <h1 class="logo">AstroChat</h1>
    <h3 class="sub-logo">The best free anonymous chat</h3>

    <a href="/chat"><button id="btn">CHAT</button></a>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Nova+Flat&family=Nova+Oval&display=swap");

  .container {
    background: #000;
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .container::after {
    content: "";
    background-image: url("../assets/images/background.jpg");
    background-size: cover;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 0;
  }

  .inner {
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    z-index: 2;
    background: none;
  }

  #btn {
    margin-top: 50px;
    outline: none;
    border: none;
    background-color: #6f6685;
    color: #fff;
    width: 10rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 5px 2px #6f6685;
    transition:
      all 0.3s ease,
      transform 0.3s ease;
  }

  a {
    outline: none;
    text-decoration: none;
    color: #fff;
    background: none;
  }

  #btn:hover {
    border-radius: 2rem;
    width: 9.5rem;
    box-shadow: 0px 0px 20px 4px #807795;
  }

  #btn:active {
    width: 10rem;
    height: 2.5rem;
    box-shadow: 0px 0px 5px 2px #6f6685;
    background: none;
    color: #6f6685;
  }

  .logo {
    font-size: 3rem;
    position: relative;
    font-family: "Nova Flat", sans-serif;
  }

  .sub-logo {
    margin-top: 10px;
    font-family: "Nova Oval", sans-serif;
    font-size: 1rem;
    color: #cacaca;
  }
</style>
