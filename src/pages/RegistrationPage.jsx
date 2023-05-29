import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [backendErrors, setBackendErrors] = useState({});
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    first_name: { required: "Imię jest wymagane" },
    last_name: { required: "Nazwisko jest wymagane" },
    email: { required: "Email jest wymagany" },
    password: {
      required: "Hasło jest wymagane",
      minLength: {
        value: 8,
        message: "Hasło musi mieć przynajmniej 8 znaków",
      },
    },
    confirm_password: {
      required: "Musisz powtórzyć hasło",
      validate: (val) => {
        if (watch("password") != val) {
          return "Hasła nie są identyczne";
        }
      },
    },
  };

  const selectOptions = roles;

  const onSubmit = (data) => {
    let role = data.role.value;

    data.role = role;
    data.confirm_password = null;

    console.log(data);

    axios
      .post("http://localhost:8000/api/users/register/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(data);
        nav("/login");
      })
      .catch((err) => {
        setBackendErrors(JSON.parse(err.request.response));
      });
  };

  const handleError = (errors) => {};

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    await axios
      .get("http://localhost:8000/api/users/roles/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-white h-full flex justify-center pt-10">
      <form
        onSubmit={handleSubmit(onSubmit, handleError)}
        className="flex flex-col space-y-4 w-8/12 m-auto h-full"
      >
        <h1 className="font-semibold text-2xl pb-3 border-b-2">Rejestracja</h1>

        <div className="items-center">
          <label className="float-left text-xl" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="float-right w-2/4 h-10 px-2 border-b-2"
            name="email"
            id="email"
            {...register("email", registerOptions.email)}
          />
          <small className="text-danger">
            {console.log(errors)}
            {errors?.email && errors.email.message}
            {backendErrors?.email?.map((e, i) => (
              <span key={i}>
                {e} <br />
              </span>
            ))}
          </small>
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="password">
            Hasło
          </label>
          <input
            type="password"
            className="float-right w-2/4 h-10 px-2 border-b-2"
            name="password"
            id="password"
            {...register("password", registerOptions.password)}
          />
          <small className="text-danger">
            {errors?.password && errors.password.message}
            {backendErrors?.password?.map((e, i) => (
              <span key={i}>
                {e} <br />
              </span>
            ))}
          </small>
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="confirm_password">
            Powtórz hasło
          </label>
          <input
            type="password"
            className="float-right w-2/4 h-10 px-2 border-b-2"
            id="confirm_password"
            {...register("confirm_password", registerOptions.confirm_password)}
          />
          <small className="text-danger">
            {errors?.confirm_password && errors.confirm_password.message}
          </small>
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="first_name">
            Imię
          </label>
          <input
            name="first_name"
            id="first_name"
            className="float-right w-2/4 h-10 px-2 border-b-2"
            type="text"
            {...register("first_name", registerOptions.first_name)}
          />
          <small className="text-danger">
            {errors?.first_name && errors.first_name.message}
            {backendErrors?.first_name?.map((e, i) => (
              <span key={i}>
                {e} <br />
              </span>
            ))}
          </small>
        </div>
        <div className="items-center">
          <label className="float-left text-xl" htmlFor="last_name">
            Nazwisko
          </label>
          <input
            name="last_name"
            id="last_name"
            className="float-right w-2/4 h-10 px-2 border-b-2"
            type="text"
            {...register("last_name", registerOptions.last_name)}
          />
          <small className="text-danger">
            {errors?.last_name && errors.last_name.message}
            {backendErrors?.last_name?.map((e, i) => (
              <span key={i}>
                {e} <br />
              </span>
            ))}
          </small>
        </div>
        <div>
          <label className="float-left text-xl" htmlFor="role">
            Rola
          </label>
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={registerOptions.role}
            render={({ field }) => (
              <Select
                className="float-right w-2/4 h-10 px-2"
                options={selectOptions}
                {...field}
                label="Text field"
              />
            )}
          />
          <small className="text-danger">
            {backendErrors?.role?.map((e, i) => (
              <span key={i}>
                {e} <br />
              </span>
            ))}
          </small>
        </div>
        <hr />
        <button className="border-2 w-2/12 pt-2 pb-2 hover:border-blue-800">
          Zarejestruj
        </button>
      </form>
    </section>
  );
};

export default RegistrationPage;
