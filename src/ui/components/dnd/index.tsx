/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useReducer } from "react";
import { initialState, reducer } from "./logic";
import { useDropzone } from "react-dropzone";
import { saveImage } from "../../../utils/apiRequest";
import {
	imageHaveValidDimensions,
	getImageInfoFromFile,
} from "../../../utils/utils";

interface props {
	label: string;
	name: string;
	requiredWidth: number;
	requiredHeight: number;
	onChange: (name: string, value: any) => void;
	initialValue?: string;
}

export const DragAndDropField = (props: props): JSX.Element => {
	const [{ status, preview, errorMessage }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const { label, onChange, name, initialValue, requiredHeight, requiredWidth } =
		props;

	const onDrop = useCallback(async (acceptedFiles: File[]): Promise<void> => {
		const { width, height } = await getImageInfoFromFile(acceptedFiles[0]);

		dispatch({
			type: "LOAD",
		});

		if (
			!imageHaveValidDimensions(width, height, requiredWidth, requiredHeight)
		) {
			dispatch({
				type: "FAIL",
				payload: `Is required an image with the following dimemsions: ${requiredWidth}*${requiredHeight}`,
			});
		} else {
			try {
				const { remoteUrl } = await saveImage(acceptedFiles[0]);
				dispatch({
					type: "FILL",
					payload: remoteUrl,
				});

				onChange(name, remoteUrl);
				onChange("width", width);
				onChange("height", height);
			} catch (error) {
				dispatch({
					type: "FAIL",
					payload: "Error saving the image",
				});
			}
		}

		// Do something with the files
	}, []);

	const clear = (): void => {
		dispatch({
			type: "NEUTRALIZE",
		});
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpeg"],
			"image/jpg": [".jpg"],
		},
	});

	useEffect(() => {
		if (initialValue !== undefined) {
			dispatch({
				type: "REFILL",
				payload: initialValue,
			});
		}
	}, [initialValue]);

	if (status === "FILLED" || status === "ERROR") {
		return (
			<>
				<Box
					flex={1}
					sx={{
						border: "1px solid",
						borderColor: status === "ERROR" ? "red" : "#ccc",
						borderRadius: "4px",
						padding: "16px",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Box flex={1}>
						{status === "FILLED" ? (
							<img src={preview ?? ""} width={200} />
						) : (
							<Typography color="red">{errorMessage}</Typography>
						)}
					</Box>
					<Button
						variant="outlined"
						onClick={clear}
						size="small"
						sx={{
							height: 40,
						}}
					>
						Clear
					</Button>
				</Box>
			</>
		);
	}

	return (
		<div {...getRootProps({ className: "dropzone" })}>
			<Box
				flex={1}
				sx={{
					border: "1px solid #ccc",
					borderRadius: "4px",
					padding: "16px",
				}}
			>
				<input {...getInputProps()} />
				{status === "VOID" ? (
					<Typography color="gray">{label}</Typography>
				) : null}
				{status === "LOADING" ? (
					<Typography color="gray">Loading..</Typography>
				) : null}
			</Box>
		</div>
	);
};
