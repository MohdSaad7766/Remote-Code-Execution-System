import React from "react";
import { Outlet } from "react-router-dom";
import Footer from './@/components/Footer/Footer.jsx'
import Header from './@/components/Header/Header.jsx'
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import ScrollToTop from "./ScrollToTop.js";
export default function Layout() {
    return (
        <>
        <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
            
        </>
    )
}