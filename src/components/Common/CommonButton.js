import React from 'react';
import { Button } from '@material-ui/core';

export const CommonButton = (props) => {
	const { className, text, icon, handleClick, variant, style, fullWidth, disabled, color, size } = props;

	return (
		<Button
			color={color}
			size={size}
			fullWidth={fullWidth || false}
			className={className || ''}
			onClick={handleClick}
			variant={variant || ''}
			style={style || {}}
			disabled={disabled || false}
		>
			{icon || ''}
			{text || ''}
		</Button>
	);
};
