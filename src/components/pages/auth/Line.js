import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import { loginLing } from '../../../functions/auth';

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { login } from "../../../store/userSlice";

const Line = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
        .then(() => {
            handleLogin();
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleLogin = async () => {
        try {
            const profile = await liff.getProfile();
            // const idToken = liff.getIDToken();
            // console.log(profile);
            await loginLing(profile).then((response) => {
                dispatch(
                  login({
                    username: response.data.payload.user.username,
                    role: response.data.payload.user.role,
                    token: response.data.token,
                  })
                );
                localStorage.setItem("token", response.data.token);
                roleRedirect(response.data.payload.user.role);
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const roleRedirect = (role) => {
      if (role === "admin") {
        navigate("/admin/index");
      } else {
        navigate("/user/index");
      }
    };


  return (
    <div>line</div>
  )
}

export default Line