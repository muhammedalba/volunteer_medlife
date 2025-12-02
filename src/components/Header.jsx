import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/AfiaLogo.png";
import { Icon } from "@iconify/react";
import { motion as _motion } from "framer-motion";

const Header = () => {
  const { volunteer, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <_motion.nav
        className="sticky  w-full top-0 z-50  "
        variants={navVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {/* nav bar */}
        <div className="bg-minColor text-textColor border  mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" ">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {volunteer?.role ? (
                  <>
                    <span className="text-textColor hidden sm:block">
                      مرحباً،
                      <span>{volunteer?.full_name }</span>
                    </span>
                    <_motion.button
                      type="button"
                      onClick={handleLogout}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2  py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                      <Icon
                        color="fc4c55"
                        icon="solar:logout-broken"
                        width={24}
                        height={24}
                      />
                    </_motion.button>

                    <_motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to="/volunteer/info" className="flex items-center">
                        <Icon
                          color="fc4c55"
                          icon="solar:user-id-broken"
                          width="24"
                          height="24"
                        />
                      </Link>
                    </_motion.div>
                  </>
                ) : (
                  <_motion.div
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-md"
                  >
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                      <Icon
                        color="fc4c55"
                        icon="si:user-fill"
                        width="24"
                        height="24"
                      />
                      <span className="hidden sm:inline text-textColor">
                        تسجيل الدخول
                      </span>
                    </Link>
                  </_motion.div>
                )}
                <_motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to="/" className="flex items-center">
                    <Icon
                      color="fc4c55"
                      icon="line-md:home-twotone"
                      width="24"
                      height="24"
                      path="#"
                    />
                  </Link>
                </_motion.div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <_motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/" className="flex items-center">
                      <img
                        src={logo}
                        alt="Afia Logo"
                        className="h-[5rem]  w-auto mr-2"
                      />
                    </Link>
                  </_motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </_motion.nav>
    </>
  );
};

export default Header;
