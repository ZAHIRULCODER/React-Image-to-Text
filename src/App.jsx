import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Tesseract from "tesseract.js";
import ImageWrapper from "./components/ImageWrapper";
import TextWrapper from "./components/TextWrapper";

const App = () => {
	const [loading, setLoading] = useState(false);
	const [imageURL, setImageURL] = useState(null);
	const [text, setText] = useState(null);

	const convertImageToText = async () => {
		setLoading(true);
		const result = await Tesseract.recognize(imageURL, "eng"); 
		setText(result.data.text);
		setLoading(false);
	};

	const uploadFile = async (e) => {
		setLoading(true);
		const formData = new FormData();
		formData.append("image", e.target.files[0]);

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const response = await axios.post(
			"https://api.imgbb.com/1/upload?expiration=600&key=003ccefbc6cfa3a267aa8e9d8f44905d",
			formData,
			config
		);
		setImageURL(response.data.data.url);
		setLoading(false);
	};

	useEffect(() => {
		if (imageURL !== null) {
			convertImageToText();
		}
	}, [imageURL]);

	return (
		<div className="App">
			<img src="./images/logo.png" className="logo" />
			<div className="container">
				{loading && <div className="loader"></div>}
				{text === null ? (
					<ImageWrapper loading={loading} uploadFile={uploadFile} />
				) : (
					<TextWrapper text={text} />
				)}
			</div>
		</div>
	);
};

export default App;
