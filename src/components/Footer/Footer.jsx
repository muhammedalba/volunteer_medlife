import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/AfiaLogo.png";
import { Icon } from "@iconify/react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bgColor text-minColor relative mt-12">
      {/* Logo badge */}
      <div className="absolute -top-10 right-6 sm:right-10">
        <div className="rounded-2xl bg-minColor/10 backdrop-blur-sm p-2 shadow-md flex items-center justify-center">
          <img src={logo} width={70} alt="logo" className="block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto pb-2 pt-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-minColor/20 pb-8">
          {/* معلومات الشركة */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">Medlife</h3>
            <p className="text-sm text-minColor/80">
              بوابتك لتنظيم ومتابعة عمل متطوعي Medlife، من تقييمات وملاحظات
              وتواصل مع الإدارة ضمن تجربة استخدام بسيطة وواضحة.
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-textColor transition">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-textColor transition">
                  تسجيل دخول المتطوع
                </Link>
              </li>
            </ul>
          </div>

          {/* التواصل */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">تواصل معنا</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-textColor transition">
                <a
                  href="https://http://medlifesy.org/"
                  className="flex items-center justify-start gap-x-2"
                >
                  <span>
                    <Icon
                      icon="icon-park-outline:earth"
                      width="22"
                      height="22"
                    />
                  </span>
                  medlifesy.org
                </a>
              </li>
              <li className="hover:text-textColor transition">
                <a
                  href="mailto:medlife056@gmail.com"
                  className="flex items-center justify-start gap-x-2"
                >
                  <span>
                    <Icon icon="iconamoon:email-thin" width="22" height="22" />
                  </span>
                  medlife056@gmail.com
                </a>
              </li>
              <li className="hover:text-textColor transition">
                <a 
                  href="tel:+963998942124"
                  className="flex items-center justify-start gap-x-2"
                >
                  <span>
                    <Icon icon="iconamoon:phone-thin" width="22" height="22" />
                  </span>
                <span dir="ltr">  (+963) 998942124</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-minColor/80">
          <p>© {year} Medlife. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-3">
            <span className="text-[1rem] uppercase tracking-wide opacity-80">
              تابعنا
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://http://medlifesy.org/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-textColor transition"
              >
                <Icon icon="mdi:web" width={18} height={18} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-textColor transition"
              >
                <Icon icon="mdi:facebook" width={18} height={18} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-textColor transition"
              >
                <Icon icon="mdi:instagram" width={18} height={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
