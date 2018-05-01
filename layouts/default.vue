<template>
  <div>
    <nav>
      <nuxt-link to="/" class='head-btn'> 
          首页
      </nuxt-link>
    </nav>
    <div>
      <nuxt />
    </div>

  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}
nav {
  width:100vw;
  background-color:#54d0e4;
  height:32px;
}
.head-btn {
  box-sizing: border-box;
  padding-top:8px;
  padding-left: 8px;
  padding-right: 8px;
  display:inline-block;
  height:100%;
  text-align: center;

}

a {
  color: rgb(32, 30, 30);
  text-decoration: none;
}

a:hover {
    color: #b1cace;  
    background-color: tomato;
    text-decoration: underline;
}


.link-active {
  background-color: grey;
}
.link-exact-active {
  background-color: tomato;
}
</style>
