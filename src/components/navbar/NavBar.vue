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
    var firstname = "";
    var lastname = "";
    Promise.resolve(this.$store.getters.getCurrentUser).then((response) => {
      firstname = response.data.firstname;
      lastname = response.data.lastname;
    });
    this.token = await this.$store.getters.getCurrentToken;
    this.user = {
      firstname: firstname,
      lastname: lastname,
      role: await this.$store.getters.getRole,
    };
  },
};
</script>
