<template>
  <nav class="bg-primary-900 p-2" v-if="user">
    <NavBarDesktop
      :logout="() => logout()"
      :swap="() => swapRole()"
      :user="user"
      :token="token"
    />
    <NavBarMobile
      :logout="() => logout()"
      :swap="() => swapRole()"
      :user="user"
      :token="token"
    />
  </nav>
</template>
<script>
import NavBarDesktop from "@/components/navbar/children/NavBarDesktop";
import NavBarMobile from "@/components/navbar/children/NavBarMobile";
import AuthServices from "@/services/authentication/AuthServices.js";
export default {
  components: {
    NavBarDesktop,
    NavBarMobile,
  },
  methods: {
    logout() {
      AuthServices.logout();
      /*  this.$msal.signOut(); */
    },
    swapRole() {
      AuthServices.swapRole().then((response) => {
        if (response[0] == "admin") {
          this.$router.push({ name: "adminConsole" }).then(() => {
            this.$router.go();
          });
        } else {
          this.$router.push({ name: "classroomList" }).then(() => {
            this.$router.go();
          });
        }
      });
    },
  },
  data() {
    return {
      user: null,
      token: 0,
    };
  },
  async created() {
    this.token = await this.$store.getters.getCurrentToken;
    this.user = {
      firstname: this.$store.getters.getCurrentUser.firstname,
      lastname: this.$store.getters.getCurrentUser.lastname,
      role: await this.$store.getters.getRole,
    };
  },
};
</script>
