<template>
  <div class="container">
    <header class="header-wrapper">
      <img class="header-photo" src="http://forum.ls-rp.in.th/styles/elegance/theme/images/logo.png" />
    </header>
    <main class="login-wrapper">
      <el-form status-icon v-loading="loading" ref="form" :rules="rules" :model="form">
        <!--
        <h1 class="heading" v-if="firstTime">Zaloguj się</h1>
        <h1 class="heading" v-else>Witaj ponownie!</h1>
        -->
        <h1 class="heading">Zaloguj się</h1>
        <el-form-item label="Nazwa użytkownika" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Hasło" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.remember">Zapamiętaj mnie</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!form.username || !form.password" @click="submitForm('form')">Wejdź do gry</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "loginParent",
  data() {
    return {
      loading: false,
      firstTime: true,
      form: {
        username: "",
        password: "",
        remember: false
      },
      rules: {
        username: [
          {
            required: true,
            message: "Nazwa użytkownika nie może być pusta",
            trigger: "blur"
          },
          {
            min: 3,
            max: 26,
            message: "Nazwa użytkownika jest za długa lub za krótka",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Hasło nie może być puste",
            trigger: "blur"
          },
          {
            min: 8,
            message: "Hasło jest za krótkie",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    signIn() {
      mp.trigger("loginButtonClicked", this.form.username, this.form.password);
    },
    submitForm(e) {
      this.loading = true;
      this.$refs[e].validate(valid => {
        if (valid) {
          return this.signIn();
        }
        this.loading = false;
        return false;
      });
    }
  },
  mounted() {
    this.form.remember ? this.firstTime = false : this.firstTime = true;
    setTimeout(() => {
      mp.trigger("remindAccount");
    }, 6000);
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700");
$background-color: #f8f9fb;

html,
body {
  * {
    font-family: "Roboto", sans-serif;
  }

  background: rgba(0, 0, 0, 0);
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 22rem;
  flex: 1;
  margin: 0 auto;
  align-items: center;
}
.header-wrapper {
  .header-photo {
    padding: 2rem;
    margin: 3.5rem 2.5rem;
    max-width: 22rem;
  }
}
.login-wrapper {
  background: $background-color;
  width: 100%;
  border-radius: 0.2rem;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.3);
  .el-form {
    margin: 0 1rem;
    .heading {
      margin: 1.5rem 0 1rem;
      font-weight: 400;
      font-size: 1.5rem;
    }
    .el-button {
      width: 100%;
      transition: 0.5s linear;
    }
    el-form-item:last-child {
      margin: 0.5rem 0 0.5rem 0;
    }
  }
}
.el-button--primary:hover:enabled {
  //transform: translateY(-1px) !important; // doesnt work in cef somehow
  box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
}
.el-loading-mask {
  background-color: rgba($color: $background-color, $alpha: 0.7) !important;
}
.el-message {
  background-color: $background-color !important;
}
.el-checkbox {
  font-weight: 400!important;
}
</style>
