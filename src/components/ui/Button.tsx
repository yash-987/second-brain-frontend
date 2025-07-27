import type { ReactElement } from 'react';

type Variants = 'primary' | 'secondary';

interface ButtonProps {
	variant: Variants;
	size: 'sm' | 'md' | 'lg';
	text: string;
	onClick?: () => void;
	startIcon?: ReactElement;
	fullWidth?: boolean;
	loading?: boolean;
}
const variantStyles = {
	primary: 'bg-purple-600 text-white',
	secondary: 'bg-purple-400 text-purple-600',
};

const sizeStyles = {
	sm: 'py-2 px-2',
	md: 'py-2 px-4',
	lg: 'py-2 px-6',
};
const defaultStyles = 'rounded-md flex font-normal items-center cursor-pointer';
export const Button = ({
	variant,
	size,
	text,
	startIcon,
	onClick,
	fullWidth,
	loading,
}: ButtonProps) => {
	return (
		<button
			className={`${variantStyles[variant]} ${defaultStyles} ${
				sizeStyles[size]
			} ${fullWidth ? 'w-full flex justify-center items-center' : ''} ${
				loading ? 'opacity-45 ' : ''
			} `}
			onClick={onClick}
		>
			{startIcon ? <div className="pr-2">{startIcon}</div> : null} {text}
		</button>
	);
};
