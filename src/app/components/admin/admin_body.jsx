"use client";
import React, { useRef } from "react";
import "./admin_body.scss";

const AdminBody = () => {
    /** @type {React.MutableRefObject<HTMLInputElement>} */
    let fileFieldRef = useRef();
    /** @type {React.MutableRefObject<HTMLInputElement>} */
    let titleFieldRef = useRef();
    /** @type {React.MutableRefObject<HTMLInputElement>} */
    let authorFieldRef = useRef();

    const handleSubmit = () => {
        let file = fileFieldRef.current.files[0];
        let title = titleFieldRef.current.value;
        let author = authorFieldRef.current.value;

        if (!file || !title || !author) {
            window.alert("Please fill out the fields");
            return;
        }

        let formData = new FormData();
        formData.set("file", file.slice());
        formData.set("filename", file.name.split(".")[0]);
        formData.set("title", title);
        formData.set("author", author);

        fetch("/api/v1/store/publish", {
            method: "POST",
            body: formData
        })
            .then((res) => {
                if (res.status == 200) {
                    location.reload();
                } else {
                    res.json()
                        .then((x) => {
                            window.alert(
                                `Failed to upload book!\n${x.message}`
                            );
                        })
                        .catch((_) => {
                            window.alert(
                                `Failed to upload book!\nUnknown Error!`
                            );
                        });
                }
            })
            .catch((_) => {
                window.alert(`Failed to upload book!\nNo response!`);
            });
    };

    return (
        <div className="main-content">
            <ul className="uploader">
                <li>
                    <h2>PDF Book Uploader</h2>
                    <input
                        ref={fileFieldRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        required
                    />
                </li>
                <li>
                    <h2>Book Title</h2>
                    <input
                        className="text-black"
                        ref={titleFieldRef}
                        type="text"
                        required
                    />
                </li>
                <li>
                    <h2>Book Author</h2>
                    <input
                        className="text-black"
                        ref={authorFieldRef}
                        type="text"
                        required
                    />
                </li>
            </ul>
            <button className="submit" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default AdminBody;
