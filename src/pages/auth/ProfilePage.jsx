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

const recommendations = [
  {
    _id: "1",
    city: "Jakarta",
    country: "Indonesia",
    countryCode: "ID",
    images: ["img_url"],
    itineraries: [
      {
        day1: [
          {
            slug: "monas",
            name: "Monas",
            image:
              "https://upload.wikimedia.org/wikipedia/id/thumb/b/b1/Merdeka_Square_Monas_02.jpg/500px-Merdeka_Square_Monas_02.jpg",
            category: "Architectural Buildings",
            coordinates: [-6.1753924, 106.8271528],
          },
        ],
      },
      {
        day2: [
          {
            slug: "museum-gajah",
            name: "Museum Gajah",
            image:
              "https://upload.wikimedia.org/wikipedia/id/thumb/b/b1/Merdeka_Square_Monas_02.jpg/500px-Merdeka_Square_Monas_02.jpg",
            category: "Architectural Buildings",
            coordinates: [-6.1753924, 106.8271528],
          },
        ],
      },
    ],
    chatId: "ID",
    userId: "ID",
  },
  {
    _id: "2",
    city: "Bandung",
    country: "Indonesia",
    countryCode: "ID",
    images: ["img_url"],
    itineraries: [
      {
        day1: [
          {
            slug: "monas",
            name: "Monas",
            image:
              "https://upload.wikimedia.org/wikipedia/id/thumb/b/b1/Merdeka_Square_Monas_02.jpg/500px-Merdeka_Square_Monas_02.jpg",
            category: "Architectural Buildings",
            coordinates: [-6.1753924, 106.8271528],
          },
        ],
      },
      {
        day2: [
          {
            slug: "museum-gajah",
            name: "Museum Gajah",
            image:
              "https://upload.wikimedia.org/wikipedia/id/thumb/b/b1/Merdeka_Square_Monas_02.jpg/500px-Merdeka_Square_Monas_02.jpg",
            category: "Architectural Buildings",
            coordinates: [-6.1753924, 106.8271528],
          },
        ],
      },
      {
        day3: [
          {
            slug: "monas",
            name: "Monas",
            image:
              "https://upload.wikimedia.org/wikipedia/id/thumb/b/b1/Merdeka_Square_Monas_02.jpg/500px-Merdeka_Square_Monas_02.jpg",
            category: "Architectural Buildings",
            coordinates: [-6.1753924, 106.8271528],
          },
        ],
      },
    ],
    chatId: "ID",
    userId: "ID",
  },
];

const ProfilePage = () => {
  const [snapToken, setSnapToken] = useState(null);
  console.log("🚀 ~ PaymentPage ~ snapToken:", snapToken);
  const [paymentStatus, setPaymentStatus] = useState(null); // ✅ Store payment status
  const [loading, setLoading] = useState(false); // ✅ Show loading while fetching
  const navigate = useNavigate();

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
    <div className="min-h-screen text-slate-700 md:mx-auto lg:w-[1000px] md:w-[750px] px-4 md:px-0">
      {/* Main Content */}
      <main className="p-6">
        {/* My Trips Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">My Trips</h2>
          <div className="space-y-4">
            {recommendations.map((trip) => {
              return (
                <div
                  key={trip._id}
                  className="flex justify-between items-center border-2 border-slate-700 p-4 rounded-lg bg-white"
                >
                  <span className="w-1/3 text-left">
                    {trip.city}, {trip.country}
                  </span>
                  <span className="flex-1 text-left">
                    {trip.itineraries.length} Days
                  </span>
                  <button
                    className="text-teal-500 font-semibold cursor-pointer"
                    onClick={() => handleSeeDetails(trip._id)}
                  >
                    See Details
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Subscription Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Subscription</h2>
          <div className="space-y-4">
            {!latestSubscription ? (
              // Show Subscription Option if No Subscription Exists
              <div className="flex justify-between items-center border-2 border-slate-700 p-4 rounded-lg bg-white">
                <span className="w-1/3 text-left">Enjoy unlimited access</span>
                <span className="flex-1 text-left">
                  IDR {price.toLocaleString("id-ID")}/month
                </span>
                <button
                  className="text-teal-500 font-semibold cursor-pointer"
                  onClick={createTransaction}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Subscribe now"}
                </button>
              </div>
            ) : (
              // Show Active Subscription Details
              <div className="flex justify-between items-center border-2 border-slate-700 p-4 rounded-lg bg-white">
                <span className="w-1/3 text-left">Pro version</span>
                <span className="flex-1 text-left">
                  {latestSubscription.status}
                </span>
                <span>until {latestSubscription.endDate}</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
