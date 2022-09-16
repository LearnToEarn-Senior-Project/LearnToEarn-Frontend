<template>
  <div class="py-8">
    <div class="font-bold text-[24px] text-center mb-2">
      QR Code Statement Approval
    </div>
    <div class="md:mx-96 mx-4 mt-8">
      <qrcode-stream @decode="onDecode" @init="onInit" :track="paintOutline" />
    </div>
  </div>
</template>
<script>
import TokenServices from "@/services/TokenServices";
import { QrcodeStream } from "vue-qrcode-reader";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
export default {
  components: {
    QrcodeStream,
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    onDecode(tokenHistory_id) {
      showAlert(
        "confirm",
        "Do you want to approve this statement?",
        "",
        "Confirm"
      ).then(async (response) => {
        if (response.isConfirmed) {
          await TokenServices.approveStatement(tokenHistory_id).then(
            (response) => {
              if (!response.data._id) {
                showAlert(
                  "error",
                  "Cannot approve this statement",
                  "Found the unexpected problem please try again later",
                  "Confirm",
                  false
                ).then((response) => {
                  if (response.isConfirmed) {
                    this.$router.go();
                  }
                });
              } else {
                showAlert(
                  "success",
                  "Approve this statement successfully",
                  "",
                  "Confirm",
                  false
                ).then((response) => {
                  if (response.isConfirmed) {
                    this.$router.go();
                  }
                });
              }
            }
          );
        }
      });
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
  },
};
</script>
