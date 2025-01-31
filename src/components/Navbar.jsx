export default function Navbar() {
  const isLogin = false;
  return (
    <div className=" md:h-[67px] border-b-1 border-gray-300">
      <div className="mx-auto container flex items-center h-full">
        <div className="me-auto">LOGO</div>
        <div>
          {isLogin ? (
            <div className="flex items-center gap-2">
              <img
                src="/img/profile.png"
                alt="profile-image"
                className="w-9 h-9 rounded-full"
              />
              <p className="text-xs lg:text-sm">Profile Name</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <button className="rounded-md border border-green-600 py-1 px-3 font-semibold hover:bg-green-50 text-green-600">
                Login
              </button>
              <button className="rounded-md border border-blue-600 py-1 px-3 font-semibold hover:bg-blue-50 text-blue-600">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
