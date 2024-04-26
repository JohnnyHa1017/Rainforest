import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as ProductActions from '../../redux/products';
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './ProductManagement.css'

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div>
    </div>
  );
};

const ProductManagement = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const 

}

export default ProductManagement;
