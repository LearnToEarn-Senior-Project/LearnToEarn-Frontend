<template>
  <div class="py-8" v-if="histories">
    <div class="font-bold text-[48px] text-center mb-4">Bill Approval</div>
    <Form @submit="searchById">
      <div class="flex items-center mx-8 mb-4">
        <BaseInput
          name="search"
          placeholder="Search by input Student ID"
          type="text"
          class="mr-2"
        />
        <SubmitButton text="Search" class="h-full" />
      </div>
    </Form>
    <div class="overflow-x-auto">
      <table>
        <thead class="text-[24px]">
          <tr>
            <th class="py-4 w-1/6">No</th>
            <th class="w-1/6">Transaction ID</th>
            <th class="w-1/6">Student ID</th>
            <th class="w-1/6">Date</th>
            <th class="w-1/6">Bill</th>
          </tr>
        </thead>
        <tbody class="text-center" v-if="histories.length > 0">
          <tr v-for="(history, index) in histories" :key="index" class="">
            <td class="text-[28px] font-bold py-2">
              {{ index + 1 }}
            </td>
            <td class="truncate">{{ history._id }}</td>
            <td>{{ history.student_id }}</td>
            <td>{{ history.date }}</td>
            <td>
              <SubmitButton
                text="Approve"
                class="bg-success-700 hover:bg-success-800 active:bg-success-900"
                :click="
                  () => {
                    approveBill(history._id);
                  }
                "
              />
            </td>
          </tr>
        </tbody>
        <tbody class="text-center" v-else>
          <td colspan="6" class="text-error-600 font-bold text-[24px]">
            Data Not found
          </td>
        </tbody>
      </table>
    </div>
    <Pagination
      :page="page"
      :totalPage="totalPage"
      routes="billApproval"
      v-if="totalHistory > 0"
    />
  </div>
</template>
<script>
import BaseInput from "@/components/input/BaseInput.vue";
import Pagination from "@/components/pagination/BasePagination.vue";
import TokenServices from "@/services/TokenServices";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import { Form } from "vee-validate";
export default {
  components: {
    BaseInput,
    Pagination,
    SubmitButton,
    Form,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      histories: null,
      totalHistory: 0,
      totalPage: 1,
    };
  },
  methods: {
    async approveBill(transaction_id) {
      showAlert(
        "confirm",
        "Do you want to approve this bill?",
        "",
        "Confirm"
      ).then(async (response) => {
        if (response.isConfirmed) {
          await TokenServices.approveBill(transaction_id)
            .then(() => {
              showAlert(
                "success",
                "Approve this bill successfully",
                "",
                "Confirm",
                false
              ).then((response) => {
                if (response.isConfirmed) {
                  this.$router.go();
                }
              });
            })
            .catch(() => {
              showAlert(
                "error",
                "Cannot approve this bill",
                "Found the unexpected problem please try again later",
                "Confirm",
                false
              );
            });
        }
      });
    },
    async searchById(user_id) {
      if (user_id.search != "") {
        await TokenServices.getAllTokenHistorySearch(
          user_id.search,
          1,
          false
        ).then(() => {
          this.totalHistory = 0;
          this.histories =
            this.$store.getters.getTokenHistories.token_history_list;
        });
      } else {
        await TokenServices.getAllTokenHistoryForAdmin(this.page).then(() => {
          this.totalHistory =
            this.$store.getters.getTokenHistories.total_histories;
          if (this.totalHistory > 0) {
            this.totalPage = Math.ceil(this.totalHistory / 10);
          }
          this.histories =
            this.$store.getters.getTokenHistories.token_history_list;
        });
      }
    },
  },
  async created() {
    await TokenServices.getAllTokenHistoryForAdmin(this.page).then(() => {
      this.totalHistory = this.$store.getters.getTokenHistories.total_histories;
      if (this.totalHistory > 0) {
        this.totalPage = Math.ceil(this.totalHistory / 10);
      }
      this.histories = this.$store.getters.getTokenHistories.token_history_list;
    });
  },
  beforeRouteUpdate(routeTo) {
    TokenServices.getAllTokenHistoryForAdmin(
      parseInt(routeTo.query.page) || 1,
      false
    ).then(() => {
      this.histories = this.$store.getters.getTokenHistories.token_history_list;
    });
  },
};
</script>
