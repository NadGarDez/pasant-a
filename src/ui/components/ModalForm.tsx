import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface props {
	children: JSX.Element;
	handleClose: () => void;
	open: boolean;
	title?: string;
}

export const ModalForm = (props: props): JSX.Element => {
	const { children, handleClose, open, title } = props;
	return (
		<Dialog fullWidth onClose={handleClose} open={open}>
			{title !== undefined ? <DialogTitle>{title}</DialogTitle> : null}
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};
