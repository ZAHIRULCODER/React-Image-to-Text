import React from "react";

const ImageWrapper = (props) => {
	return (
		<div className="image-wrapper">
			{props.loading ? (
				<h2>processing file... please wait..</h2>
			) : (
				<form>
					<input
						type="file"
						className="custom-file-input"
						name="image"
						onChange={(e) => props.uploadFile(e)}
					/>
				</form>
			)}
		</div>
	);
};

export default ImageWrapper;
