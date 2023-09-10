import React from "react";
import "../css/ErrorTextForm.css"

function ErrorTextForm({ texto, boolean}) {
    return (
        <div className={boolean ? "no-mostrar": (boolean === null ? "no-mostrar":"mostrar")}>
            { texto }
        </div>
    );
}

export default ErrorTextForm;