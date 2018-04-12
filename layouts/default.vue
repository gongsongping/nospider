<template>
  <div>
    <b-navbar sticky toggleable="md" type="dark" variant="info" style='padding:0 15px;'>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <nuxt-link  to="/" > 
              <div style='color:white;padding:8px;'>首页</div>
            </nuxt-link>
            <nuxt-link  to="/myapps" >
            <div style='color:white;padding:8px;'> 个人玩票项目  </div> 
            </nuxt-link>
            <nuxt-link to="/mine"  >
              <div style='color:white;padding:8px;'>  <i style='color:white;' class='fa fa-plus'></i>  </div>        
            </nuxt-link>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <div class="container-fluid" style='padding-top:15px;'>
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

a {
  color: rgb(32, 30, 30);
}

a:hover {
    background-color: tomato;
    text-decoration: none;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.link-active {
  background-color: grey;
}
.link-exact-active {
  background-color: tomato;
}
</style>
