{
  /* Footer links */
}
<div className="flex flex-wrap justify-between gap-6">
  {/* About */}
  <div className="w-full sm:w-1/2 md:w-1/4">
    <h3 className="font-semibold uppercase text-base mb-2">
      Về phongtro123.com
    </h3>
    <ul>
      {aboutLinks.map((item) => (
        <li key={item}>
          <a
            className="block py-1 text-gray-800 hover:text-blue-600"
            href={`/${item.toLowerCase().replace(/ /g, "-")}`}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>

  {/* Customers */}
  <div className="w-full sm:w-1/2 md:w-1/4">
    <h3 className="font-semibold uppercase text-base mb-2">
      Dành cho khách hàng
    </h3>
    <ul>
      {customerLinks.map((item) => (
        <li key={item}>
          <a
            className="block py-1 text-gray-800 hover:text-blue-600"
            href={`/${item.toLowerCase().replace(/ /g, "-")}`}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>

  {/* Payment methods */}
  <div className="w-full sm:w-1/2 md:w-1/4">
    <h3 className="font-semibold uppercase text-base mb-2">
      Phương thức thanh toán
    </h3>
    <div className="flex flex-wrap gap-2">
      {[
        { src: "/images/logo-visa.svg", alt: "Visa" },
        { src: "/images/logo-mastercard.svg", alt: "Mastercard" },
        { src: "/images/logo-jcb.svg", alt: "JCB" },
        { src: "/images/momo_square_pinkbg.svg", alt: "MoMo" },
        { src: "/images/zalopay-new.png", alt: "Zalopay" },
        { src: "/images/i-shopeepay-white.svg", alt: "Shopeepay" },
      ].map((item, idx) => (
        <img
          key={idx}
          loading="lazy"
          src={item.src}
          alt={item.alt}
          className="object-contain w-[55px] h-[30px] bg-white rounded p-1"
        />
      ))}
    </div>
  </div>

  {/* Social media */}
  <div className="w-full sm:w-1/2 md:w-1/4">
    <h3 className="font-semibold uppercase text-base mb-2">
      Theo dõi Phongtro123.com
    </h3>
    <div className="flex gap-2 mt-2">
      {[
        {
          href: "https://www.facebook.com/phongtro123.com.vn/",
          icon: "facebook",
        },
        {
          href: "https://www.youtube.com/channel/UCaffQMAgZZ_sp92UPjR6Fgg",
          icon: "youtube",
        },
        {
          href: "https://zalo.me/phongtro123",
          icon: "zalo",
        },
        {
          href: "https://twitter.com/phongtro123",
          icon: "twitter",
        },
        {
          href: "https://www.tiktok.com/@phongtro123.com",
          icon: "tiktok",
        },
      ].map(({ href, icon }) => (
        <a
          key={icon}
          href={href}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label={`Phongtro123 trên ${icon}`}
          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
        >
          <i className={`icon ${icon} size-30`} />
        </a>
      ))}
    </div>
  </div>
</div>;

{
  /* Company Info */
}
<div className="mt-6 border-t border-gray-200 pt-4 text-xs">
  <p className="font-semibold uppercase text-base mb-2">Công ty TNHH LBKCORP</p>
  <p className="mb-1">
    Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, P. An Phú, TP.
    Thủ Đức, TP. HCM
  </p>
  <p className="mb-1">
    Tổng đài CSKH:{" "}
    <a className="text-red-500" href="tel:0909316890">
      0909 316 890
    </a>{" "}
    - Email: cskh.phongtro123@gmail.com - GPKD: 0313588502 do Sở KH&ĐT TP.HCM
    cấp 24/12/2015
  </p>
  <div className="flex items-center mt-3 gap-4">
    <a
      href="http://online.gov.vn/Home/WebDetails/43289"
      target="_blank"
      rel="nofollow noreferrer"
      aria-label="Bộ Công Thương"
    >
      <img
        src="/images/logo-bct.png"
        alt="Bộ Công Thương"
        className="w-24 h-10 object-contain"
      />
    </a>
    <a
      href="//www.dmca.com/Protection/Status.aspx?ID=c20c5527-4840-484e-adc5-37179174f55b"
      target="_blank"
      rel="nofollow noreferrer"
      title="DMCA.com Protection Status"
    >
      <img
        src="/images/dmca-badge-w250-2x1-04.png"
        alt="DMCA Protection"
        className="w-24 h-10 object-contain"
      />
    </a>
  </div>
</div>;
