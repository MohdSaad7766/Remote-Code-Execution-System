import React from "react";
import SearchBar from "./Searchbar";
export default function SearchbarHome() {
    return (
        <>
            <div className="w-full">
                <div
                    className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm">
                    <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                    Hello, What Do You Want To Learn?


                    </p>

                    <SearchBar />

                    <svg viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true">
                        <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7">
                        </circle>
                        <defs>
                            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                <stop stop-color="#3b82f6"></stop>
                                <stop offset="1" stop-color="#1d4ed8"></stop>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </>
    );
}