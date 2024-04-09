import React, { useState } from "react";
import "./admin_body.scss";

const AdminBody = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setBookTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = () => {
        if (!selectedFile) {
            alert("Please select a file!");
            return;
        }
        if (!selectedImage) {
            alert("Please select a book cover image!");
            return;
        }

        // implement logic to store to back-end
        console.log("Selected File:", selectedFile);
        console.log("Book Title:", bookTitle);
        console.log("Author:", author);
        console.log("Selected Cover Image:", selectedImage);

        // reset states
        setSelectedFile(null);
        setBookTitle("");
        setAuthor("");
        setSelectedImage(null);
    };

    return (
        <div className="main-content">
            <ul className="uploader">
                <li>
                    <h2>PDF Book Uploader</h2>
                    <input type="file" onChange={handleFileChange} />
                </li>
                <li>
                    <h2>Book Cover Uploader</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </li>
                <li>
                    <h2>Book Title</h2>
                    <input type="text" onChange={handleTitleChange} />
                </li>
                <li>
                    <h2>Book Author</h2>
                    <input type="text" onChange={handleAuthorChange} />
                </li>
            </ul>
            <button className="submit" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default AdminBody;
