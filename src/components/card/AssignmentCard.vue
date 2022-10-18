<template>
  <div
    class="p-[20px] border-[2px] rounded-[10px] border-neutral-400 items-center"
  >
    <div class="justify-between flex text-[28px]">
      <span class="truncate font-bold">{{ assignment.name }}</span>
      <span class="text-success-600">{{ getState() }}</span>
    </div>
    <div class="justify-between flex text-[16px]">
      <span class="truncate">Due {{ getDate() }}</span>
      <div class="flex items-center gap-[15px]">
        <span>Score {{ getScore() }}/{{ assignment.max_point }}</span>
        <!--  <span>Token: <span class="text-secondary-600">-</span></span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    assignment: {
      type: Object,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      monthData: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  methods: {
    getDate() {
      try {
        return (
          this.monthData[this.assignment.due_date.month - 1] +
          ", " +
          this.assignment.due_date.year +
          " Time: " +
          this.assignment.due_time.hours +
          ":" +
          this.assignment.due_time.minutes
        );
      } catch (error) {
        return "date is not defined";
      }
    },
    getState() {
      try {
        if (this.assignment.student_submission[0].state == "TURNED_IN") {
          return "Turned In";
        } else if (this.assignment.student_submission[0].state == "RETURNED") {
          return "Returned";
        } else if (this.assignment.student_submission[0].state == "CREATED") {
          return "Created";
        }
      } catch (error) {
        return "-";
      }
    },
    getScore() {
      try {
        return this.assignment.student_submission[0].score;
      } catch (error) {
        return "-";
      }
    },
  },
};
</script>
