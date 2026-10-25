import { useLocation } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { TbCategory } from "react-icons/tb";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsBox } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
export default function Sidebar() {
  const location = useLocation();

  const NavItems = [
    {
      tab: "Home",
      url: "/",
      icon: <HiOutlineHomeModern size={25} />,
    },
    {
      tab: "Products",
      url: "/products",
      icon: <BsBox size={25} />,
    },
    {
      tab: "Category",
      url: "/category",
      icon: <TbCategory size={25} />,
    },
    {
      tab: "Brands",
      url: "/brands",
      icon: <BiCategoryAlt size={25} />,
    },
    {
      tab: "Profile",
      url: "/profile",
      icon: <CgProfile size={25} />,
    },
  ];

  return (
    <>
      <div className="sidebar-container">
        <div className="container ">
          <div className="headcont row rounded mt-3 mx-1 p-4" id="lightbg">
            <span className="mt-2 col-md-8">Admin Panel</span>
            <button className="btn btn-outline-light col-md-4">
              <MdKeyboardArrowLeft size={25} />
            </button>
          </div>
        </div>
        <ul className="nav flex-column pt-3 sidefont">
          {NavItems.map((val, key) => (
            <li
              key={key}
              className={`nav-item m-3 p-2 ${
                location.pathname === val.url
                  ? "bg-lightb rounded  text-dark"
                  : ""
              } `}
            >
              <Link
                className={`nav-link d-flex align-item-center gap-3 text-light ${
                  location.pathname === val.url
                    ? "bg-lightb rounded text-dark"
                    : ""
                } `}
                to={val.url}
              >
                <span>{val.icon}</span>
                <span>{val.tab}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
