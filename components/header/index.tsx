import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import { UseAuth } from "./../../pages/api/context/AuthContext";

type HeaderType = {
  isErrorPage?: Boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  const { logOut } = UseAuth();

  const handleLogout = () => {
    logOut();
    localStorage.removeItem("user");
    Router.push("/login");
  };

  type UserInfo = {
    id: string;
    name: string;
    role: string;
  };

  const [accountUser, setAccountUser] = useState<UserInfo>();

  useEffect(() => {
    const storeObject = localStorage.getItem("user");
    if (storeObject === "Admin") {
      // setAccountUser(JSON.parse(storeObject));
      return;
    }
    
    if (storeObject) {
      setAccountUser(JSON.parse(storeObject));
    }
  }, []);
  //console.log('accountUser',accountUser);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/" style={{ marginRight: "-100px" }}>
          <a>
            <h1 className="site-logo">
              <Logo />
              <div className="brand-logo">
                Sole Authenticity
                <br />
                <div
                  style={{
                    fontSize: "10px",
                    textAlign: "center",
                    paddingTop: "10px",
                  }}
                >
                  Identity - Responsibility - Prestige
                </div>
              </div>
            </h1>
          </a>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/reviews">
            <a className="nav-link nav-link-grow-up" href="#">
              Reviews
            </a>
          </Link>
          <Link href="/about">
            <a className="nav-link nav-link-grow-up" href="#">
              About
            </a>
          </Link>
          <div className="dropdown" style={{ cursor: "pointer" }}>
            <a className="nav-link nav-link-grow-up">Shop</a>
            <div className="dropdown-content">
              <Fragment>
                <a
                  href="/products"
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px 10px 0 0",
                    height: "30px",
                    width: "100px",
                  }}
                >
                  Footwear
                </a>
                <a
                  href="/secondHands"
                  style={{
                    cursor: "pointer",
                    borderRadius: "0 0 10px 10px",
                    height: "30px",
                    width: "100px",
                  }}
                >
                  Second Hand
                </a>
              </Fragment>
            </div>
          </div>
          <Link href="/stores">
            <a className="nav-link nav-link-grow-up" href="#">
              Store
            </a>
          </Link>
          <Link href="/brands">
            <a className="nav-link nav-link-grow-up" href="#">
              Brands
            </a>
          </Link>
          {/* <Link href="/secondHands">
            <a className="nav-link nav-link-grow-up" href="#">
              Second Hand
            </a>
          </Link> */}
          <button className="site-nav__btn">
            {accountUser ? (
              <Fragment>
                <a>{`$accountUser`}</a>
              </Fragment>
            ) : (
              <a>Account</a>
            )}
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? "search-form--active" : ""
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input type="text" name="search" placeholder="Searching....." />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button>
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          {/* <Link href="/login"> */}
          <div className="dropdown">
            <button className="site-header__btn-avatar">
              <i className="icon-avatar"></i>
            </button>
            <div className="dropdown-content">
              {accountUser ? (
                <Fragment>
                  <a
                    style={{ borderRadius: "10px 10px 0 0", cursor: "pointer" }}
                  >{`${accountUser.name}`}</a>
                  <a
                    type="button"
                    onClick={handleLogout}
                    style={{ borderRadius: "0 0 10px 10px", cursor: "pointer" }}
                  >
                    <img src="/images/logos/logout.png" />
                    Log Out
                  </a>
                </Fragment>
              ) : (
                <>
                  <a href="/login" style={{ borderRadius: "10px" }}>
                    <img src="/images/logos/enter.png" />
                    Log In
                  </a>
                  {/* <a href="/register" style={{ borderRadius: "0 0 10px " }}>
                    <img src="/images/logos/register.png" />
                    Sign Up
                  </a> */}
                </>
              )}
            </div>
          </div>
          {/* </Link> */}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
