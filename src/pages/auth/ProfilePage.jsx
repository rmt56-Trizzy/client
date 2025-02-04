import { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { toastError, toastSuccess } from "../../utils/swallAlert";
import { useNavigate } from "react-router";

const access_token = localStorage.getItem("access_token");
const price = 10000;

const CHECK_SUBSCRIPTION = gql`
  query IsSubscribed {
    isSubscribed
  }
`;

const GET_SUBSCRIPTION = gql`
  query GetSubscription {
    getSubscription {
      _id
      userId
      midtransId
      price
      startDate
      endDate
      transactionTime
      status
    }
  }
`;

const ADD_SUBSCRIPTION = gql`
  mutation addSubscription($payload: SubscriptionInput!) {
    addSubscription(payload: $payload)
  }
`;

const GET_MY_TRIPS = gql`
  query GetMyTrips {
    getMyTrips {
      _id
      city
      country
      countryCode
      cityImage
      daysCount
      chatId
      userId
      viewAccess
    }
  }
`;

const ProfilePage = () => {
  const [snapToken, setSnapToken] = useState(null);
  console.log("🚀 ~ PaymentPage ~ snapToken:", snapToken);
  const [paymentStatus, setPaymentStatus] = useState(null); // ✅ Store payment status
  const [loading, setLoading] = useState(false); // ✅ Show loading while fetching
  const [myTrips, setMyTrips] = useState([]);
  const navigate = useNavigate();

  const {
    data: Trips,
    loading: loadingTrips,
    error: errorTrips,
  } = useQuery(GET_MY_TRIPS);

  useEffect(() => {
    if (Trips?.getMyTrips) {
      setMyTrips(Trips.getMyTrips);
    }
  }, [Trips]);

  const {
    error: subCheckError,
    data: subCheckData,
    loading: subCheckLoading,
  } = useQuery(CHECK_SUBSCRIPTION, {
    context: {
      headers: {
        Authorization: access_token ? `Bearer ${access_token}` : "",
      },
    },
    skip: !access_token, // ✅ Skip query if no token is found
    onCompleted: (data) => {
      console.log("🚀 ~ CHECK_SUBSCRIPTION ~ data:", data);
    },
    onError: (error) => {
      console.log("🚀 ~ CHECK_SUBSCRIPTION ~ error:", error);
    },
  });

  // ✅ Run `GET_SUBSCRIPTION` Only If `isSubscribed` is `true`
  const shouldFetchSubscription = subCheckData?.isSubscribed;

  const {
    error: subError,
    data: subData,
    loading: subLoading,
  } = useQuery(GET_SUBSCRIPTION, {
    context: {
      headers: {
        Authorization: access_token ? `Bearer ${access_token}` : "",
      },
    },
    skip: !access_token || !shouldFetchSubscription, // ✅ Skip if not subscribed
    onCompleted: (data) => console.log("🚀 ~ GET_SUBSCRIPTION ~ data:", data),
    onError: (error) => console.log("🚀 ~ GET_SUBSCRIPTION ~ error:", error),
  });

  const [addSubscription] = useMutation(ADD_SUBSCRIPTION, {
    context: {
      headers: {
        Authorization: access_token ? `Bearer ${access_token}` : "",
      },
    },
    onCompleted: async (data) => {
      console.log("🚀 ~ addSubscription ~ data:", data);
      setLoading(false);
    },
    onError: (error) => {
      console.error("🚀 ~ addSubscription ~ error:", error);
      toastError(error.message || "Subscription failed. Please try again.");
    },
  });

  const handleSeeDetails = (id) => {
    navigate(`/recommendation/${id}`);
  };

  // Function to get the latest subscription per user
  const getLatestSubscription = (subscriptions) => {
    if (!subscriptions) return null;

    return Object.values(
      subscriptions.reduce((acc, sub) => {
        if (
          !acc[sub.userId] ||
          new Date(sub.endDate) > new Date(acc[sub.userId].endDate)
        ) {
          acc[sub.userId] = sub;
        }
        return acc;
      }, {})
    )[0]; // ✅ Returns the most recent subscription
  };

  // 🔹 Run function
  const latestSubscription = getLatestSubscription(
    subData?.getSubscription ? [subData.getSubscription] : []
  );

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
    if (snapToken && window.snap) {
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
          toastError("🛑 Payment Window Closed!");
        },
      });
    }
  }, [snapToken]); // ✅ Runs only when `snapToken` updates

  // Function to call the backend and get Snap Token
  const createTransaction = async () => {
    setLoading(true); // ✅ Show loading when payment is being processed
    setPaymentStatus(null); // ✅ Reset previous payment status

    try {
      const { data } = await addSubscription({
        variables: {
          payload: {
            midtransId: "SUB-USER-123",
            price,
          },
        },
      });

      setLoading(false);
      if (!data || !data.addSubscription) {
        toastError("❌ Payment Initialization Failed");
        console.error("🚀 Error: Missing Snap Token from API response.");
        return;
      }

      setSnapToken(data.addSubscription);
    } catch (error) {
      setLoading(false);
      toastError("🛑 Payment Failed!");
      console.error("🚀 Payment Error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 text-slate-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite_0.7s]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 space-y-6 md:space-y-10">
        {/* My Trips Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500 animate-[fadeIn_0.6s_ease-out]">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-indigo-50 p-2 md:p-3 rounded-xl group cursor-pointer hover:bg-indigo-100 transition-all duration-300">
              <span className="text-2xl md:text-3xl inline-block group-hover:rotate-12 transition-transform duration-300">
                ✈
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-600 text-transparent bg-clip-text hover:scale-[1.02] transition-transform duration-300">
              My Trips
            </h2>
          </div>
          <div className="space-y-4 max-h-[450px] overflow-y-auto scrollbar scrollbar-thumb-indigo-200 scrollbar-track-transparent hover:scrollbar-thumb-indigo-300 pr-2">
            {myTrips.map((trip, index) => (
              <div
                key={trip._id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-[slideUp_0.1s_ease-out_forwards] opacity-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 rounded-xl border border-gray-100 bg-white/95 backdrop-blur-sm hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group space-y-4 md:space-y-0">
                  <div className="flex items-center gap-3 md:gap-5 w-full md:w-1/3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-teal-50 to-indigo-50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl md:text-2xl group-hover:rotate-12 transition-transform duration-300">
                        🗺
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-base md:text-lg bg-gradient-to-r from-slate-700 to-slate-900 text-transparent bg-clip-text block hover:scale-[1.02] transition-transform duration-300">
                        {trip.city}
                      </span>
                      <p className="text-sm text-slate-500">{trip.country}</p>
                    </div>
                  </div>

                  <div className="flex-1 text-left md:text-center scale-100 group-hover:scale-110 transition-transform duration-300">
                    <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs md:text-sm font-medium group-hover:bg-indigo-100 transition-colors duration-300">
                      {trip.daysCount} Days
                    </span>
                  </div>

                  <button
                    onClick={() => handleSeeDetails(trip._id)}
                    className="w-full md:w-auto px-4 md:px-6 py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium 
                             hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg
                             active:scale-95 hover:-translate-y-0.5">
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>{" "}
        </section>

        {/* Subscription Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500 animate-[fadeIn_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-teal-50 p-2 md:p-3 rounded-xl group cursor-pointer hover:bg-teal-100 transition-all duration-300">
              <span className="text-2xl md:text-3xl inline-block group-hover:rotate-12 transition-transform duration-300">
                💎
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 text-transparent bg-clip-text hover:scale-[1.02] transition-transform duration-300">
              Subscription
            </h2>
          </div>

          <div className="space-y-4">
            {!latestSubscription ? (
              <div className="relative overflow-hidden p-4 md:p-8 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-white to-teal-50/50 hover:border-indigo-200 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-full blur-3xl opacity-30 -z-10 group-hover:scale-110 transition-transform duration-700" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="space-y-2">
                    <span className="font-semibold text-lg md:text-xl text-slate-800 hover:scale-[1.02] transition-transform duration-300 inline-block">
                      Enjoy unlimited access
                    </span>
                    <p className="text-sm md:text-base text-slate-600">
                      Unlock all premium features
                    </p>
                  </div>

                  <div className="text-left md:text-center scale-100 group-hover:scale-110 transition-transform duration-300">
                    <span className="block text-xl md:text-2xl font-bold text-slate-800">
                      IDR {price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm md:text-base text-slate-500">
                      per month
                    </span>
                  </div>

                  <button
                    onClick={createTransaction}
                    disabled={loading}
                    className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium
                             hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 
                             disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg
                             active:scale-95 disabled:scale-100 hover:-translate-y-0.5">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 md:h-5 md:w-5"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Subscribe now"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden p-4 md:p-8 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-teal-100/30 hover:border-teal-300 transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-30 -z-10 group-hover:scale-110 transition-transform duration-700" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="space-y-1">
                    <span className="font-semibold text-lg md:text-xl text-teal-800 hover:scale-[1.02] transition-transform duration-300 inline-block">
                      Pro version
                    </span>
                    <p className="text-sm md:text-base text-teal-600">
                      Active subscription
                    </p>
                  </div>

                  <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-teal-100 text-teal-700 font-medium text-sm group-hover:bg-teal-200 transition-colors duration-300">
                    {latestSubscription.status}
                  </span>

                  <div className="text-left md:text-right scale-100 group-hover:scale-105 transition-transform duration-300">
                    <span className="block text-sm md:text-base text-teal-800 font-medium">
                      Valid until
                    </span>
                    <span className="text-sm md:text-base text-teal-600">
                      {latestSubscription.endDate}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
