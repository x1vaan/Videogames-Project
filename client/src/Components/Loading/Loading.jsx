import React from "react";
import Loadingcss from './Loading.module.css'

export default function Loading () {
    return (
        <div>
        <div className={Loadingcss.circle}></div>
        </div>
    )
}