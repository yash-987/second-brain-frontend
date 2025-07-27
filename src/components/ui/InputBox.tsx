import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
}

export const InputBox = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ placeholder }: InputProps, ref) => {
	return (
		<input
			type="text"
			ref={ref}
			placeholder={placeholder}
			className="px-4 py-2 border rounded my-2"
		/>
	);
});
