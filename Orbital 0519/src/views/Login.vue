<template>
  <main class="login">
   <div style= "padding-top: 40px;"> <h1 style=" font-size: 7vw;">TRANSPORFFICIENT</h1>
   </div>
    <section class="forms">
      <form class="login-form" @submit.prevent="login">
        <h2><strong>Login</strong></h2>
        <div class="input-container">
          <div class="input-child-email">
            <input
              class="form-input"
              type="email"
              placeholder="Email address"
              v-model="login_form.email"
            />
          </div>
          <div class="input-child-password">
            <input
              class="form-input"
              type="password"
              placeholder="Password"
              v-model="login_form.password"
            />
          </div>
          <div class="input-child-button">
            <input
              type="submit"
              value="Login"
              class="form-input"
              style="background-color: rgba(0, 0, 0)"
            />
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };

    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>

<style>
main,
section {
  text-align: center;
}

.login{
  background-image: url("/src/assets/LoginBackground.jpg");
  height: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: bottom;
}

.forms {
  display: flex;
  text-align: center;
  min-height: 100vh;
}

.login-form,
.login {
  display: block;
  text-align: center;
  align-items: center;
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
  text-align: center;
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.form-input {
  display: block;
}

main section form div.input-container,
main section form div.input-container div.input-child-email,
main section form div.input-container div.input-child-password,
main section form div.input-container div.input-child-button {
  text-align: center;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}
form.login-form input:not([type="submit"]) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login-form input[type="submit"] {
  background-color: rgb(245, 66, 101);
  color: #FFF;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
