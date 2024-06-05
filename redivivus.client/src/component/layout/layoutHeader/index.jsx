import React from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { HiOutlineLogin } from "react-icons/hi";
import useAuthToken from "../../../hooks/useAuthToken";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";

const LayoutHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasToken = useAuthToken();
  return (
    <div className="min-w-full min-h-full flex flex-col justify-between">
      <div class="navbar bg-neutral bg-base-100">
        <div class="flex-1" onClick={() => navigate("/")}>
          <a class="btn btn-ghost text-xl text-green-500">REDIVIVUS</a>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <MdOutlineShoppingCartCheckout className="w-5 h-5 text-green-500" />
                <span class="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabindex="0"
              class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div class="card-body">
                <span class="font-bold text-lg">8 Items</span>
                <span class="text-info">Subtotal: $999</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          {hasToken ? (
            <></>
          ) : (
            <div
              class="w-10 rounded-full flex justify-center content-center"
              onClick={() => navigate("/login")}
            >
              <HiOutlineLogin className="w-5 h-5 text-green-400" />
            </div>
          )}
          <div class="dropdown dropdown-end">
            {hasToken ? (
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar"
              >
                <div class="w-10 rounded-full flex justify-center content-center">
                  <CiLogin className="w-5 h-5 text-green-400" />
                </div>
              </div>
            ) : (
              <></>
            )}
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li
                onClick={() => {
                  localStorage.removeItem("authToken");
                  navigate("/login");
                }}
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
