import Link from "next/link";
import { useForm } from "react-hook-form";
import Layout from "../layouts/Main";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { UseAuth } from "./api/context/AuthContext";

import { useEffect } from "react";
import { axiosClient } from "./api/service/api-service";

const LoginPage = () => {
  const { register, errors } = useForm();

  const {user, setUser} = UseAuth();

  const router = useRouter();

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        user.getIdToken(true).then(function(token: any) {
          axiosClient.post('/Login', {token}).then((idTokenReturn : any) => {
            try {
              const decode = JSON.parse(Buffer.from(idTokenReturn.data.data.split('.')[1], 'base64').toString());
              console.log("Token return: ", decode)
              setUser(decode);
              if (decode.role === 'Customer') {
                router.push('/');
              }
            } catch (error) {
              console.error(error);
            }
          })          
        });
        toast.success("Login Successful...!!");
        // router.push("/");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
      console.log('result');
  };

  useEffect(() => {
    if (user !== null) {
      handleLoginWithGoogle();
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);


  
  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a>
                <i className="icon-left"></i> Back to store
              </a>
            </Link>
          </div>

          <div className="form-block">
            <img
              style={{
                width: "300px",
                height: "225px",
                marginLeft: "70px",
                marginTop: "-70px",
                textAlign: "center",
                display: "flex",
              }}
              src="/images/jordan.gif"
              alt="Jordan"
            />
            <h2 className="form-block__title">Log in</h2>
            <form className="form">
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="email"
                  type="text"
                  name="email"
                  ref={register({
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Please write a valid email
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      type="checkbox"
                      name="keepSigned"
                      id="check-signed-in"
                      ref={register({ required: false })}
                    />
                    <span className="checkbox__check"></span>
                    <p>Keep me signed in</p>
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="form__info__forgot-password"
                >
                  Forgot password?
                </a>
              </div>

              <div className="form__btns">
                <button type="button" className="btn-social fb-btn">
                  <i className="icon-facebook"></i>Facebook
                </button>
                <button
                  type="button"
                  className="btn-social google-btn"
                  onClick={handleLoginWithGoogle}
                >
                  <img src="/images/icons/google.svg" alt="google" />
                  Google
                </button>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign in
              </button>

              <p className="form__signup-link">
                Not a member yet? <a href="/register">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
