import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children }) => {
	const elRef = useRef(null);
	if (!elRef.current) {
		const div = document.createElement('div');
		elRef.current = div;
	}

	//make the useeffect run only once by adding [] at the end
	useEffect(() => {
		//grab modal from html filr
		const modalRoot = document.getElementById('modal');
		//append the div above to it
		modalRoot.appendChild(elRef.current);

		//runs only when modal root gets closed
		return () => modalRoot.removeChild(elRef.current);
	}, []);

	//wrapped with a div cuz it was styled with the a div,nothing perculiar abt it
	return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
