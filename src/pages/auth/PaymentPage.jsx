import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../utils/swallAlert";

export default function PaymentPage() {
  const [snapToken, setSnapToken] = useState(null);
  console.log("🚀 ~ PaymentPage ~ snapToken:", snapToken);
  const [paymentStatus, setPaymentStatus] = useState(null); // ✅ Store payment status
  const [loading, setLoading] = useState(false); // ✅ Show loading while fetching

  // const navigate = useNavigate();

  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;

    document.body.appendChild(script);
  }, []);

  // 🔹 Trigger Midtrans Payment when snapToken is ready
  useEffect(() => {
    if (snapToken) {
      console.log("✅ snapToken received:", snapToken);

      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          toastSuccess("🎉 Payment Success!");
          setPaymentStatus("success");
          console.log("✅ Payment Success:", result);
        },
        onPending: function (result) {
          toastSuccess("🎉 Payment Pending!");
          setPaymentStatus("pending");
          console.log("⏳ Payment Pending:", result);
        },
        onError: function (result) {
          toastError("🛑 Payment Failed!");
          setPaymentStatus("failed");
          console.log("❌ Payment Error:", result);
        },
        onClose: function () {
          toastSuccess("🛑 Payment Closed!");
        },
      });
    }
  }, [snapToken]); // ✅ Runs only when `snapToken` updates

  // Function to call the backend and get Snap Token
  const createTransaction = async () => {
    let price = import.meta.env.VITE_SUBSCRIPTION_PRICE || 189000;

    setLoading(true); // ✅ Show loading when payment is being processed
    setPaymentStatus(null); // ✅ Reset previous payment status

    try {
      const response = await fetch(import.meta.env.VITE_BASE_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          query: `
            mutation addSubscription($payload: SubscriptionInput!) {
              addSubscription(payload: $payload)
            }
          `,
          variables: {
            payload: {
              midtransId: "SUB-USER-123", // Server will override this
              price: price,
            },
          },
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.errors) {
        console.error("GraphQL Error:", result.errors);
        toastError("❌ Payment Initialization Failed");
        return;
      }

      // ✅ Ensure snapToken is not empty before updating state
      const token = result?.data.addSubscription;
      if (!token) {
        toastError("❌ Failed to retrieve Snap Token.");
        console.error("🚀 Error: Snap Token is missing from API response.");
        return;
      }

      setSnapToken(token);

      // 🔹 Open Midtrans Payment UI
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          toastSuccess("🎉 Payment Success!");
          setPaymentStatus("success"); // ✅ Update UI for success
          // navigate("/"); // habis itu actionnya mau kemana... / setting di midtrans dashboard

          console.log("Payment Success:", result);
        },
        onPending: function (result) {
          setPaymentStatus("pending"); // ✅ Update UI for pending payment
          toastSuccess("🎉 Payment Pending!");
          console.log("Payment Pending:", result);
        },
        onError: function (result) {
          toastError("🛑 Payment Failed!");
          setPaymentStatus("failed"); // ✅ Update UI for failed payment
          console.log("Payment Error:", result);
        },
        onClose: function () {
          toastSuccess("🛑 Payment Closed!");
        },
      });
    } catch (error) {
      setLoading(false);
      toastError("🛑 Payment Failed!");
      console.error("🚀 Payment Error:", error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Subscribe to Premium</h2>

      {/* ✅ Show loading indicator */}
      {loading && <p>Processing payment...</p>}

      {/* ✅ Show different UI based on payment status */}
      {paymentStatus === "success" && (
        <p className="success">✅ Payment Successful!</p>
      )}
      {paymentStatus === "pending" && (
        <p className="pending">⏳ Waiting for Payment...</p>
      )}
      {paymentStatus === "failed" && (
        <p className="error">❌ Payment Failed!</p>
      )}

      <button onClick={createTransaction} disabled={loading}>
        Pay Now
      </button>
    </div>
  );
}
